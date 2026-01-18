import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GhostEventCardProps {
  title: string;
  time: string;
  venue: string;
  color: 'red' | 'pink' | 'cyan' | 'orange';
  index: number;
}

const colorMap = {
  red: 'bg-ghost-red',
  pink: 'bg-ghost-pink',
  cyan: 'bg-ghost-cyan',
  orange: 'bg-ghost-orange',
};

const glowMap = {
  red: 'shadow-[0_0_30px_rgba(255,0,0,0.5)]',
  pink: 'shadow-[0_0_30px_rgba(255,184,255,0.5)]',
  cyan: 'shadow-[0_0_30px_rgba(0,255,255,0.5)]',
  orange: 'shadow-[0_0_30px_rgba(255,184,82,0.5)]',
};

const GhostEventCard = ({ title, time, venue, color, index }: GhostEventCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 4;
      
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(6, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 40);
      
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer group ${glowMap[color]}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -10 }}
      viewport={{ once: true }}
    >
      {/* Ghost body */}
      <div className={`${colorMap[color]} rounded-t-full pt-8 pb-4 px-6 relative min-h-[200px]`}>
        {/* Eyes container - taller oval eyes with smaller pupils */}
        <div className="flex justify-center gap-6 mb-6">
          {/* Left eye - taller oval shape */}
          <div className="w-10 h-14 bg-white rounded-full flex items-center justify-center relative overflow-hidden shadow-inner">
            <motion.div 
              className="w-3 h-3 bg-blue-700 rounded-full absolute"
              animate={{
                x: eyePosition.x,
                y: eyePosition.y,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            />
          </div>
          {/* Right eye - taller oval shape */}
          <div className="w-10 h-14 bg-white rounded-full flex items-center justify-center relative overflow-hidden shadow-inner">
            <motion.div 
              className="w-3 h-3 bg-blue-700 rounded-full absolute"
              animate={{
                x: eyePosition.x,
                y: eyePosition.y,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            />
          </div>
        </div>

        {/* Event info */}
        <div className="text-center text-primary-foreground">
          <h3 className="font-arcade text-xs md:text-sm mb-2 leading-relaxed">{title}</h3>
          <p className="text-[10px] opacity-90">{time}</p>
          <p className="text-[10px] opacity-75 mt-1">{venue}</p>
        </div>
      </div>

      {/* Ghost wavy bottom with animation */}
      <div className={`${colorMap[color]} h-8 relative overflow-hidden`}>
        <motion.svg 
          className="absolute bottom-0 left-0 w-full h-full" 
          viewBox="0 0 100 24" 
          preserveAspectRatio="none"
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d={`M0,0 L0,12 Q10,24 20,12 Q30,0 40,12 Q50,24 60,12 Q70,0 80,12 Q90,24 100,12 L100,0 Z`}
            fill="currentColor"
            className={colorMap[color].replace('bg-', 'text-')}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default GhostEventCard;
