import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash has already been shown in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    // Set timer to hide splash screen and save to session storage
    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('hasSeenSplash', 'true');
    }, 2500); // Total animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <img 
                src="/logo.png" 
                alt="The Tiny Twirl Logo" 
                className="w-32 h-32 mb-6 object-contain"
                onError={(e) => {
                  // Fallback if logo.png doesn't exist yet
                  e.target.style.display = 'none';
                }}
              />
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-purple text-center"
              >
                The Tiny Twirl
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main App Content */}
      <div className={showSplash ? "h-screen overflow-hidden" : ""}>
        {children}
      </div>
    </>
  );
};

export default SplashScreen;
