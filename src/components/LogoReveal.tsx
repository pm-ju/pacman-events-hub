import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LogoRevealProps {
  eventName: string;
  onComplete?: () => void;
}

const LogoReveal = ({ eventName, onComplete }: LogoRevealProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(true), 1500);
    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
      onComplete?.();
    }, 4000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const PacmanShape = ({ direction }: { direction: 'left' | 'right' }) => (
    <div className="relative">
      <motion.div
        className="w-32 h-32 md:w-48 md:h-48 rounded-full relative"
        style={{
          background: 'hsl(60, 100%, 50%)',
          clipPath: direction === 'right' 
            ? 'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)'
            : 'polygon(0% 50%, 25% 0%, 100% 0%, 100% 100%, 25% 100%)',
          boxShadow: '0 0 40px rgba(255, 255, 0, 0.6), 0 0 80px rgba(255, 255, 0, 0.3)',
        }}
        animate={{
          clipPath: direction === 'right' 
            ? [
                'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
                'polygon(100% 50%, 50% 25%, 0% 0%, 0% 100%, 50% 75%)',
                'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
              ]
            : [
                'polygon(0% 50%, 25% 0%, 100% 0%, 100% 100%, 25% 100%)',
                'polygon(0% 50%, 50% 25%, 100% 0%, 100% 100%, 50% 75%)',
                'polygon(0% 50%, 25% 0%, 100% 0%, 100% 100%, 25% 100%)',
              ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Left Pac-Man */}
      <motion.div
        className="absolute z-20"
        initial={{ x: '-100vw' }}
        animate={{ 
          x: animationComplete ? '100vw' : ['calc(-50vw)', 'calc(0vw)', 'calc(50vw)', '100vw']
        }}
        transition={{
          duration: 4,
          times: [0, 0.4, 0.6, 1],
          ease: 'linear',
        }}
      >
        <PacmanShape direction="right" />
      </motion.div>

      {/* Right Pac-Man */}
      <motion.div
        className="absolute z-20"
        initial={{ x: '100vw' }}
        animate={{ 
          x: animationComplete ? '-100vw' : ['calc(50vw)', 'calc(0vw)', 'calc(-50vw)', '-100vw']
        }}
        transition={{
          duration: 4,
          times: [0, 0.4, 0.6, 1],
          ease: 'linear',
        }}
      >
        <PacmanShape direction="left" />
      </motion.div>

      {/* Logo appearing at center */}
      <motion.div
        className="absolute z-10 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={showLogo ? { 
          scale: [0, 1.2, 1], 
          opacity: 1,
        } : {}}
        transition={{
          duration: 0.8,
          ease: 'backOut',
        }}
      >
        <h1 className="text-4xl md:text-7xl font-arcade text-primary text-glow-yellow mb-4">
          {eventName}
        </h1>
        <motion.p 
          className="text-lg md:text-xl text-secondary text-glow-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={showLogo ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          COLLEGE EVENT 2024
        </motion.p>
      </motion.div>

      {/* Dots trail */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary"
            style={{
              left: `${10 + i * 8}%`,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.5,
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="absolute w-3 h-3 rounded-full bg-primary"
            style={{
              right: `${10 + i * 8}%`,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoReveal;
