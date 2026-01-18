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
  pathIndex: number;
  direction: number;
  speed: number;
}

interface Pacman {
  x: number;
  y: number;
  pathIndex: number;
  direction: number;
  speed: number;
  mouthAngle: number;
  mouthDirection: number;
}

interface PathPoint {
  x: number;
  y: number;
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

    const gridSize = 40;
    const cols = Math.floor(dimensions.width / gridSize);
    const rows = Math.floor(dimensions.height / gridSize);

    // Create maze paths - horizontal and vertical corridors
    const paths: PathPoint[][] = [];
    
    // Create horizontal paths
    for (let row = 2; row < rows - 1; row += 3) {
      const path: PathPoint[] = [];
      for (let col = 1; col < cols - 1; col++) {
        path.push({ x: col * gridSize, y: row * gridSize });
      }
      paths.push(path);
    }
    
    // Create vertical paths
    for (let col = 3; col < cols - 1; col += 4) {
      const path: PathPoint[] = [];
      for (let row = 1; row < rows - 1; row++) {
        path.push({ x: col * gridSize, y: row * gridSize });
      }
      paths.push(path);
    }

    // Create dots along paths
    const dots: Dot[] = [];
    paths.forEach(path => {
      path.forEach((point, i) => {
        if (i % 2 === 0) {
          dots.push({ x: point.x, y: point.y, eaten: false });
        }
      });
    });

    // Create ghosts with path-following behavior
    const ghostColors = ['#FF0000', '#FFB8FF', '#00FFFF', '#FFB852'];
    const ghosts: Ghost[] = ghostColors.map((color, i) => {
      const pathIndex = i % paths.length;
      const pointIndex = Math.floor(paths[pathIndex].length / 2);
      return {
        x: paths[pathIndex][pointIndex].x,
        y: paths[pathIndex][pointIndex].y,
        color,
        pathIndex,
        direction: Math.random() > 0.5 ? 1 : -1,
        speed: 0.8 + Math.random() * 0.4,
      };
    });

    // Create Pac-Man
    const pacman: Pacman = {
      x: paths[0][0].x,
      y: paths[0][0].y,
      pathIndex: 0,
      direction: 1,
      speed: 1.2,
      mouthAngle: 0,
      mouthDirection: 1,
    };

    let pathProgress: { [key: number]: number } = {};
    ghosts.forEach((_, i) => pathProgress[i] = Math.floor(paths[i % paths.length].length / 2));
    let pacmanProgress = 0;

