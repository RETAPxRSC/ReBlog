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
    // Idle orbital movement
    this.orbitAngle += this.orbitSpeed * 0.1;
    
    const targetX = this.orbitCenter.x + this.orbitRadius * Math.cos(this.orbitAngle);
    const targetY = this.orbitCenter.y + this.orbitRadius * Math.sin(this.orbitAngle);
    
    // Base position interpolation for smooth orbit
    this.baseX += (targetX - this.baseX) * 0.05;
    this.baseY += (targetY - this.baseY) * 0.05;

    // View projection offsets
    const screenX = this.baseX + canvasWidth / 2;
    const screenY = this.baseY + canvasHeight / 2;

    // Mouse repulsion
    const dx = screenX - mouseX;
    const dy = screenY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const repellRadius = 150;
    if (distance < repellRadius && isHovering) {
      const force = (repellRadius - distance) / repellRadius;
      this.x += dx * force * 0.1;
      this.y += dy * force * 0.1;
    } else {
      // Return to base
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
    
    // Create an open book shape
    // Points on the two curved pages and spine
    for (let u = -1; u <= 1; u += 0.05) { // Left to right
      for (let v = -1; v <= 1; v += 0.05) { // Top to bottom
        // Mathematical model for an open book shape
        let x = u * 150;
        let y = v * 120;
        let z = 50 * Math.exp(-Math.abs(u) * 5) - 30 * Math.cos(u * Math.PI); 

        // Add some random scatter to make it look like a magical particle cluster
        x += (Math.random() - 0.5) * 5;
        y += (Math.random() - 0.5) * 5;
        z += (Math.random() - 0.5) * 5;

        const color = colors[Math.floor(Math.random() * colors.length)];
        // Modify initialization
        const p = new Particle(x, y, z, color, 'book');
        particles.push(p);
      }
    }
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