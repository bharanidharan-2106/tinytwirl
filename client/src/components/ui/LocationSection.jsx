import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Link } from 'react-router-dom';

const LocationSection = ({ className = '' }) => {
  return (
    <div className={`card overflow-hidden p-0 rounded-[2rem] border border-purple/10 shadow-soft bg-white ${className}`}>
      <div className="flex flex-col md:flex-row">
        
        {/* Left Side - Details & CTAs */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple/5 rounded-full blur-3xl -mt-10 -mr-10" />
          
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/10 text-purple shadow-sm">
            <MapPin className="h-7 w-7" />
          </div>
          
          <h3 className="mb-4 font-display text-3xl md:text-4xl font-bold text-charcoal">
            Come Visit <span className="text-purple">The Tiny Twirl</span>
          </h3>
          
          <p className="mb-8 text-lg text-charcoal/70 max-w-md">
            Ready to start your child's gymnastics journey? We'd love to welcome you to our centre in Coimbatore.
          </p>

          <div className="mb-10 space-y-4 text-charcoal/80 bg-cream/50 p-6 rounded-2xl border border-purple/5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-turquoise mt-1 shrink-0" />
              <p className="leading-relaxed">
                Hari Complex, 207/4, Sathy Rd,<br />
                opposite to Prozone Mall,<br />
                Saravanampatti, Coimbatore, TN 641035
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Phone className="w-5 h-5 text-turquoise shrink-0" />
              <p className="font-medium">+91 99523 57017</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Mail className="w-5 h-5 text-turquoise shrink-0" />
              <p className="font-medium">tinytwirlkids@gmail.com</p>
            </div>
            <div className="flex items-start gap-3 pt-3 mt-3 border-t border-purple/10">
              <Clock className="w-5 h-5 text-turquoise shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Tue - Sun: 10:00 AM - 7:00 PM</p>
                <p className="text-sm text-charcoal/60">Monday: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <a
              href={siteConfig.contact.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 text-center justify-center"
            >
              Get Directions
            </a>
            <Link to="/contact" className="btn-secondary flex-1 text-center justify-center">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Side - Visual / Map Placeholder */}
        <div className="flex-1 bg-purple p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[300px]">
          {/* Background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-turquoise/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 w-full max-w-sm rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 p-8 text-center text-white shadow-xl hover:bg-white/20 transition-all duration-500">
            <div className="mx-auto w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg">
              <MapPin className="h-8 w-8 text-turquoise animate-bounce" />
            </div>
            <h4 className="font-display text-2xl font-bold mb-3">Find us in Coimbatore</h4>
            <p className="text-white/80 mb-8 leading-relaxed">
              Located conveniently opposite to Prozone Mall in Saravanampatti.
            </p>
            <a 
              href={siteConfig.contact.googleMaps} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-white text-purple font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LocationSection;
