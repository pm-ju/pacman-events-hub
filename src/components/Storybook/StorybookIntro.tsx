import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface StorybookIntroProps {
  onComplete: () => void;
}

const StorybookIntro = ({ onComplete }: StorybookIntroProps) => {
  const [phase, setPhase] = useState<'hand' | 'zoom' | 'complete'>('hand');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('zoom'), 2500);
    const timer2 = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Wooden desk background */}
          <div className="absolute inset-0 wood-texture" />
          
          {/* Warm ambient lighting */}
          <div className="absolute inset-0 bg-gradient-radial from-amber-900/20 via-transparent to-black/50" />
          
          {/* Spotlight on desk */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-amber-500/10 via-amber-700/5 to-transparent blur-3xl" />
          </motion.div>

          {/* Hand placing book animation */}
          <motion.div
            className="relative"
            initial={{ y: -200, opacity: 0, scale: 0.5 }}
            animate={phase === 'hand' ? { 
              y: 0, 
              opacity: 1, 
              scale: 1,
            } : phase === 'zoom' ? {
              scale: 1.5,
              y: 50,
            } : {}}
            transition={{ 
              duration: phase === 'hand' ? 1.5 : 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* The Book */}
            <motion.div
              className="relative w-[320px] md:w-[450px] h-[400px] md:h-[550px]"
              style={{ perspective: '1500px' }}
              animate={phase === 'zoom' ? { rotateX: 5 } : {}}
              transition={{ duration: 1 }}
            >
              {/* Book shadow on desk */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/40 blur-xl rounded-full" />
              
              {/* Book Cover */}
              <div className="relative w-full h-full rounded-r-lg rounded-l-sm leather-texture border-4 border-amber-900/50 overflow-hidden">
                {/* Leather grain overlay */}
                <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')]" />
                
                {/* Book spine highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />
                
                {/* Gold decorative border */}
                <div className="absolute inset-4 border-2 border-primary/40 rounded-sm" />
                <div className="absolute inset-6 border border-primary/20 rounded-sm" />
                
                {/* Corner decorations */}
                <motion.div
                  className="absolute top-8 left-8 text-primary/60 text-4xl"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ❧
                </motion.div>
                <motion.div
                  className="absolute top-8 right-8 text-primary/60 text-4xl rotate-90"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  ❧
                </motion.div>
                <motion.div
                  className="absolute bottom-8 left-8 text-primary/60 text-4xl -rotate-90"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  ❧
                </motion.div>
                <motion.div
                  className="absolute bottom-8 right-8 text-primary/60 text-4xl rotate-180"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  ❧
                </motion.div>

                {/* Title */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center px-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <motion.h1
                    className="font-script text-4xl md:text-6xl gold-emboss text-center mb-4"
                    animate={{ 
                      textShadow: [
                        '1px 1px 2px rgba(0,0,0,0.5), 0 0 20px rgba(218,165,32,0.3)',
                        '1px 1px 2px rgba(0,0,0,0.5), 0 0 40px rgba(218,165,32,0.5)',
                        '1px 1px 2px rgba(0,0,0,0.5), 0 0 20px rgba(218,165,32,0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Convolution
                  </motion.h1>
                  <motion.p
                    className="font-display text-2xl md:text-4xl text-primary/80 tracking-[0.3em]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    2026
                  </motion.p>
                  
                  {/* Decorative line */}
                  <motion.div
                    className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent mt-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                  />
                  
                  {/* Tap to open text */}
                  <motion.p
                    className="font-body text-lg md:text-xl text-foreground/60 mt-12 tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.5, 1] }}
                    transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
                  >
                    ✦ Tap to open ✦
                  </motion.p>
                </motion.div>

                {/* Embossed pattern overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTMwIDBMMzAgNjBNMCA2MEw2MCAwIiBzdHJva2U9IiNkYWE1MjAiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIi8+PC9zdmc+')]" />
              </div>
            </motion.div>
          </motion.div>

          {/* Dust particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-200/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StorybookIntro;
