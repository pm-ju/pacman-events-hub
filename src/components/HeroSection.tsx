import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoReveal from './LogoReveal';

const HeroSection = () => {
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Logo reveal animation */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            className="absolute inset-0 z-30"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LogoReveal 
              eventName="PIXELATE" 
              onComplete={() => setAnimationComplete(true)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content appears after animation */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: showContent ? 0 : 50, opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-arcade text-primary text-glow-yellow mb-6">
            PIXELATE
          </h1>
          <p className="text-lg md:text-2xl font-arcade text-secondary text-glow-blue mb-4">
            2024
          </p>
        </motion.div>

        <motion.p
          className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: showContent ? 0 : 30, opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          The ultimate tech fest experience. Code, create, compete, and conquer in this arcade-themed adventure!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: showContent ? 0 : 30, opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 bg-primary text-primary-foreground font-arcade text-xs rounded neon-border box-glow-yellow hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            START GAME
          </motion.button>
          <motion.button
            className="px-8 py-4 bg-transparent border-2 border-secondary text-secondary font-arcade text-xs rounded hover:bg-secondary hover:text-secondary-foreground transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW EVENTS
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: showContent ? 0 : 30, opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {[
            { value: '50+', label: 'EVENTS' },
            { value: '5000+', label: 'PLAYERS' },
            { value: '₹10L', label: 'PRIZES' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <motion.p 
                className="text-2xl md:text-3xl font-arcade text-primary"
                animate={{ 
                  textShadow: ['0 0 10px rgba(255,255,0,0.5)', '0 0 20px rgba(255,255,0,0.8)', '0 0 10px rgba(255,255,0,0.5)']
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-[8px] text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.2 },
            y: { duration: 1.5, repeat: Infinity }
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-[8px] text-muted-foreground font-arcade">SCROLL DOWN</p>
            <div className="w-4 h-4 border-b-2 border-r-2 border-primary rotate-45" />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corner ghosts */}
      <motion.div
        className="absolute top-24 left-8 w-12 h-12 text-ghost-red opacity-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C20 10 10 40 10 60 L10 90 L25 75 L40 90 L55 75 L70 90 L85 75 L90 90 L90 60 C90 40 80 10 50 10 Z" />
          <circle cx="35" cy="45" r="10" fill="white" />
          <circle cx="65" cy="45" r="10" fill="white" />
          <circle cx="38" cy="45" r="5" fill="blue" />
          <circle cx="68" cy="45" r="5" fill="blue" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-24 right-8 w-12 h-12 text-ghost-cyan opacity-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C20 10 10 40 10 60 L10 90 L25 75 L40 90 L55 75 L70 90 L85 75 L90 90 L90 60 C90 40 80 10 50 10 Z" />
          <circle cx="35" cy="45" r="10" fill="white" />
          <circle cx="65" cy="45" r="10" fill="white" />
          <circle cx="38" cy="45" r="5" fill="blue" />
          <circle cx="68" cy="45" r="5" fill="blue" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
