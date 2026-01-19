import { motion } from 'framer-motion';

const events = [
  { title: 'Hackathon', time: '24 Hours', venue: 'Main Hall', icon: '💻' },
  { title: 'Coding', time: '3 Hours', venue: 'Lab 101', icon: '⌨️' },
  { title: 'Robotics', time: '6 Hours', venue: 'Workshop', icon: '🤖' },
  { title: 'Gaming', time: '4 Hours', venue: 'Esports Arena', icon: '🎮' },
  { title: 'Quiz', time: '2 Hours', venue: 'Auditorium', icon: '🧠' },
  { title: 'Design', time: '5 Hours', venue: 'Studio A', icon: '🎨' },
  { title: 'AI/ML', time: '4 Hours', venue: 'Lab 202', icon: '🔬' },
  { title: 'Startup', time: '3 Hours', venue: 'Conference', icon: '🚀' },
];

const EventsPage = () => {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Page title */}
      <motion.div
        className="text-center mb-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-script text-4xl md:text-5xl text-primary mb-2">
          Our Events
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-px bg-primary/40" />
          <span className="text-primary/60">✦</span>
          <div className="w-12 h-px bg-primary/40" />
        </div>
      </motion.div>
      
      {/* Orbiting events - Solar system style */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Central sun */}
        <motion.div
          className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary via-amber-400 to-orange-500 flex items-center justify-center z-10"
          animate={{ 
            boxShadow: [
              '0 0 30px rgba(218,165,32,0.5)',
              '0 0 50px rgba(218,165,32,0.7)',
              '0 0 30px rgba(218,165,32,0.5)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-script text-lg md:text-2xl text-amber-950">2026</span>
        </motion.div>
        
        {/* Orbit rings */}
        <div className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] border border-amber-400/20 rounded-full" />
        <div className="absolute w-[280px] h-[280px] md:w-[480px] md:h-[480px] border border-amber-400/15 rounded-full" />
        
        {/* Orbiting event cards */}
        {events.map((event, index) => {
          const angle = (index / events.length) * 360;
          const radius = index % 2 === 0 ? 100 : 140;
          const mdRadius = index % 2 === 0 ? 175 : 240;
          
          return (
            <motion.div
              key={event.title}
              className="absolute"
              style={{
                transformOrigin: 'center center',
              }}
              animate={{
                rotate: [angle, angle + 360],
              }}
              transition={{
                duration: 30 + index * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                className="relative -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${Math.cos((angle * Math.PI) / 180) * radius}px`,
                  top: `${Math.sin((angle * Math.PI) / 180) * radius}px`,
                }}
                animate={{
                  rotate: [-angle, -angle - 360],
                }}
                transition={{
                  duration: 30 + index * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                whileHover={{ scale: 1.2, zIndex: 50 }}
              >
                {/* Event card */}
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300/50 shadow-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
                  style={{
                    transform: `translateX(${Math.cos((angle * Math.PI) / 180) * (window.innerWidth >= 768 ? mdRadius : radius)}px) translateY(${Math.sin((angle * Math.PI) / 180) * (window.innerWidth >= 768 ? mdRadius : radius)}px)`,
                  }}
                >
                  <span className="text-xl md:text-2xl mb-1">{event.icon}</span>
                  <p className="font-display text-[8px] md:text-[10px] text-amber-900 text-center leading-tight px-1">
                    {event.title}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Legend */}
      <motion.div
        className="mt-4 grid grid-cols-4 gap-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {events.slice(0, 4).map((event) => (
          <div key={event.title} className="text-xs">
            <span className="text-lg">{event.icon}</span>
            <p className="font-body text-amber-800 text-[10px] truncate">{event.title}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default EventsPage;
