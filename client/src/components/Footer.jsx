import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { siteConfig, getWhatsAppLink, getPhoneLink, getEmailLink, hasContactMethod } from '../config/site';

const Footer = () => (
  <footer className="bg-charcoal text-cream/70 pt-20 pb-24 md:pb-12 relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-purple/10 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-turquoise/10 blur-3xl pointer-events-none" />

    <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        
        {/* Brand */}
        <div className="flex flex-col items-start">
          <Link to="/" className="inline-block mb-6 bg-white rounded-2xl p-3 shadow-soft transition-transform hover:-translate-y-1">
            <img src="/logo.png" alt={siteConfig.name} className="h-14 w-auto object-contain" />
          </Link>
          <p className="text-turquoise font-bold text-lg mb-2">{siteConfig.tagline}</p>
          <p className="text-cream/60 leading-relaxed mb-6">{siteConfig.slogan}</p>
          
          <div className="flex gap-3">
            {hasContactMethod('instagram') && (
              <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-purple hover:text-white transition-all">
                <Instagram size={18} />
              </a>
            )}
            {hasContactMethod('facebook') && (
              <a href={siteConfig.contact.facebook} target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-purple hover:text-white transition-all">
                <Facebook size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Address & Hours */}
        <div>
          <h4 className="font-display font-bold text-white text-xl mb-6">Visit Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-turquoise shrink-0 mt-1" />
              <div>
                <p>Hari Complex, 207/4, Sathy Rd,</p>
                <p>opposite to Prozone Mall,</p>
                <p>Saravanampatti,</p>
                <p>Coimbatore, Tamil Nadu 641035</p>
                {hasContactMethod('googleMaps') && (
                  <a href={siteConfig.contact.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-sm font-bold text-turquoise hover:text-white transition-colors">
                    Get Directions <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </li>
            <li className="flex items-start gap-3 pt-2">
              <Clock className="w-5 h-5 text-purple shrink-0 mt-0.5" />
              <div>
                <p><span className="text-white font-medium">Tue - Sun:</span> 10:00 AM - 7:00 PM</p>
                <p><span className="text-white font-medium">Monday:</span> Closed</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-white text-xl mb-6">Contact Us</h4>
          <ul className="space-y-4">
            {hasContactMethod('whatsapp') && (
              <li>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center group-hover:bg-turquoise transition-colors">
                    <MessageCircle size={18} className="group-hover:text-charcoal" />
                  </div>
                  <span>WhatsApp Chat</span>
                </a>
              </li>
            )}
            {hasContactMethod('phone') && (
              <li>
                <a href={getPhoneLink()} className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center group-hover:bg-purple transition-colors">
                    <Phone size={18} className="group-hover:text-white" />
                  </div>
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
            )}
            {siteConfig.contact.email && (
              <li>
                <a href={getEmailLink()} className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center group-hover:bg-purple transition-colors">
                    <Mail size={18} className="group-hover:text-white" />
                  </div>
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-white text-xl mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {['Programs', 'About Us', 'Gallery', 'Offers', 'Events', 'Contact'].map((item) => (
              <li key={item}>
                <Link 
                  to={`/${item.toLowerCase().replace(' us', '')}`} 
                  className="flex items-center gap-2 hover:text-turquoise transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <Link to="/admin/login" className="text-cream/30 hover:text-white transition-colors">
          Admin Portal
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
