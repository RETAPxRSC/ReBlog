<template>
  <div class="particle-container" ref="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

let animationFrameId: number;
let particles: Particle[] = [];
let mouse = { x: -9999, y: -9999 };
let isHovering = false;

class Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  color: string;
  orbitAngle: number;
  orbitSpeed: number;
  orbitRadius: number;
  orbitCenter: { x: number, y: number, z: number };

  constructor(x: number, y: number, z: number, color: string, type: string = 'book') {
    this.baseX = x;
    this.baseY = y;
    this.baseZ = z;
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = Math.random() * 1.5 + 0.5;
    this.color = color;
    
    // Orbital mechanics (Kepler-inspired)
    this.orbitCenter = { x: 0, y: 0, z: 0 };
    this.orbitRadius = Math.sqrt(x*x + y*y + z*z);
    this.orbitAngle = Math.atan2(y, x);
    // V proportional to 1/sqrt(R)
    this.orbitSpeed = (Math.random() > 0.5 ? 1 : -1) * (0.05 + 1.0 / (this.orbitRadius + 10));
  }

  update(mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) {
    // We remove the orbital rotation to keep the book shape static
    
    // Base position is steady
    const targetX = this.baseX;
    const targetY = this.baseY;

    // View projection offsets
    const screenX = this.baseX + canvasWidth / 2;
    const screenY = this.baseY + canvasHeight / 2;

    // Mouse repulsion
    const dx = screenX - mouseX;
    const dy = screenY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Reduce the repulsion radius and force to make it subtle
    const repellRadius = 80;
    if (distance < repellRadius && isHovering) {
      const force = (repellRadius - distance) / repellRadius;
      
      // Completely remove jitter for static styling
      this.x += dx * force * 0.05;
      this.y += dy * force * 0.05;
    } else {
      // Return to base smoothly, no breathing/jitter
      this.x += (this.baseX - this.x) * 0.1;
      this.y += (this.baseY - this.y) * 0.1;
    }
  }

  draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    const scale = (this.baseZ + 200) / 400; // Fake 3D depth scale
    const drawX = this.x + canvasWidth / 2;
    const drawY = this.y + canvasHeight / 2;
    
    ctx.beginPath();
    ctx.arc(drawX, drawY, this.radius * scale * 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

onMounted(() => {
  if (!canvas.value || !container.value) return;
  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  const resize = () => {
    if (!canvas.value || !container.value) return;
    canvas.value.width = container.value.clientWidth;
    canvas.value.height = container.value.clientHeight || 400;
  };

  const initParticles = () => {
    particles = [];
    const colors = ['#bd34fe', '#41d1ff', '#ffffff'];
    
    // Define lines for a closed book icon based on the provided image
    const lines = [
      [-40, -50, -40, 50],  // Left thick edge
      [-40, 50, 40, 50],    // Bottom thick edge
      [40, 50, 40, -50],    // Right thick edge
      [40, -50, -40, -50],  // Top thick edge
      [-15, -50, -15, 50],  // Spine separator vertical line
      [-15, 30, 40, 30],    // Pages bottom block horizontal line
      [0, -20, 25, -20],    // Text line 1
      [0, 5, 15, 5]         // Text line 2
    ];

    const scale = 1.8;
    const density = 2.0;

    lines.forEach(line => {
      const [x1, y1, x2, y2] = line.map(v => v * scale);
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx*dx + dy*dy);
      const count = Math.floor(length / density);

      for (let i = 0; i <= count; i++) {
        const t = count === 0 ? 0 : i / count;
        // Make points perfectly follow the strict outline, removing randomness
        const x = x1 + dx * t;
        const y = y1 + dy * t;
        const z = 0; // 2D flat layer

        const color = colors[Math.floor(Math.random() * colors.length)];
        const p = new Particle(x, y, z, color, 'book');
        particles.push(p);
      }
    });

    // Add extra particles to make the outer border look thicker just like the icon
    const thickLines = [
      [-40, -50, -40, 50],
      [-40, 50, 40, 50],
      [40, 50, 40, -50],
      [40, -50, -40, -50]
    ];
    
    thickLines.forEach(line => {
      const [x1, y1, x2, y2] = line.map(v => v * scale);
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx*dx + dy*dy);
      const count = Math.floor(length / density);

      for (let i = 0; i <= count; i++) {
        const t = count === 0 ? 0 : i / count;
        // Offset slightly for thickness
        const x = x1 + dx * t + (Math.random() - 0.5) * 4;
        const y = y1 + dy * t + (Math.random() - 0.5) * 4;
        const z = 0;

        const p = new Particle(x, y, z, '#ffffff', 'book');
        particles.push(p);
      }
    });
  };

  const animate = () => {
    if (!canvas.value || !ctx) return;
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    particles.forEach(p => {
      p.update(mouse.x, mouse.y, canvas.value!.width, canvas.value!.height);
      p.draw(ctx, canvas.value!.width, canvas.value!.height);
    });

    animationFrameId = requestAnimationFrame(animate);
  };

  window.addEventListener('resize', resize);
  canvas.value.addEventListener('mousemove', (e) => {
    const rect = canvas.value!.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    isHovering = true;
  });
  canvas.value.addEventListener('mouseleave', () => {
    isHovering = false;
  });

  resize();
  initParticles();
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {});
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.particle-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: 50%; /* Mask effect if needed */
}

canvas {
  width: 100%;
  height: 100%;
  pointer-events: auto; /* Required for mouse events */
}
</style>