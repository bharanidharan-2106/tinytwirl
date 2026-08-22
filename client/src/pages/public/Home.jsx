import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Users, Star } from 'lucide-react';
import SEO from '../../components/SEO';
import { publicApi } from '../../services/api';
import ProgramCard from '../../components/ui/ProgramCard';
import MediaCard from '../../components/ui/MediaCard';
import OfferBanner from '../../components/ui/OfferBanner';
import EventBanner from '../../components/ui/EventBanner';
import TestimonialCard from '../../components/ui/TestimonialCard';
import LocationSection from '../../components/ui/LocationSection';
import ContactButtons, { BookTrialButton } from '../../components/ContactButtons';
import LoadingSpinner from '../../components/LoadingSpinner';

const Home = () => {
  const [data, setData] = useState({
    programs: [],
    media: [],
    offer: null,
    event: null,
    testimonials: [],
    loading: true,
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [programsRes, mediaRes, offersRes, testimonialsRes, eventsRes] = await Promise.all([
          publicApi.getPrograms().catch(() => ({ data: [] })),
          publicApi.getMedia({ limit: 4 }).catch(() => ({ data: [] })),
          publicApi.getOffers().catch(() => ({ data: [] })),
          publicApi.getTestimonials().catch(() => ({ data: [] })),
          publicApi.getEvents().catch(() => ({ data: [] })),
        ]);

        // Find active offer
        const activeOffer = offersRes.data.find(o => o.isActive && (!o.endDate || new Date(o.endDate) >= new Date()));
        
        // Find next upcoming event
        const upcomingEvent = (eventsRes.data || [])
          .filter(e => e.isPublished && new Date(e.eventDate) >= new Date(new Date().setHours(0,0,0,0)))
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))[0];

        setData({
          programs: programsRes.data.slice(0, 2) || [],
          media: mediaRes.data.slice(0, 4) || [],
          offer: activeOffer || null,
          event: upcomingEvent || null,
          testimonials: testimonialsRes.data.slice(0, 3) || [],
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
      <section className="relative overflow-hidden bg-cream py-20 lg:py-32">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-purple/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-turquoise/10 blur-3xl" />
        
        <div className="container-custom relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="mb-4 inline-block rounded-full bg-purple/10 px-4 py-1.5 text-sm font-bold tracking-wider text-purple">
              KIDS GYMNASTICS • COIMBATORE
            </p>
            <h1 className="mb-6 font-display text-5xl font-extrabold text-charcoal sm:text-6xl lg:text-7xl">
              Little Twirl, <span className="text-purple">Big Smile!</span>
            </h1>
            <p className="mb-8 text-xl text-charcoal/80 sm:text-2xl">
              A joyful space where little ones move, learn, grow and shine.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link to="/contact" className="btn-primary w-full sm:w-auto">
                Contact Us
              </Link>
              <BookTrialButton className="w-full sm:w-auto" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-card border-8 border-white bg-white flex flex-col relative z-20">
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 overflow-hidden relative">
                  <img src="/hero.png" alt="Gymnastics Fun" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white py-3 text-center z-10 relative">
                  <p className="font-display text-xl text-purple font-bold">Gymnastics Fun starts here</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 bg-yellow w-24 h-24 rounded-full mix-blend-multiply opacity-50 blur-xl" />
              <div className="absolute -top-6 -right-6 bg-turquoise w-32 h-32 rounded-full mix-blend-multiply opacity-50 blur-xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - TRUST STRIP */}
      <section className="bg-purple text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            {[
              { icon: Sparkles, text: "Fun-Focused Movement" },
              { icon: Star, text: "Confidence & Coordination" },
              { icon: Heart, text: "Inclusive Gymnastics" },
              { icon: Users, text: "For Growing Little Stars" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-yellow" />
                </div>
                <h3 className="font-bold text-sm md:text-base">{item.text}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
        <section className="section-padding container-custom pb-0">
          <OfferBanner offer={data.offer} isCompact={true} />
        </section>
      )}

      {/* SECTION 6.5 - UPCOMING EVENT (Moved before programs per user request) */}
      {data.event && (
        <section className="section-padding container-custom pb-0 pt-8">
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



    </div>
  );
};

export default Home;
