import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const MediaCard = ({ item, onClick }) => {
  const isVideo = item.type === 'VIDEO';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="relative cursor-pointer overflow-hidden rounded-2xl bg-purple/5 shadow-soft group"
      onClick={() => onClick(item)}
    >
      <img
        src={isVideo ? (item.thumbnailUrl || item.cloudinaryUrl) : item.cloudinaryUrl}
        alt={item.title || 'Gallery item'}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        style={{ aspectRatio: '1/1' }} // Default square, can be overridden by masonry classes
      />
      
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur">
            <Play className="ml-1 h-5 w-5 text-purple" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MediaCard;
