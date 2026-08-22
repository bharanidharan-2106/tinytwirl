import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import PageHero from '../../components/ui/PageHero';
import ContactButtons from '../../components/ContactButtons';
import LocationSection from '../../components/ui/LocationSection';

const Contact = () => {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Contact The Tiny Twirl | Coimbatore" 
        description="Get in touch with us via WhatsApp, phone, or email to book a trial or ask any questions."
        path="/contact"
      />
      
      <PageHero 
        title="Let's Get Your Little One Twirling"
        description="Have questions about programs or getting started? Reach The Tiny Twirl through any of the channels below."
      />
      
      <section className="section-padding container-custom min-h-[50vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-3xl mb-16"
        >
          <ContactButtons className="shadow-none border-none p-0" />
        </motion.div>

        <div className="w-full max-w-5xl">
           <LocationSection />
        </div>
      </section>
    </div>
  );
};

export default Contact;
