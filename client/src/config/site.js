export const siteConfig = {
  name: 'The Tiny Twirl',
  tagline: 'Kids Gymnastics Centre',
  motto: 'MOVE • LEARN • GROW',
  slogan: 'Little twirl, big smile!',
  location: import.meta.env.VITE_LOCATION_NAME || 'Coimbatore',
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  fees: {
    registration: 2000,
    autismPerClass: 800,
  },
  contact: {
    whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '+91 99523 57017',
    phone: import.meta.env.VITE_PHONE || '+91 99523 57017',
    email: import.meta.env.VITE_EMAIL || 'tinytwirlkids@gmail.com',
    googleMaps: import.meta.env.VITE_GOOGLE_MAPS_URL || 'https://maps.app.goo.gl/2z3Sixqxmu35EtHz5?g_st=aw',
    googleMaps: import.meta.env.VITE_GOOGLE_MAPS_URL || 'https://maps.app.goo.gl/2z3Sixqxmu35EtHz5?g_st=aw',
    instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/tinytwirlcoimbatore/',
    facebook: import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61592293633528',
  },
};

export const getWhatsAppLink = (message = 'Hello! I would like to book a trial class at The Tiny Twirl.') => {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, '');
  if (!number) return '#';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export const getPhoneLink = () => {
  const phone = siteConfig.contact.phone.replace(/\s/g, '');
  return phone ? `tel:${phone}` : '#';
};

export const getEmailLink = () => {
  const email = siteConfig.contact.email;
  return email ? `mailto:${email}` : '#';
};

export const hasContactMethod = (method) => Boolean(siteConfig.contact[method]);
