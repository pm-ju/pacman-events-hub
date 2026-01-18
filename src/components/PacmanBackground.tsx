import { useEffect, useRef, useState } from 'react';

interface Dot {
  x: number;
  y: number;
  eaten: boolean;
}

interface Ghost {
  x: number;
  y: number;
  color: string;
  dx: number;
  dy: number;
}

interface Pacman {
  x: number;
  y: number;
  dx: number;
  dy: number;
  mouthOpen: boolean;
}

const PacmanBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Create dots grid
    const gridSize = 40;
    const dots: Dot[] = [];
    for (let x = gridSize; x < dimensions.width; x += gridSize) {
      for (let y = gridSize; y < dimensions.height; y += gridSize) {
        if (Math.random() > 0.3) {
          dots.push({ x, y, eaten: false });
        }
      }
    }

    // Create ghosts
    const ghostColors = ['#FF0000', '#FFB8FF', '#00FFFF', '#FFB852'];
    const ghosts: Ghost[] = ghostColors.map((color, i) => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      color,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    }));

    // Create Pac-Man
    const pacman: Pacman = {
      x: dimensions.width / 4,
      y: dimensions.height / 2,
      dx: 2,
      dy: 0,
      mouthOpen: true,
    };

    let frameCount = 0;

    const drawPacman = (p: Pacman) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      
      const angle = Math.atan2(p.dy, p.dx);
      ctx.rotate(angle);
      
      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      
      const mouthAngle = p.mouthOpen ? 0.3 : 0.05;
      ctx.arc(0, 0, 15, mouthAngle * Math.PI, (2 - mouthAngle) * Math.PI);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const drawGhost = (ghost: Ghost) => {
      const size = 20;
      ctx.fillStyle = ghost.color;
      
      // Body
      ctx.beginPath();
      ctx.arc(ghost.x, ghost.y - size/3, size, Math.PI, 0);
      ctx.lineTo(ghost.x + size, ghost.y + size/2);
      
      // Wavy bottom
      for (let i = 0; i < 4; i++) {
        const waveX = ghost.x + size - (i * size / 2);
        const waveY = ghost.y + size/2 + (i % 2 === 0 ? 5 : 0);
        ctx.lineTo(waveX, waveY);
      }
      
      ctx.lineTo(ghost.x - size, ghost.y + size/2);
      ctx.closePath();
      ctx.fill();
      
      // Eyes
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(ghost.x - 6, ghost.y - size/3, 5, 0, Math.PI * 2);
      ctx.arc(ghost.x + 6, ghost.y - size/3, 5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#0000FF';
      ctx.beginPath();
      ctx.arc(ghost.x - 5, ghost.y - size/3, 2.5, 0, Math.PI * 2);
      ctx.arc(ghost.x + 7, ghost.y - size/3, 2.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawDot = (dot: Dot) => {
      if (dot.eaten) return;
      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw maze pattern
      ctx.strokeStyle = 'rgba(0, 100, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw and animate dots
      dots.forEach(drawDot);

      // Animate and draw ghosts
      ghosts.forEach(ghost => {
        ghost.x += ghost.dx;
        ghost.y += ghost.dy;
        
        if (ghost.x < 0 || ghost.x > dimensions.width) ghost.dx *= -1;
        if (ghost.y < 0 || ghost.y > dimensions.height) ghost.dy *= -1;
        
        drawGhost(ghost);
      });

      // Animate Pac-Man
      pacman.x += pacman.dx;
      pacman.y += pacman.dy;
      
      if (pacman.x > dimensions.width + 20) {
        pacman.x = -20;
        pacman.y = Math.random() * dimensions.height;
      }
      if (pacman.x < -20) pacman.x = dimensions.width + 20;
      if (pacman.y > dimensions.height + 20 || pacman.y < -20) {
        pacman.y = Math.random() * dimensions.height;
      }

      // Change direction occasionally
      if (frameCount % 200 === 0) {
        const directions = [[2, 0], [-2, 0], [0, 2], [0, -2]];
        const dir = directions[Math.floor(Math.random() * directions.length)];
        pacman.dx = dir[0];
        pacman.dy = dir[1];
      }

      // Mouth animation
      if (frameCount % 10 === 0) {
        pacman.mouthOpen = !pacman.mouthOpen;
      }

      // Eat dots
      dots.forEach(dot => {
        const dist = Math.hypot(pacman.x - dot.x, pacman.y - dot.y);
        if (dist < 20 && !dot.eaten) {
          dot.eaten = true;
          // Respawn dot after delay
          setTimeout(() => { dot.eaten = false; }, 5000);
        }
      });

      drawPacman(pacman);

      frameCount++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40"
      style={{ zIndex: 0 }}
    />
  );
};

export default PacmanBackground;
