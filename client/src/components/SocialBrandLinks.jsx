import { Instagram, Facebook, MapPin, MessageCircle } from 'lucide-react';
import { siteConfig, getWhatsAppLink, hasContactMethod } from '../config/site';

const iconBase =
  'inline-flex items-center justify-center rounded-full text-white shadow-sm transition-transform hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2';

export const brandColors = {
  instagram: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] focus:ring-[#DD2A7B]',
  facebook: 'bg-[#1877F2] focus:ring-[#1877F2]',
  maps: 'bg-[#EA4335] focus:ring-[#EA4335]',
  whatsapp: 'bg-[#25D366] focus:ring-[#25D366]',
  gmail: 'bg-[#EA4335] focus:ring-[#EA4335]',
};

const SocialBrandLinks = ({ className = '', size = 'md', includeWhatsApp = false }) => {
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10';
  const iconSize = size === 'sm' ? 16 : 18;

  const links = [
    includeWhatsApp &&
      hasContactMethod('whatsapp') && {
        key: 'whatsapp',
        href: getWhatsAppLink(),
        label: 'WhatsApp',
        color: brandColors.whatsapp,
        icon: MessageCircle,
      },
    hasContactMethod('instagram') && {
      key: 'instagram',
      href: siteConfig.contact.instagram,
      label: 'Instagram',
      color: brandColors.instagram,
      icon: Instagram,
    },
    hasContactMethod('facebook') && {
      key: 'facebook',
      href: siteConfig.contact.facebook,
      label: 'Facebook',
      color: brandColors.facebook,
      icon: Facebook,
    },
    hasContactMethod('googleMaps') && {
      key: 'maps',
      href: siteConfig.contact.googleMaps,
      label: 'Get directions',
      color: brandColors.maps,
      icon: MapPin,
    },
  ].filter(Boolean);

  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ key, href, label, color, icon: Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${iconBase} ${dim} ${color}`}
        >
          <Icon size={iconSize} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialBrandLinks;
