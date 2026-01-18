import { motion } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['HOME', 'EVENTS', 'SCHEDULE', 'REGISTER', 'CONTACT'];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 3.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 rounded-full bg-primary"
              style={{
                clipPath: 'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
              }}
              animate={{
                clipPath: [
                  'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
                  'polygon(100% 50%, 50% 25%, 0% 0%, 0% 100%, 50% 75%)',
                  'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
                ],
              }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
            <span className="font-arcade text-sm text-primary text-glow-yellow">PIXELATE</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-arcade text-[10px] text-muted-foreground hover:text-primary transition-colors relative group"
                whileHover={{ scale: 1.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Score display */}
          <div className="hidden md:flex items-center gap-2">
            <span className="font-arcade text-[10px] text-muted-foreground">SCORE:</span>
            <motion.span 
              className="font-arcade text-sm text-accent text-glow-cyan"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              2024
            </motion.span>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-primary p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-1.5">
              <motion.div 
                className="w-6 h-0.5 bg-primary"
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              />
              <motion.div 
                className="w-6 h-0.5 bg-primary"
                animate={{ opacity: isOpen ? 0 : 1 }}
              />
              <motion.div 
                className="w-6 h-0.5 bg-primary"
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block font-arcade text-xs text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {'>'} {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
