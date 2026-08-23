import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, Bell, ChevronDown } from 'lucide-react';

const NotificationPopup = ({ offer, event }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay if offer or event exists
    if (offer || event) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        triggerFireworks();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [offer, event]);

  const triggerFireworks = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#7A5C9B', '#48C9B0', '#F4D03F', '#FFFFFF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7A5C9B', '#48C9B0', '#F4D03F', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleScrollDown = () => {
    setIsVisible(false);
    const target = document.getElementById('offers-events-section');
    if (target) {
      // smooth scroll with a little offset
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  const message = offer 
    ? "New Offers available! Swipe down to see!" 
    : "New Events scheduled! Swipe down to see!";

  const subMessage = offer ? offer.title : event?.title;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border-2 border-purple overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple via-turquoise to-yellow" />
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-charcoal transition-colors bg-gray-50 rounded-full p-1"
          >
            <X size={16} />
          </button>
          
          <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={handleScrollDown}>
            <div className="bg-purple/10 text-purple p-3 rounded-xl flex-shrink-0">
              <Bell size={24} className="animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-charcoal text-base mb-1 pr-6">{message}</h4>
              <p className="text-sm text-purple font-medium mb-3">{subMessage}</p>
              
              <div className="flex items-center gap-1 text-xs font-bold text-turquoise uppercase tracking-wider group">
                <span>View Now</span>
                <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;
