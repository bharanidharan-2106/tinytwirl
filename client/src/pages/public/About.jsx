import { motion } from 'framer-motion';
import { Star, Heart, Smile, Sparkles } from 'lucide-react';
import SEO from '../../components/SEO';
import PageHero from '../../components/ui/PageHero';
import LocationSection from '../../components/ui/LocationSection';

const About = () => {
  return (
    <div className="flex flex-col">
      <SEO 
        title="About The Tiny Twirl | Kids Gymnastics Centre" 
        description="Learn about The Tiny Twirl's philosophy on movement, confidence, learning, and our inclusive gymnastics experiences."
        path="/about"
      />
      
      <PageHero 
        title="Where Little Ones Learn to Twirl & Grow"
        description="A positive, encouraging environment designed specifically for children."
      />

      {/* Core Philosophy Section */}
      <section className="section-padding container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl font-bold text-charcoal mb-6">Our Philosophy</h2>
            <p className="text-lg text-charcoal/80 mb-6">
              At The Tiny Twirl, we believe that gymnastics is more than just learning how to tumble—it's about laying the foundation for a lifetime of confidence, health, and joy.
            </p>
            <p className="text-lg text-charcoal/80 mb-8">
              We focus on child-led exploration in a safe and supportive space. Our coaches are dedicated to celebrating every small victory and ensuring every child leaves with a big smile.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Sparkles, title: "Movement", desc: "Developing gross motor skills and coordination." },
                { icon: Star, title: "Confidence", desc: "Building self-esteem through achieved goals." },
                { icon: Smile, title: "Learning", desc: "Fostering focus and discipline through play." },
                { icon: Heart, title: "Inclusion", desc: "A welcoming space for every child to shine." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple/10 flex items-center justify-center text-purple">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal">{item.title}</h4>
                    <p className="text-sm text-charcoal/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[2rem] bg-purple/10 border-8 border-white shadow-card overflow-hidden relative">
               <img src="/about-kid.png" alt="Happy child with medals" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-turquoise p-6 rounded-3xl shadow-lg max-w-[250px] z-10">
               <p className="font-bold text-white text-lg leading-tight">"Every child deserves a place where they feel celebrated."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inclusive Gymnastics Section */}
      <section className="section-padding bg-cream border-y border-purple/5">
        <div className="container-custom max-w-4xl text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mb-6 text-yellow">
            <Star className="h-8 w-8 fill-current" />
          </div>
          <h2 className="font-display text-4xl font-bold text-charcoal mb-6">Inclusive Gymnastics</h2>
          <p className="text-xl text-charcoal/80 mb-8">
            The Tiny Twirl welcomes inclusive gymnastics experiences for autistic children.
          </p>
          <p className="text-lg text-charcoal/70">
            We understand that every child learns and processes their environment differently. Our inclusive approach focuses on patience, adaptable communication, and creating a sensory-friendly space where children can explore movement at their own pace. 
          </p>
        </div>
      </section>

      {/* Location / Contact CTA */}
      <section className="section-padding container-custom">
        <LocationSection />
      </section>
    </div>
  );
};

export default About;
