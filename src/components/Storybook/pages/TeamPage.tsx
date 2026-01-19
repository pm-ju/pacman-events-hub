import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Secretary', role: 'General Secretary' },
  { name: 'Joint Sec', role: 'Joint Secretary' },
  { name: 'Tech Lead', role: 'Technical Head' },
  { name: 'Design Lead', role: 'Design Head' },
  { name: 'Events Lead', role: 'Events Head' },
  { name: 'PR Lead', role: 'PR & Marketing' },
  { name: 'Logistics', role: 'Logistics Head' },
  { name: 'Finance', role: 'Finance Head' },
  { name: 'Content Lead', role: 'Content Head' },
  { name: 'Social Media', role: 'Social Media Head' },
];

const TeamPage = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Page title */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-script text-4xl md:text-5xl text-primary mb-2">
          The Council
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-px bg-primary/40" />
          <span className="text-primary/60">👑</span>
          <div className="w-12 h-px bg-primary/40" />
        </div>
        <p className="font-body text-sm text-amber-700 italic mt-2">
          Meet the visionaries behind Convolution 2026
        </p>
      </motion.div>
      
      {/* Team grid - 10 vintage portrait style boxes */}
      <div className="flex-1 grid grid-cols-5 gap-3 md:gap-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            {/* Vintage frame */}
            <div className="relative bg-gradient-to-b from-amber-50 to-amber-100 rounded-sm border-4 border-amber-800/30 shadow-lg overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/50" />
              
              {/* Portrait area */}
              <div className="aspect-[3/4] flex flex-col">
                {/* Photo placeholder - sepia style */}
                <div className="flex-1 bg-gradient-to-br from-amber-200/60 via-amber-100 to-amber-200/60 flex items-center justify-center m-2 rounded-sm border border-amber-300/50">
                  <motion.div
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center border-2 border-amber-500/50"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-xl md:text-2xl">👤</span>
                  </motion.div>
                </div>
                
                {/* Name plate */}
                <div className="px-2 pb-2 text-center">
                  <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-sm py-1 px-2">
                    <p className="font-display text-[7px] md:text-[9px] text-amber-50 font-semibold truncate">
                      {member.name}
                    </p>
                  </div>
                  <p className="font-body text-[6px] md:text-[8px] text-amber-700 mt-1 truncate italic">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hover effect - golden glow */}
            <motion.div
              className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                boxShadow: '0 0 20px rgba(218,165,32,0.4)',
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Bottom quote */}
      <motion.p
        className="text-center font-body text-xs text-amber-700/60 italic mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        "United in vision, dedicated to excellence"
      </motion.p>
    </div>
  );
};

export default TeamPage;
