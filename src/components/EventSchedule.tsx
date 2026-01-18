import { motion } from 'framer-motion';

interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
}

interface DaySchedule {
  day: string;
  date: string;
  events: ScheduleEvent[];
}

const schedule: DaySchedule[] = [
  {
    day: 'DAY 1',
    date: 'March 15, 2024',
    events: [
      { time: '09:00', title: 'OPENING CEREMONY', description: 'Welcome & Introduction' },
      { time: '10:30', title: 'CODING CONTEST', description: 'Algorithm Challenge' },
      { time: '14:00', title: 'HACKATHON BEGINS', description: '24hr Build Marathon' },
      { time: '18:00', title: 'TECH TALK', description: 'Industry Experts' },
    ],
  },
  {
    day: 'DAY 2',
    date: 'March 16, 2024',
    events: [
      { time: '09:00', title: 'WORKSHOPS', description: 'Hands-on Sessions' },
      { time: '12:00', title: 'GAMING ARENA', description: 'Esports Showdown' },
      { time: '15:00', title: 'ROBOTICS', description: 'Bot Battle' },
      { time: '20:00', title: 'CULTURAL NIGHT', description: 'Music & Dance' },
    ],
  },
  {
    day: 'DAY 3',
    date: 'March 17, 2024',
    events: [
      { time: '09:00', title: 'FINALS', description: 'Championship Rounds' },
      { time: '13:00', title: 'DEMO DAY', description: 'Project Showcase' },
      { time: '16:00', title: 'AWARDS', description: 'Prize Distribution' },
      { time: '18:00', title: 'CLOSING', description: 'Grand Finale' },
    ],
  },
];

const EventSchedule = () => {
  return (
    <section className="py-20 px-4 relative z-10">
      <motion.h2 
        className="text-2xl md:text-4xl font-arcade text-primary text-center mb-16 text-glow-yellow"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        LEVEL SELECT
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {schedule.map((day, dayIndex) => (
          <motion.div
            key={day.day}
            className="neon-border rounded-lg p-6 bg-card/80 backdrop-blur"
            initial={{ opacity: 0, x: dayIndex === 0 ? -50 : dayIndex === 2 ? 50 : 0, y: dayIndex === 1 ? 50 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: dayIndex * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-arcade text-secondary text-glow-blue mb-2">
                {day.day}
              </h3>
              <p className="text-xs text-muted-foreground">{day.date}</p>
            </div>

            <div className="space-y-4">
              {day.events.map((event, eventIndex) => (
                <motion.div
                  key={event.title}
                  className="relative group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: dayIndex * 0.2 + eventIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-primary/30">
                    {/* Pac-dot indicator */}
                    <div className="flex-shrink-0 mt-1">
                      <motion.div 
                        className="w-4 h-4 rounded-full bg-primary"
                        whileHover={{ scale: 1.5 }}
                        animate={{ 
                          boxShadow: ['0 0 10px rgba(255,255,0,0.5)', '0 0 20px rgba(255,255,0,0.8)', '0 0 10px rgba(255,255,0,0.5)']
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-arcade text-accent">{event.time}</span>
                      </div>
                      <h4 className="text-xs font-arcade text-primary leading-relaxed mb-1">
                        {event.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground">{event.description}</p>
                    </div>
                  </div>

                  {/* Connector line */}
                  {eventIndex < day.events.length - 1 && (
                    <div className="absolute left-[22px] top-full w-0.5 h-4 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* High Score Style Footer */}
            <div className="mt-8 pt-4 border-t border-border text-center">
              <p className="text-[8px] text-muted-foreground animate-dot-blink">
                INSERT COIN TO CONTINUE
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventSchedule;
