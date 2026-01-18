import { motion } from 'framer-motion';
import GhostEventCard from './GhostEventCard';

const events = [
  { title: 'HACKATHON', time: '24 Hours', venue: 'Main Hall', color: 'red' as const },
  { title: 'CODING', time: '3 Hours', venue: 'Lab 101', color: 'pink' as const },
  { title: 'ROBOTICS', time: '6 Hours', venue: 'Workshop', color: 'cyan' as const },
  { title: 'GAMING', time: '4 Hours', venue: 'Esports Arena', color: 'orange' as const },
  { title: 'QUIZ', time: '2 Hours', venue: 'Auditorium', color: 'red' as const },
  { title: 'DESIGN', time: '5 Hours', venue: 'Studio A', color: 'pink' as const },
  { title: 'AI/ML', time: '4 Hours', venue: 'Lab 202', color: 'cyan' as const },
  { title: 'STARTUP', time: '3 Hours', venue: 'Conference', color: 'orange' as const },
];

const EventsSection = () => {
  return (
    <section className="py-20 px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-2xl md:text-4xl font-arcade text-primary text-glow-yellow mb-4">
          CHASE THE EVENTS
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Follow the ghosts to discover amazing events. Their eyes are watching you!
        </p>
      </motion.div>

      {/* Pac-Man eating dots animation */}
      <div className="relative max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 mb-8">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                delay: i * 0.1,
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {events.map((event, index) => (
          <GhostEventCard
            key={event.title}
            {...event}
            index={index}
          />
        ))}
      </div>

      {/* Power pellets decoration */}
      <div className="flex justify-center gap-8 mt-16">
        {['red', 'pink', 'cyan', 'orange'].map((color, i) => (
          <motion.div
            key={color}
            className="w-6 h-6 rounded-full bg-primary animate-pulse-glow"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
