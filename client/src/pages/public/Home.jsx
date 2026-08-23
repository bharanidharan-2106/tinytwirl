import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import SEO from '../../components/SEO';
import { publicApi } from '../../services/api';
import ProgramCard from '../../components/ui/ProgramCard';
import MediaCard from '../../components/ui/MediaCard';
import OfferBanner from '../../components/ui/OfferBanner';
import EventBanner from '../../components/ui/EventBanner';
import TestimonialCard from '../../components/ui/TestimonialCard';
import LocationSection from '../../components/ui/LocationSection';
import { BookTrialButton } from '../../components/ContactButtons';
import SocialBrandLinks from '../../components/SocialBrandLinks';
import LoadingSpinner from '../../components/LoadingSpinner';
import FeeHighlights from '../../components/FeeHighlights';
import NotificationPopup from '../../components/ui/NotificationPopup';

const Home = () => {
  const [data, setData] = useState({
    programs: [],
    media: [],
    offer: null,
    event: null,
    testimonials: [],
    settings: null,
    loading: true,
  });

  const heroImages = [
    '/hero.png',
    '/hero-2.png',
    '/hero-3.png'
  ];
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [programsRes, mediaRes, offersRes, testimonialsRes, eventsRes, settingsRes] = await Promise.all([
          publicApi.getPrograms().catch(() => ({ data: [] })),
          publicApi.getMedia().catch(() => ({ data: [] })),
          publicApi.getOffers().catch(() => ({ data: [] })),
          publicApi.getTestimonials().catch(() => ({ data: [] })),
          publicApi.getEvents().catch(() => ({ data: [] })),
          publicApi.getSettings().catch(() => ({ data: null })),
        ]);

        // Find active offer
        const activeOffer = offersRes.data.find(o => o.isActive && (!o.endDate || new Date(o.endDate) >= new Date()));
        
        // Find next upcoming event
        const upcomingEvent = (eventsRes.data || [])
          .filter(e => e.isPublished && new Date(e.eventDate) >= new Date(new Date().setHours(0,0,0,0)))
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))[0];

        // Prioritize featured media, fill with recent if needed
        const allMedia = mediaRes.data || [];
        const featuredMedia = allMedia.filter(m => m.isFeatured);
        const remainingMedia = allMedia.filter(m => !m.isFeatured);
        const displayMedia = [...featuredMedia, ...remainingMedia].slice(0, 4);

        setData({
          programs: programsRes.data || [],
          media: displayMedia,
          offer: activeOffer || null,
          event: upcomingEvent || null,
          testimonials: testimonialsRes.data.slice(0, 3) || [],
          settings: settingsRes.data || null,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching home data:', error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchHomeData();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (data.loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col">
      <SEO 
        title="The Tiny Twirl | Kids Gymnastics Centre in Coimbatore" 
        description="Welcome to The Tiny Twirl, a premier kids gymnastics centre in Coimbatore. Move, Learn, Grow with us!"
        path="/home"
      />
      
      {/* SECTION 1 - HERO */}
      <section className="relative overflow-hidden bg-cream py-14 lg:py-20">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-purple/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-turquoise/10 blur-3xl" />
        
        <div className="container-custom relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="mb-3 px-1 text-sm font-semibold uppercase tracking-wide text-turquoise sm:text-base">
              Kids gymnastics centre in Coimbatore
            </p>
            <h1 className="mb-4 font-display text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
              Little Twirl, <span className="text-purple">Big Smile!</span>
            </h1>
            <p className="mb-6 text-lg text-charcoal/80 sm:text-xl">
              A welcoming space where children move, learn and grow with confidence — through gymnastics, fitness, yoga, dance and play.
            </p>
            <ul className="mb-8 mx-auto flex max-w-xl flex-col gap-2 text-left text-sm font-semibold text-charcoal/80 sm:text-base lg:mx-0">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-turquoise" aria-hidden="true" />
                Progressive classes for ages 1–14
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-turquoise" aria-hidden="true" />
                Child-centred coaching with safety first
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-turquoise" aria-hidden="true" />
                Confidence, coordination and joyful participation
              </li>
            </ul>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <BookTrialButton className="w-full sm:w-auto" />
              <Link to="/programs" className="btn-secondary w-full sm:w-auto">
                Explore Programs
              </Link>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-turquoise px-6 py-3 font-bold text-turquoise transition-all hover:bg-turquoise hover:text-white focus:outline-none focus:ring-2 focus:ring-turquoise focus:ring-offset-2 sm:w-auto"
              >
                Contact
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-card border-8 border-white bg-white flex flex-col relative z-20">
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 overflow-hidden relative group">
                  <Link to="/gallery" className="absolute inset-0 z-30" aria-label="View Gallery"></Link>
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentHeroIdx}
                      src={heroImages[currentHeroIdx]}
                      alt="Child practising gymnastics at The Tiny Twirl in Coimbatore" 
                      className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                </div>
                <div className="bg-white py-3 text-center z-10 relative">
                  <p className="font-display text-lg font-semibold tracking-tight text-purple sm:text-xl">
                    Kids gymnastics in Coimbatore
                  </p>
                  <SocialBrandLinks size="sm" className="mt-2 justify-center" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 bg-yellow w-24 h-24 rounded-full mix-blend-multiply opacity-50 blur-xl" />
              <div className="absolute -top-6 -right-6 bg-turquoise w-32 h-32 rounded-full mix-blend-multiply opacity-50 blur-xl" />
            </div>
          </motion.div>
        </div>
      </section>

      <FeeHighlights settings={data.settings} />

      {/* SECTION 3 - WHY US */}
      <section className="section-padding container-custom">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-charcoal mb-4">More Than Gymnastics</h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Gymnastics helps children explore movement, coordination, confidence and discipline in a positive, encouraging environment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { title: "Movement & Coordination", desc: "Developing fundamental motor skills through play." },
            { title: "Confidence", desc: "Building self-esteem with every new skill learned." },
            { title: "Focus & Discipline", desc: "Learning to listen, follow instructions, and focus." },
            { title: "Inclusive Learning", desc: "A welcoming space for all, including autistic children." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="card bg-white border border-purple/5 hover:border-turquoise text-center"
            >
              <h3 className="font-bold text-purple text-xl mb-3">{feature.title}</h3>
              <p className="text-charcoal/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/programs" className="btn-secondary">Discover Our Programs</Link>
        </div>
      </section>

      {/* SECTION 6 - CURRENT OFFER (Moved before programs per user request) */}
      {data.offer && (
        <section id="offers-events-section" className="section-padding container-custom pb-0">
          <OfferBanner offer={data.offer} isCompact={true} />
        </section>
      )}

      {/* SECTION 6.5 - UPCOMING EVENT (Moved before programs per user request) */}
      {data.event && (
        <section id={!data.offer ? "offers-events-section" : undefined} className="section-padding container-custom pb-0 pt-8">
          <EventBanner event={data.event} />
        </section>
      )}

      {/* SECTION 4 - PROGRAMS PREVIEW */}
      <section className="section-padding bg-cream border-y border-purple/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-charcoal mb-4">Find Their Perfect Twirl</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Explore gymnastics experiences designed around different ages and stages.
            </p>
          </div>
          
          {data.programs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto mb-12">
              {data.programs.map((program) => (
                <ProgramCard key={program._id} program={program} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-soft border border-purple/10 max-w-2xl mx-auto mb-12">
              <h3 className="font-display text-2xl font-bold text-purple mb-3">Programs Updating</h3>
              <p className="text-charcoal/70 mb-6">Our programs are currently being updated for the new season. Please contact us to learn about current batches and timings.</p>
              <Link to="/contact" className="btn-primary">Ask About Programs</Link>
            </div>
          )}
          
          {data.programs.length > 0 && (
            <div className="text-center">
              <Link to="/programs" className="btn-primary">View All Programs</Link>
            </div>
          )}
        </div>
      </section>



      {/* SECTION 5 - GALLERY PREVIEW */}
      <section className="section-padding container-custom">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-charcoal mb-4">Little Moments. Big Smiles.</h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Catch a glimpse of the fun and learning at The Tiny Twirl.
          </p>
        </div>
        
        {data.media.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {data.media.map((item, idx) => (
                <MediaCard key={item._id || idx} item={item} onClick={() => window.location.href = '/gallery'} />
              ))}
            </div>
            <div className="text-center">
              <Link to="/gallery" className="btn-secondary">See More Moments</Link>
            </div>
          </>
        ) : (
          <div className="bg-purple/5 rounded-3xl p-12 text-center border border-purple/10 max-w-2xl mx-auto">
             <Star className="w-12 h-12 text-purple/20 mx-auto mb-4" />
             <p className="text-charcoal/70">Gallery moments are coming soon.</p>
          </div>
        )}
      </section>

      {/* SECTION 7 - TESTIMONIALS */}
      {data.testimonials.length > 0 && (
        <section className="section-padding bg-cream border-t border-purple/5">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-charcoal mb-4">What Parents Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {data.testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8 - VISIT US */}
      <section className="section-padding container-custom pb-8">
        <LocationSection />
      </section>

      <NotificationPopup offer={data.offer} event={data.event} />

    </div>
  );
};

export default Home;
