import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BookPageProps {
  children: ReactNode;
  pageNumber: number;
  isActive: boolean;
  direction: 'left' | 'right';
}

const BookPage = ({ children, pageNumber, isActive, direction }: BookPageProps) => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={false}
      animate={{
        rotateY: isActive ? 0 : direction === 'left' ? -90 : 90,
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: direction === 'left' ? 'right center' : 'left center',
      }}
    >
      {/* Page background */}
      <div className="absolute inset-0 paper-texture rounded-lg overflow-hidden">
        {/* Aged paper overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-amber-200/10" />
        
        {/* Page fold shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/10 to-transparent" />
        
        {/* Page edge highlight */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-amber-200/20 to-transparent" />
        
        {/* Content area with proper text color */}
        <div className="relative h-full p-6 md:p-10 text-amber-950 overflow-y-auto">
          {/* Decorative corner elements */}
          <div className="absolute top-4 left-4 text-2xl text-primary/40">❦</div>
          <div className="absolute top-4 right-4 text-2xl text-primary/40 rotate-90">❦</div>
          <div className="absolute bottom-4 left-4 text-2xl text-primary/40 -rotate-90">❦</div>
          <div className="absolute bottom-4 right-4 text-2xl text-primary/40 rotate-180">❦</div>
          
          {/* Page content */}
          <div className="relative z-10 h-full">
            {children}
          </div>
        </div>
        
        {/* Page number */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="font-display text-sm text-amber-800/60 tracking-wider">
            — {pageNumber} —
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookPage;
