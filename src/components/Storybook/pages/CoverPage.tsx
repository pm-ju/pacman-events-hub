import { motion } from 'framer-motion';

const CoverPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      {/* Decorative top element */}
      <motion.div
        className="text-primary/60 text-3xl mb-8"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ✦ ❖ ✦
      </motion.div>
      
      {/* Main title */}
      <motion.h1
        className="font-script text-5xl md:text-7xl text-primary mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.2), 0 0 30px rgba(218,165,32,0.3)',
        }}
      >
        Convolution
      </motion.h1>
      
      {/* Year */}
      <motion.p
        className="font-display text-3xl md:text-4xl text-amber-800 tracking-[0.5em] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        2026
      </motion.p>
      
      {/* Decorative divider */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/60" />
        <span className="text-primary text-xl">❧</span>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/60" />
      </motion.div>
      
      {/* Tagline */}
      <motion.p
        className="font-body text-xl md:text-2xl text-amber-900/80 italic max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        "Where Innovation Meets Imagination"
      </motion.p>
      
      {/* Event details */}
      <motion.div
        className="mt-12 space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <p className="font-display text-lg text-amber-800">
          March 15-17, 2026
        </p>
        <p className="font-body text-amber-700">
          College of Engineering
        </p>
      </motion.div>
      
      {/* Stats */}
      <motion.div
        className="mt-12 grid grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        {[
          { value: '50+', label: 'Events' },
          { value: '5000+', label: 'Participants' },
          { value: '₹10L+', label: 'Prizes' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 + index * 0.1 }}
          >
            <p className="font-display text-2xl md:text-3xl text-primary">
              {stat.value}
            </p>
            <p className="font-body text-sm text-amber-700 mt-1">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Bottom decoration */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
      >
        <p className="font-body text-amber-700/60 text-sm tracking-widest">
          Turn the page to begin your journey
        </p>
      </motion.div>
    </div>
  );
};

export default CoverPage;
