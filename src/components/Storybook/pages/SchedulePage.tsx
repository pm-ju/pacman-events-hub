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
    day: 'Day One',
    date: 'March 15, 2026',
    events: [
      { time: '09:00', title: 'Opening Ceremony', description: 'Welcome & Introduction' },
      { time: '10:30', title: 'Coding Contest', description: 'Algorithm Challenge' },
      { time: '14:00', title: 'Hackathon Begins', description: '24hr Build Marathon' },
      { time: '18:00', title: 'Tech Talk', description: 'Industry Experts' },
    ],
  },
  {
    day: 'Day Two',
    date: 'March 16, 2026',
    events: [
      { time: '09:00', title: 'Workshops', description: 'Hands-on Sessions' },
      { time: '12:00', title: 'Gaming Arena', description: 'Esports Showdown' },
      { time: '15:00', title: 'Robotics', description: 'Bot Battle' },
      { time: '20:00', title: 'Cultural Night', description: 'Music & Dance' },
    ],
  },
  {
    day: 'Day Three',
    date: 'March 17, 2026',
    events: [
      { time: '09:00', title: 'Finals', description: 'Championship Rounds' },
      { time: '13:00', title: 'Demo Day', description: 'Project Showcase' },
      { time: '16:00', title: 'Awards', description: 'Prize Distribution' },
      { time: '18:00', title: 'Closing', description: 'Grand Finale' },
    ],
  },
];

const SchedulePage = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Page title */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-script text-4xl md:text-5xl text-primary mb-2">
          Event Schedule
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-px bg-primary/40" />
          <span className="text-primary/60">❦</span>
          <div className="w-12 h-px bg-primary/40" />
        </div>
      </motion.div>
      
      {/* Schedule grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 overflow-y-auto pb-8">
        {schedule.map((day, dayIndex) => (
          <motion.div
            key={day.day}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.2 }}
          >
            {/* Day card with 3D effect */}
            <div className="relative bg-gradient-to-b from-amber-50 to-amber-100/80 rounded-lg p-4 border border-amber-300/50 shadow-lg">
              {/* Folded corner effect */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-amber-200 to-amber-300 rounded-bl-lg shadow-inner" 
                   style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
              
              {/* Day header */}
              <div className="text-center mb-4 pb-3 border-b border-amber-300/40">
                <h3 className="font-display text-xl text-amber-900 font-semibold">
                  {day.day}
                </h3>
                <p className="font-body text-sm text-amber-700 italic">
                  {day.date}
                </p>
              </div>
              
              {/* Events list */}
              <div className="space-y-3">
                {day.events.map((event, eventIndex) => (
                  <motion.div
                    key={event.title}
                    className="relative pl-4 border-l-2 border-primary/40"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dayIndex * 0.2 + eventIndex * 0.1 }}
                  >
                    {/* Time dot */}
                    <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary" />
                    
                    <p className="font-body text-xs text-primary font-semibold">
                      {event.time}
                    </p>
                    <p className="font-display text-sm text-amber-900 font-medium">
                      {event.title}
                    </p>
                    <p className="font-body text-xs text-amber-700 italic">
                      {event.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Bottom quote */}
      <motion.p
        className="text-center font-body text-sm text-amber-700/60 italic mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        "Great events are not built in a day, but planned in three."
      </motion.p>
    </div>
  );
};

export default SchedulePage;
