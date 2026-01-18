import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Secretary', role: 'General Secretary', color: 'red' },
  { name: 'Joint Sec', role: 'Joint Secretary', color: 'pink' },
  { name: 'Tech Lead', role: 'Technical Head', color: 'cyan' },
  { name: 'Design Lead', role: 'Design Head', color: 'orange' },
  { name: 'Events Lead', role: 'Events Head', color: 'red' },
  { name: 'PR Lead', role: 'PR & Marketing', color: 'pink' },
  { name: 'Logistics', role: 'Logistics Head', color: 'cyan' },
  { name: 'Finance', role: 'Finance Head', color: 'orange' },
  { name: 'Content Lead', role: 'Content Head', color: 'red' },
  { name: 'Social Media', role: 'Social Media Head', color: 'pink' },
];

const colorMap = {
  red: 'border-ghost-red shadow-[0_0_15px_rgba(255,0,0,0.3)]',
  pink: 'border-ghost-pink shadow-[0_0_15px_rgba(255,184,255,0.3)]',
  cyan: 'border-ghost-cyan shadow-[0_0_15px_rgba(0,255,255,0.3)]',
  orange: 'border-ghost-orange shadow-[0_0_15px_rgba(255,184,82,0.3)]',
};

const bgColorMap = {
  red: 'from-ghost-red/20',
  pink: 'from-ghost-pink/20',
  cyan: 'from-ghost-cyan/20',
  orange: 'from-ghost-orange/20',
};

const TeamSection = () => {
  return (
    <section id="team" className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-arcade text-primary text-glow-yellow mb-4">
            PLAYER SELECT
          </h2>
          <p className="text-sm text-muted-foreground">Meet our team leads</p>
        </motion.div>

        {/* Team Grid - 10 boxes */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className={`relative aspect-[3/4] bg-card/50 backdrop-blur border-2 ${colorMap[member.color as keyof typeof colorMap]} rounded-lg overflow-hidden group cursor-pointer`}
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${bgColorMap[member.color as keyof typeof bgColorMap]} to-transparent`} />
              
              {/* Avatar placeholder */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted/50 border-2 border-current flex items-center justify-center overflow-hidden">
                <span className="text-2xl">👤</span>
              </div>

              {/* Info */}
              <div className="absolute bottom-4 left-0 right-0 text-center px-2">
                <h3 className="text-[8px] md:text-[10px] font-arcade text-foreground mb-1 truncate">
                  {member.name}
                </h3>
                <p className="text-[6px] md:text-[8px] text-muted-foreground truncate">
                  {member.role}
                </p>
              </div>

              {/* Player number badge */}
              <span className="absolute top-2 left-2 text-[8px] font-arcade text-muted-foreground">
                P{index + 1}
              </span>

              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
