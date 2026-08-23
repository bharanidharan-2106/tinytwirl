import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

const EventBanner = ({ event }) => {
  if (!event) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-turquoise to-turquoise/80 text-white shadow-card"
    >
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple/20 blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center justify-between gap-6 p-8 md:flex-row md:p-12">
        <div className="flex-1 text-center md:text-left">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm border border-white/20">
            <Sparkles className="w-3 h-3" />
            Upcoming Event
          </span>
          <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl text-charcoal">
            {event.title}
          </h2>
          <p className="text-lg text-charcoal/80 line-clamp-2 mb-4 font-medium">
            {event.description}
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm font-bold text-charcoal/70">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-purple" />
              <span>
                {(() => {
                  const start = new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  if (!event.endDate) return start;
                  const end = new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  return start === end ? start : `${start} - ${end}`;
                })()}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-purple" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="shrink-0">
          <Link to="/events" className="inline-block bg-charcoal text-white font-bold py-3 px-6 rounded-full hover:bg-charcoal/90 transition-all text-center shadow-lg">
            Click here for more details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventBanner;
