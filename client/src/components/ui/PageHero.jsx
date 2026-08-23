import { motion } from 'framer-motion';
import MobileBackButton from '../MobileBackButton';

const PageHero = ({ title, description, children }) => {
  return (
    <section className="relative overflow-hidden bg-purple py-12 lg:py-16 text-center text-white">
      <MobileBackButton light />

      {/* Decorative background elements */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-turquoise/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-yellow/10 blur-3xl" />
      
      <div className="container-custom relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-white/80">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
