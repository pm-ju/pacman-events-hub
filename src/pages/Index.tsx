import PacmanBackground from '@/components/PacmanBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EventsSection from '@/components/EventsSection';
import EventSchedule from '@/components/EventSchedule';
import SponsorsSection from '@/components/SponsorsSection';
import TeamSection from '@/components/TeamSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Animated Pac-Man game background */}
      <PacmanBackground />
      
      {/* Scanlines overlay for retro effect */}
      <div className="fixed inset-0 scanlines pointer-events-none z-[1]" />
      
      {/* Maze pattern overlay */}
      <div className="fixed inset-0 maze-pattern opacity-30 pointer-events-none z-[1]" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        
        <div id="events">
          <EventsSection />
        </div>
        
        <div id="schedule">
          <EventSchedule />
        </div>

        <SponsorsSection />
        
        <TeamSection />
        
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
