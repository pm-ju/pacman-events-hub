import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      {/* Page title */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-script text-4xl md:text-5xl text-primary mb-2">
          Find Us
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-px bg-primary/40" />
          <span className="text-primary/60">📮</span>
          <div className="w-12 h-px bg-primary/40" />
        </div>
      </motion.div>
      
      {/* Contact card styled as wax-sealed letter */}
      <motion.div
        className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 md:p-8 max-w-md w-full shadow-xl border border-amber-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Decorative wax seal */}
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg border-2 border-red-900"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <span className="font-script text-amber-100 text-lg">C</span>
        </motion.div>
        
        {/* Paper texture lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none paper-lines rounded-lg" />
        
        {/* Content */}
        <div className="relative space-y-6 mt-4">
          {/* Contact info */}
          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-4 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display text-sm text-amber-900 font-medium">Email</p>
                <p className="font-body text-xs text-amber-700">convolution@college.edu</p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-4 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display text-sm text-amber-900 font-medium">Phone</p>
                <p className="font-body text-xs text-amber-700">+91 98765 43210</p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-4 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display text-sm text-amber-900 font-medium">Venue</p>
                <p className="font-body text-xs text-amber-700">College of Engineering, City</p>
              </div>
            </motion.div>
          </div>
          
          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-amber-300/50" />
            <span className="text-primary/60">❦</span>
            <div className="flex-1 h-px bg-amber-300/50" />
          </div>
          
          {/* Social links */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: Instagram, label: 'Instagram', color: 'from-pink-500 to-purple-500' },
              { icon: Twitter, label: 'Twitter', color: 'from-blue-400 to-blue-500' },
              { icon: Linkedin, label: 'LinkedIn', color: 'from-blue-600 to-blue-700' },
            ].map((social, index) => (
              <motion.button
                key={social.label}
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-md hover:shadow-lg transition-shadow`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom message */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="font-body text-sm text-amber-700/80 italic">
          "We'd love to hear from you!"
        </p>
        <p className="font-display text-xs text-amber-600/60 mt-2">
          ✦ See you at Convolution 2026 ✦
        </p>
      </motion.div>
      
      {/* Closing decorative elements */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-primary/30">❧</span>
        <span className="font-script text-lg text-primary/40">The End</span>
        <span className="text-primary/30 rotate-180">❧</span>
      </motion.div>
    </div>
  );
};

export default ContactPage;
