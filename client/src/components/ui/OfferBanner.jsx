import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookTrialButton } from '../ContactButtons';
import { Calendar, Tag } from 'lucide-react';

const OfferBanner = ({ offer, isCompact = false }) => {
  if (!offer) return null;

  if (isCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple to-purple-dark text-white shadow-card"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-turquoise/20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center justify-between gap-6 p-8 md:flex-row md:p-12">
          <div className="flex-1 text-center md:text-left">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-charcoal shadow-sm">
              <Tag className="w-3 h-3" />
              Current Offer
            </span>
            <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">
              {offer.title}
            </h2>
            <p className="text-lg text-white/90 line-clamp-2">
              {offer.description}
            </p>
          </div>
          
          <div className="shrink-0">
            <Link to="/offers" className="inline-block bg-white/20 border border-white/30 text-white font-bold py-3 px-6 rounded-full hover:bg-white/30 transition-all text-center">
              Click here for more details
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full Details View for the /offers page
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden p-0 rounded-[2rem] border border-purple/10 shadow-soft bg-white"
    >
      {offer.imageUrl && (
        <div className="w-full bg-purple/5 relative border-b border-purple/10">
          <img 
            src={offer.imageUrl} 
            alt={offer.title} 
            className="w-full h-auto max-h-[500px] object-contain"
          />
        </div>
      )}
      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4 mb-4">
             <span className="inline-flex items-center gap-2 rounded-full bg-turquoise/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-turquoise">
               <Tag className="w-3 h-3" />
               Special Offer
             </span>
             {offer.endDate && (
               <span className="inline-flex items-center gap-2 text-sm font-bold text-charcoal/50">
                 <Calendar className="w-4 h-4" />
                 Valid till {new Date(offer.endDate).toLocaleDateString()}
               </span>
             )}
          </div>
          <h2 className="mb-4 font-display text-3xl font-bold text-purple md:text-4xl">
            {offer.title}
          </h2>
          <p className="text-lg text-charcoal/80 leading-relaxed whitespace-pre-wrap">
            {offer.description}
          </p>
        </div>
        
        <div className="shrink-0 w-full md:w-auto">
          <BookTrialButton className="w-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default OfferBanner;
