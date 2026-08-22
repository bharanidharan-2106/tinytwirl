import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import SEO from '../../components/SEO';
import PageHero from '../../components/ui/PageHero';
import MediaCard from '../../components/ui/MediaCard';
import { publicApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { BookTrialButton } from '../../components/ContactButtons';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await publicApi.getMedia();
        setMedia(data || []);
      } catch (err) {
        setError('Failed to load gallery. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const openLightbox = (item) => setSelectedItem(item);
  const closeLightbox = () => setSelectedItem(null);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col">
      <SEO 
        title="Gymnastics Gallery | The Tiny Twirl" 
        description="See our young gymnasts in action in our media gallery. Beautiful moments from The Tiny Twirl."
        path="/gallery"
      />
      
      <PageHero 
        title="Gallery"
        description="Catch a glimpse of the fun and learning at The Tiny Twirl."
      />
      
      <section className="section-padding container-custom min-h-[50vh]">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-2xl">{error}</div>
        ) : media.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {media.map((item) => (
              <div key={item._id} className="break-inside-avoid">
                <MediaCard item={item} onClick={openLightbox} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            title="Gallery moments are coming soon"
            message="We are capturing beautiful new moments. Check back soon!"
            action={<BookTrialButton />}
            icon={Star}
          />
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-black shadow-2xl"
            >
              {selectedItem.type === 'VIDEO' ? (
                <video 
                  src={selectedItem.cloudinaryUrl} 
                  controls 
                  autoPlay
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                />
              ) : (
                <img 
                  src={selectedItem.cloudinaryUrl} 
                  alt={selectedItem.title || 'Gallery image'} 
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                />
              )}
              {selectedItem.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <p className="text-lg font-bold text-white">{selectedItem.title}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
