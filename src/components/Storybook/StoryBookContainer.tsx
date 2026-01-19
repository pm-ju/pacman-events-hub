import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookPage from './BookPage';
import CoverPage from './pages/CoverPage';
import SchedulePage from './pages/SchedulePage';
import EventsPage from './pages/EventsPage';
import SponsorsPage from './pages/SponsorsPage';
import TeamPage from './pages/TeamPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

const pages = [
  { id: 'cover', component: CoverPage, title: 'Cover' },
  { id: 'schedule', component: SchedulePage, title: 'Schedule' },
  { id: 'events', component: EventsPage, title: 'Events' },
  { id: 'sponsors', component: SponsorsPage, title: 'Sponsors' },
  { id: 'team', component: TeamPage, title: 'Team' },
  { id: 'faq', component: FAQPage, title: 'FAQ' },
  { id: 'contact', component: ContactPage, title: 'Contact' },
];

const StoryBookContainer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const goToPage = useCallback((pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < pages.length && pageIndex !== currentPage) {
      setDirection(pageIndex > currentPage ? 'right' : 'left');
      setCurrentPage(pageIndex);
    }
  }, [currentPage]);

  const nextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setDirection('right');
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setDirection('left');
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextPage();
    } else if (info.offset.x > swipeThreshold) {
      prevPage();
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Wooden desk background */}
      <div className="absolute inset-0 wood-texture" />
      
      {/* Warm ambient lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-900/10 via-transparent to-black/40" />
      
      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-amber-500/5 via-transparent to-transparent" />
      
      {/* The Open Book */}
      <motion.div
        className="absolute inset-4 md:inset-8 lg:inset-12 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ perspective: '2000px' }}
      >
        <motion.div
          className="relative w-full max-w-5xl aspect-[3/2] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {/* Book shadow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[95%] h-16 bg-black/30 blur-2xl rounded-full" />
          
          {/* Book base with leather spine */}
          <div className="absolute inset-0 flex">
            {/* Left cover (back) */}
            <div className="w-4 h-full leather-texture rounded-l-lg border-r border-amber-950/50" />
            
            {/* Spine */}
            <div className="w-8 h-full bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 flex items-center justify-center book-spine-shadow">
              <div className="w-1 h-[80%] bg-primary/30 rounded-full" />
            </div>
            
            {/* Right page area */}
            <div className="flex-1 relative rounded-r-lg overflow-hidden bg-paper">
              {/* Page stack effect */}
              <div className="absolute left-0 top-2 bottom-2 w-2 bg-gradient-to-r from-amber-200/80 to-transparent" />
              <div className="absolute right-1 top-0 bottom-0 w-1 bg-gradient-to-l from-amber-300/50 to-transparent" />
              
              {/* Pages */}
              <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                <AnimatePresence mode="wait">
                  {pages.map((page, index) => {
                    const PageComponent = page.component;
                    return (
                      <BookPage
                        key={page.id}
                        pageNumber={index + 1}
                        isActive={index === currentPage}
                        direction={direction}
                      >
                        <PageComponent />
                      </BookPage>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Navigation arrows */}
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full bg-leather/80 border-2 border-primary/40 flex items-center justify-center text-primary hover:bg-leather hover:border-primary/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={prevPage}
            disabled={currentPage === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full bg-leather/80 border-2 border-primary/40 flex items-center justify-center text-primary hover:bg-leather hover:border-primary/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Page indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {pages.map((page, index) => (
          <motion.button
            key={page.id}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentPage 
                ? 'bg-primary w-8' 
                : 'bg-foreground/30 hover:bg-foreground/50'
            }`}
            onClick={() => goToPage(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={page.title}
          />
        ))}
      </div>
      
      {/* Swipe hint */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-foreground/40 font-body text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        ← Swipe to turn pages →
      </motion.div>
    </div>
  );
};

export default StoryBookContainer;
