import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative z-10 py-12 px-4 border-t border-border bg-card/50 backdrop-blur">
      <div className="max-w-6xl mx-auto">
        {/* Pac-Man animation */}
        <div className="flex items-center justify-center gap-2 mb-8">
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
              x: [-100, 100],
            }}
            transition={{
              clipPath: { duration: 0.3, repeat: Infinity },
              x: { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'linear' },
            }}
          />
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary opacity-60"
            />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-arcade text-sm text-primary mb-4">PIXELATE</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The ultimate tech fest bringing together<br />
              innovation, creativity, and competition.
            </p>
          </div>

          <div>
            <h3 className="font-arcade text-sm text-secondary text-glow-blue mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Register Now</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Event Rules</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Sponsors</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="font-arcade text-sm text-accent text-glow-cyan mb-4">CONNECT</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Instagram</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Twitter</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Discord</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Email</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <motion.p 
            className="text-[10px] text-muted-foreground font-arcade"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            © 2024 PIXELATE • HIGH SCORE: 999999
          </motion.p>
          <p className="text-[8px] text-muted-foreground mt-2">
            GAME OVER? NEVER. INSERT COIN TO PLAY AGAIN.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
