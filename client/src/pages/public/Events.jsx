import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import SEO from '../../components/SEO';
import PageHero from '../../components/ui/PageHero';
import { publicApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await publicApi.getEvents();
        // Sort upcoming events first
        const sortedEvents = (data || []).sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        setEvents(sortedEvents);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDateTime = (dateString, isEnd = false, startDateString = null) => {
    const date = new Date(dateString);
    if (isEnd && startDateString) {
      const startDate = new Date(startDateString);
      if (date.toDateString() === startDate.toDateString()) {
        // Same day, just return time for the end date
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      }
    }
    return date.toLocaleString('en-US', {
      month: 'short', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col">
      <SEO 
        title="Events | The Tiny Twirl" 
        description="Stay updated with upcoming events, workshops, and camps at The Tiny Twirl."
        path="/events"
      />
      
      <PageHero 
        title="Upcoming Events"
        description="Join us for special workshops, holiday camps, and competitions!"
      />
      
      <section className="section-padding container-custom min-h-[50vh]">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-2xl">{error}</div>
        ) : events.length > 0 ? (
          <div className="space-y-12 max-w-4xl mx-auto">
            {events.map((event, idx) => (
              <motion.div 
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card flex flex-col p-0 overflow-hidden group border border-purple/10 shadow-soft bg-white rounded-3xl"
              >
                {event.imageUrl && (
                  <div className="w-full bg-cream relative border-b border-purple/10">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-auto max-h-[600px] object-contain" 
                    />
                  </div>
                )}
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <div className="mb-6 space-y-4">
                    <h3 className="font-display text-3xl font-bold text-purple">{event.title}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-charcoal/80 bg-purple/5 p-4 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-turquoise" />
                        <span>
                          {formatDateTime(event.eventDate)} 
                          {event.endDate && ` - ${formatDateTime(event.endDate, true, event.eventDate)}`}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-turquoise" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-charcoal/80 text-lg leading-relaxed whitespace-pre-wrap">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No Upcoming Events"
            message="Check back soon for new workshops and camps!"
            icon={Calendar}
          />
        )}
      </section>
    </div>
  );
};

export default Events;
