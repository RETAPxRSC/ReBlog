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
    // slightly larger particles to support the dense styling
    this.radius = Math.random() * 1.0 + 1.2;
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
    
    // Create an offscreen canvas to paint the icon accurately
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 400;
    tempCanvas.height = 400;
    const tCtx = tempCanvas.getContext('2d');
    if (!tCtx) return;

    tCtx.translate(200, 200);
    tCtx.scale(1.5, 1.5);
    tCtx.lineWidth = 10;          // Thicker lines
    tCtx.lineJoin = 'round';      // Rounded corners
    tCtx.lineCap = 'round';       // Rounded caps
    tCtx.strokeStyle = '#fff';

    // Helper for rounded rectangle
    const drawRoundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    // Draw Outer border
    drawRoundRect(tCtx, -45, -55, 90, 110, 12);
    tCtx.stroke();

    // Spine
    tCtx.beginPath();
    tCtx.moveTo(-15, -55);
    tCtx.lineTo(-15, 55);
    tCtx.stroke();

    // Bottom block horizontal
    tCtx.beginPath();
    tCtx.moveTo(-15, 30);
    tCtx.lineTo(45, 30);
    tCtx.stroke();

    // Text lines
    tCtx.beginPath();
    tCtx.moveTo(2, -20);
    tCtx.lineTo(25, -20);
    tCtx.moveTo(2, 5);
    tCtx.lineTo(18, 5);
    tCtx.stroke();

    const imgData = tCtx.getImageData(0, 0, 400, 400).data;
    
    // Sample the drawn pixels to create particles
    for (let y = 0; y < 400; y += 3) {
      for (let x = 0; x < 400; x += 3) {
        const i = (y * 400 + x) * 4 + 3; // Alpha channel
        if (imgData[i] > 128) {
          const px = x - 200;
          const py = y - 200;
          
          // Calculate gradient color based on position X
          const ratio = Math.max(0, Math.min(1, (px + 80) / 160));
          // Start: #bd34fe (189, 52, 254), End: #41d1ff (65, 209, 255)
          const r = Math.round(189 + (65 - 189) * ratio);
          const g = Math.round(52 + (209 - 52) * ratio);
          const b = Math.round(254 + (255 - 254) * ratio);
          const color = `rgb(${r}, ${g}, ${b})`;

          particles.push(new Particle(px, py, 0, color, 'book'));
        }
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