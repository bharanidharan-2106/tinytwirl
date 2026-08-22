import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
  CalendarCheck,
} from 'lucide-react';
import {
  siteConfig,
  getWhatsAppLink,
  getPhoneLink,
  getEmailLink,
  hasContactMethod,
} from '../config/site';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const contactButtonBase =
  'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

const ContactButtons = ({ layout = 'grid', className = '', compact = false }) => {
  const { contact } = siteConfig;

  const buttons = [
    hasContactMethod('whatsapp') && {
      key: 'whatsapp',
      label: compact ? 'WhatsApp' : 'WhatsApp Us',
      href: getWhatsAppLink(),
      external: true,
      className: `${contactButtonBase} bg-[#25D366] text-white hover:brightness-110 focus:ring-[#25D366]`,
      icon: WhatsAppIcon,
    },
    hasContactMethod('phone') && {
      key: 'phone',
      label: compact ? 'Call' : 'Call Us',
      href: getPhoneLink(),
      className: `${contactButtonBase} bg-turquoise text-white hover:bg-turquoise-dark focus:ring-turquoise`,
      icon: Phone,
    },
    contact.email && {
      key: 'email',
      label: compact ? 'Email' : 'Email Us',
      href: getEmailLink(),
      className: `${contactButtonBase} bg-purple text-white hover:bg-purple-dark focus:ring-purple`,
      icon: Mail,
    },
    hasContactMethod('googleMaps') && {
      key: 'directions',
      label: compact ? 'Directions' : 'Get Directions',
      href: contact.googleMaps,
      external: true,
      className: `${contactButtonBase} border-2 border-purple bg-white text-purple hover:bg-purple hover:text-white focus:ring-purple`,
      icon: MapPin,
    },
    hasContactMethod('instagram') && {
      key: 'instagram',
      label: 'Instagram',
      href: contact.instagram,
      external: true,
      className: `${contactButtonBase} bg-gradient-to-r from-purple to-pink-500 text-white hover:opacity-90 focus:ring-purple`,
      icon: Instagram,
    },
    hasContactMethod('facebook') && {
      key: 'facebook',
      label: 'Facebook',
      href: contact.facebook,
      external: true,
      className: `${contactButtonBase} bg-[#1877F2] text-white hover:brightness-110 focus:ring-[#1877F2]`,
      icon: Facebook,
    },
  ].filter(Boolean);

  if (buttons.length === 0) return null;

  const layoutClasses =
    layout === 'row'
      ? 'flex flex-wrap items-center justify-center gap-3'
      : layout === 'stack'
        ? 'flex flex-col gap-3'
        : 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`${layoutClasses} ${className}`}>
      {buttons.map(({ key, label, href, external, className: btnClass, icon: Icon }) => (
        <a
          key={key}
          href={href}
          className={`${btnClass} ${compact ? 'px-4 py-2.5 text-sm' : ''}`}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {Icon === WhatsAppIcon ? (
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
          ) : (
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
          )}
          {label}
        </a>
      ))}
    </div>
  );
};

export const BookTrialButton = ({ className = '', compact = false }) => {
  if (!hasContactMethod('whatsapp')) return null;

  return (
    <a
      href={getWhatsAppLink('Hello! I would like to book a trial class at The Tiny Twirl.')}
      target="_blank"
      rel="noopener noreferrer"
      className={`${contactButtonBase} bg-gradient-to-r from-turquoise to-purple text-white shadow-soft hover:shadow-card hover:scale-[1.02] focus:ring-purple ${
        compact ? 'px-4 py-2 text-sm' : 'btn-primary'
      } ${className}`}
    >
      <CalendarCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
      Book a Trial
    </a>
  );
};

export const MobileContactBar = ({ className = '' }) => {
  const items = [
    hasContactMethod('whatsapp') && {
      key: 'whatsapp',
      label: 'WhatsApp',
      href: getWhatsAppLink(),
      icon: MessageCircle,
      className: 'bg-[#25D366] text-white',
    },
    hasContactMethod('phone') && {
      key: 'phone',
      label: 'Call',
      href: getPhoneLink(),
      icon: Phone,
      className: 'bg-turquoise text-white',
    },
    hasContactMethod('whatsapp') && {
      key: 'trial',
      label: 'Book Trial',
      href: getWhatsAppLink('Hello! I would like to book a trial class at The Tiny Twirl.'),
      icon: CalendarCheck,
      className: 'bg-purple text-white',
    },
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex border-t border-charcoal/10 bg-white px-2 py-2 shadow-[0_-4px_24px_rgba(30,41,59,0.12)] md:hidden ${className}`}
    >
      {items.map(({ key, label, href, icon: Icon, className: itemClass }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-bold transition-opacity hover:opacity-90 ${itemClass}`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
          {label}
        </a>
      ))}
    </div>
  );
};

export default ContactButtons;
