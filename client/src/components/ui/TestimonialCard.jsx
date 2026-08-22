import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card flex h-full flex-col relative"
    >
      <Quote className="absolute top-6 right-6 h-8 w-8 text-turquoise/20" />
      
      <div className="mb-6 flex items-center gap-1 text-yellow">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <p className="flex-1 text-lg italic text-charcoal/80 mb-6">
        "{testimonial.quote || testimonial.content}"
      </p>
      
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple/10 text-purple font-bold">
          {testimonial.parentName?.charAt(0) || 'P'}
        </div>
        <div>
          <p className="font-bold text-charcoal">{testimonial.parentName || 'Parent'}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
