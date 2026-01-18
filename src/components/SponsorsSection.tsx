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

const tierColors = {
  platinum: 'border-accent shadow-[0_0_20px_rgba(0,255,255,0.4)]',
  gold: 'border-primary shadow-[0_0_20px_rgba(255,255,0,0.3)]',
  silver: 'border-muted-foreground shadow-[0_0_15px_rgba(100,150,255,0.2)]',
};

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-arcade text-primary text-glow-yellow mb-4">
            POWER UPS
          </h2>
          <p className="text-sm text-muted-foreground">Our amazing sponsors</p>
        </motion.div>

        {/* Sponsor Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              className={`relative aspect-video bg-card/50 backdrop-blur border-2 ${tierColors[sponsor.tier as keyof typeof tierColors]} rounded-lg flex items-center justify-center group cursor-pointer overflow-hidden`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              {/* Placeholder image area */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-transparent" />
              <p className="text-xs font-arcade text-muted-foreground group-hover:text-primary transition-colors">
                {sponsor.name}
              </p>
              
              {/* Tier badge */}
              <span className={`absolute top-2 right-2 text-[6px] font-arcade px-2 py-1 rounded ${
                sponsor.tier === 'platinum' ? 'bg-accent/20 text-accent' :
                sponsor.tier === 'gold' ? 'bg-primary/20 text-primary' :
                'bg-muted text-muted-foreground'
              }`}>
                {sponsor.tier.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Photo Gallery Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl md:text-2xl font-arcade text-secondary text-glow-blue mb-8 text-center">
            GAME MOMENTS
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((photo, index) => (
              <motion.div
                key={photo}
                className="relative aspect-square bg-card/30 backdrop-blur border border-border rounded-lg overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[8px] font-arcade text-muted-foreground">Photo {photo}</p>
                </div>
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <span className="text-[8px] font-arcade text-primary">VIEW</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