    const drawMaze = () => {
      ctx.strokeStyle = 'rgba(0, 100, 255, 0.2)';
      ctx.lineWidth = 2;
      
      paths.forEach(path => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
      });
    };

    const drawPacman = (p: Pacman) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      
      // Determine rotation based on movement
      const nextPoint = paths[p.pathIndex]?.[Math.floor(pacmanProgress) + p.direction];
      if (nextPoint) {
        const angle = Math.atan2(nextPoint.y - p.y, nextPoint.x - p.x);
        ctx.rotate(angle);
      }
      
      // Draw Pac-Man with smooth mouth animation
      ctx.fillStyle = '#FFFF00';
      ctx.shadowColor = 'rgba(255, 255, 0, 0.5)';
      ctx.shadowBlur = 15;
      
      const mouthAngle = p.mouthAngle * Math.PI;
      
      ctx.beginPath();
      ctx.arc(0, 0, 18, mouthAngle, 2 * Math.PI - mouthAngle);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const drawGhost = (ghost: Ghost) => {
      const size = 18;
      ctx.fillStyle = ghost.color;
      ctx.shadowColor = ghost.color;
      ctx.shadowBlur = 10;
      
      // Ghost body - rounded top
      ctx.beginPath();
      ctx.arc(ghost.x, ghost.y - size/4, size, Math.PI, 0);
      ctx.lineTo(ghost.x + size, ghost.y + size/2);
      
      // Wavy bottom with animation
      const waveOffset = Date.now() * 0.01;
      for (let i = 0; i <= 4; i++) {
        const waveX = ghost.x + size - (i * size / 2);
        const waveY = ghost.y + size/2 + Math.sin(waveOffset + i) * 3;
        ctx.lineTo(waveX, waveY);
      }
      
      ctx.lineTo(ghost.x - size, ghost.y + size/2);
      ctx.closePath();
      ctx.fill();
      
      ctx.shadowBlur = 0;
      
      // Eyes - taller and oval shaped
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.ellipse(ghost.x - 6, ghost.y - size/4, 5, 7, 0, 0, Math.PI * 2);
      ctx.ellipse(ghost.x + 6, ghost.y - size/4, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Pupils - smaller and follow mouse direction would need mouse tracking
      ctx.fillStyle = '#0000FF';
      ctx.beginPath();
      ctx.arc(ghost.x - 5 + ghost.direction * 2, ghost.y - size/4, 2, 0, Math.PI * 2);
      ctx.arc(ghost.x + 7 + ghost.direction * 2, ghost.y - size/4, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawDot = (dot: Dot) => {
      if (dot.eaten) return;
      ctx.fillStyle = '#FFFF00';
      ctx.shadowColor = 'rgba(255, 255, 0, 0.5)';
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 10, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw maze paths
      drawMaze();

      // Draw dots
      dots.forEach(drawDot);

      // Animate ghosts along paths
      ghosts.forEach((ghost, i) => {
        const path = paths[ghost.pathIndex];
        const progress = pathProgress[i] ?? 0;
        
        // Move along path
        pathProgress[i] = progress + ghost.direction * ghost.speed * 0.05;
        
        // Reverse at path ends
        if (pathProgress[i] >= path.length - 1 || pathProgress[i] <= 0) {
          ghost.direction *= -1;
          // Occasionally switch to a different path at intersections
          if (Math.random() > 0.7) {
            const newPathIndex = Math.floor(Math.random() * paths.length);
            ghost.pathIndex = newPathIndex;
            pathProgress[i] = Math.floor(paths[newPathIndex].length / 2);
          }
        }
        
        // Interpolate position along path
        const idx = Math.floor(Math.max(0, Math.min(path.length - 1, pathProgress[i])));
        const nextIdx = Math.min(path.length - 1, idx + 1);
        const t = pathProgress[i] - idx;
        
        ghost.x = path[idx].x + (path[nextIdx].x - path[idx].x) * t;
        ghost.y = path[idx].y + (path[nextIdx].y - path[idx].y) * t;
        
        drawGhost(ghost);
      });

      // Animate Pac-Man
      const currentPath = paths[pacman.pathIndex];
      pacmanProgress += pacman.direction * pacman.speed * 0.05;
      
      if (pacmanProgress >= currentPath.length - 1 || pacmanProgress <= 0) {
        pacman.direction *= -1;
        // Switch paths at intersections
        if (Math.random() > 0.5) {
          pacman.pathIndex = Math.floor(Math.random() * paths.length);
          pacmanProgress = pacman.direction > 0 ? 0 : paths[pacman.pathIndex].length - 1;
        }
      }
      
      const idx = Math.floor(Math.max(0, Math.min(currentPath.length - 1, pacmanProgress)));
      const nextIdx = Math.min(currentPath.length - 1, idx + 1);
      const t = pacmanProgress - idx;
      
      pacman.x = currentPath[idx].x + (currentPath[nextIdx].x - currentPath[idx].x) * t;
      pacman.y = currentPath[idx].y + (currentPath[nextIdx].y - currentPath[idx].y) * t;
      
      // Smooth mouth animation - open and close smoothly
      pacman.mouthAngle += pacman.mouthDirection * 0.08;
      if (pacman.mouthAngle >= 0.25) {
        pacman.mouthDirection = -1;
      } else if (pacman.mouthAngle <= 0.02) {
        pacman.mouthDirection = 1;
      }

      // Eat dots
      dots.forEach(dot => {
        const dist = Math.hypot(pacman.x - dot.x, pacman.y - dot.y);
        if (dist < 20 && !dot.eaten) {
          dot.eaten = true;
          setTimeout(() => { dot.eaten = false; }, 8000);
        }
      });

      drawPacman(pacman);

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
      className="fixed inset-0 pointer-events-none opacity-50"
      style={{ zIndex: 0 }}
    />
  );
};

export default PacmanBackground;
