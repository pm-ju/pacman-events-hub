import { motion } from 'framer-motion';

const sponsors = [
  { name: 'Sponsor 1', tier: 'platinum' },
  { name: 'Sponsor 2', tier: 'platinum' },
  { name: 'Sponsor 3', tier: 'gold' },
  { name: 'Sponsor 4', tier: 'gold' },
  { name: 'Sponsor 5', tier: 'gold' },
  { name: 'Sponsor 6', tier: 'silver' },
  { name: 'Sponsor 7', tier: 'silver' },
  { name: 'Sponsor 8', tier: 'silver' },
];

const photos = [
  'Photo 1', 'Photo 2', 'Photo 3', 'Photo 4',
  'Photo 5', 'Photo 6', 'Photo 7', 'Photo 8',
];

const tierStyles = {
  platinum: 'border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-50 to-slate-100',
  gold: 'border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 to-orange-50',
  silver: 'border border-slate-300/60 bg-gradient-to-br from-slate-50 to-gray-100',
};

const SponsorsPage = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Page title */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-script text-4xl md:text-5xl text-primary mb-2">
          Our Patrons
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-px bg-primary/40" />
          <span className="text-primary/60">♔</span>
          <div className="w-12 h-px bg-primary/40" />
        </div>
      </motion.div>
      
      {/* Sponsors grid */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.name}
            className={`aspect-[4/3] rounded-lg flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-shadow ${tierStyles[sponsor.tier as keyof typeof tierStyles]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-gradient-to-br from-amber-200/50 to-amber-100/50 flex items-center justify-center">
                <span className="text-lg">
                  {sponsor.tier === 'platinum' ? '💎' : sponsor.tier === 'gold' ? '🏆' : '🥈'}
                </span>
              </div>
              <p className="font-body text-[8px] md:text-[10px] text-amber-800">
                {sponsor.name}
              </p>
              <p className="font-body text-[6px] text-amber-600 uppercase tracking-wider">
                {sponsor.tier}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Photo Gallery section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-display text-xl text-amber-900 text-center mb-4">
          ❦ Gallery ❦
        </h3>
        
        {/* Polaroid-style photo grid */}
        <div className="grid grid-cols-4 gap-2">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, rotate: (index % 2 === 0 ? -2 : 2) }}
              animate={{ opacity: 1, rotate: (index % 2 === 0 ? -2 : 2) }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
            >
              {/* Polaroid frame */}
              <div className="bg-white p-1 pb-4 shadow-lg rounded-sm">
                {/* Photo placeholder */}
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <span className="text-amber-400/50 text-2xl">📷</span>
                </div>
                {/* Caption */}
                <p className="font-body text-[6px] text-amber-700 text-center mt-1 italic">
                  {photo}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SponsorsPage;
