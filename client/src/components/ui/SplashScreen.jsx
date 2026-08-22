import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const WordReveal = ({ stem, rest, colorClass, delay, expanded }) => (
  <span className={`inline-flex items-baseline font-bold tracking-tight ${colorClass}`}>
    <span>{stem}</span>
    <motion.span
      initial={{ maxWidth: 0, opacity: 0 }}
      animate={
        expanded
          ? { maxWidth: 280, opacity: 1 }
          : { maxWidth: 0, opacity: 0 }
      }
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block overflow-hidden whitespace-nowrap align-bottom"
    >
      {rest}
    </motion.span>
  </span>
);

const SplashScreen = ({ children }) => {
  const reduceMotion = useReducedMotion();
  const [showSplash, setShowSplash] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

    if (hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    if (reduceMotion) {
      setExpanded(true);
      setShowTagline(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 900);
      return () => clearTimeout(timer);
    }

    const expandTimer = setTimeout(() => setExpanded(true), 750);
    const taglineTimer = setTimeout(() => setShowTagline(true), 1600);
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('hasSeenSplash', 'true');
    }, 3200);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(taglineTimer);
      clearTimeout(hideTimer);
    };
  }, [reduceMotion]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white px-6"
            role="status"
            aria-live="polite"
            aria-label="The Tiny Twirl, Kid's Gymnastics Centre"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center text-center"
            >
              <img
                src="/logo.png"
                alt=""
                className="mb-8 h-28 w-28 object-contain md:h-32 md:w-32"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />

              <h1 className="font-display flex flex-wrap items-baseline justify-center gap-x-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <WordReveal stem="T" rest="HE" colorClass="text-purple" delay={0} expanded={expanded} />
                <WordReveal stem="T" rest="INY" colorClass="text-turquoise" delay={0.12} expanded={expanded} />
                <WordReveal stem="T" rest="WIRL" colorClass="text-purple" delay={0.24} expanded={expanded} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={showTagline ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="mt-5 text-base font-semibold tracking-[0.18em] text-charcoal/70 uppercase sm:text-lg"
              >
                Kid’s Gymnastics Centre
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={showSplash ? 'h-screen overflow-hidden' : ''}>{children}</div>
    </>
  );
};

export default SplashScreen;
