import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ProgramCard from '../../components/ui/ProgramCard';
import { publicApi } from '../../services/api';
import EmptyState from '../../components/EmptyState';
import { BookTrialButton } from '../../components/ContactButtons';

const ProgramsSkeleton = () => (
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="card p-8 bg-white border border-purple/5 shadow-soft rounded-3xl animate-pulse">
        <div className="h-8 bg-gray-200 rounded-lg w-1/2 mb-6" />
        <div className="flex gap-6 mb-6">
          <div className="h-10 bg-gray-100 rounded-lg w-20" />
          <div className="h-10 bg-gray-100 rounded-lg w-24" />
        </div>
        <div className="h-16 bg-gray-100 rounded-lg w-full mb-8" />
        <div className="h-4 bg-gray-200 rounded-lg w-1/3 mb-3" />
        <div className="space-y-2 mb-8">
          <div className="h-4 bg-gray-100 rounded-lg w-full" />
          <div className="h-4 bg-gray-100 rounded-lg w-full" />
          <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
        </div>
        <div className="mt-auto space-y-3">
          <div className="h-5 bg-gray-100 rounded-lg w-2/3" />
          <div className="h-5 bg-gray-100 rounded-lg w-1/2" />
          <div className="h-5 bg-gray-100 rounded-lg w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data } = await publicApi.getPrograms();
        const sortedPrograms = (data || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        setPrograms(sortedPrograms);
      } catch (err) {
        setError('Unable to load programs right now. Please try again or contact The Tiny Twirl.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <div className="flex flex-col">
      <SEO 
        title="Gymnastics Programs for Kids | The Tiny Twirl" 
        description="Explore kids gymnastics programs at The Tiny Twirl in Saravanampatti, Coimbatore, designed around different ages, stages and abilities."
        path="/programs"
      />
      
      {/* Compact Custom Hero */}
      <section className="relative overflow-hidden bg-cream py-16 lg:py-20">
        {/* Subtle decorative shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-purple/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-turquoise/5 blur-3xl" />
        
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 font-display text-4xl font-extrabold text-charcoal sm:text-5xl">
              Gymnastics Programs for <span className="text-purple">Growing Little Stars</span>
            </h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Explore programs designed around different ages, stages and abilities, with a focus on movement, confidence and skill development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      {!loading && !error && programs.length > 0 && (
        <section className="pt-16 pb-8 container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Find the Right Program for Your Child</h2>
            <p className="text-charcoal/70">
              Each program is designed around a different stage of a child's gymnastics journey. Explore the age group, focus and objectives to find the right fit.
            </p>
          </div>
        </section>
      )}
      
      <section className="pb-20 container-custom min-h-[40vh]">
        {loading ? (
          <ProgramsSkeleton />
        ) : error ? (
          <div className="text-center bg-red-50/50 border border-red-100 p-8 rounded-3xl max-w-2xl mx-auto">
            <p className="text-red-600 mb-6 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary !bg-red-500 hover:!bg-red-600 !border-none"
            >
              Try Again
            </button>
          </div>
        ) : programs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
            {programs.map((program) => (
              <ProgramCard key={program._id} program={program} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="Programs are currently being updated."
            message="Please contact The Tiny Twirl to learn about available programs."
            action={
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
            }
          />
        )}
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-turquoise text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-4xl font-bold text-white mb-6">Not Sure Which Program Is Right for Your Child?</h2>
          <p className="text-xl text-white/90 mb-10">
            Talk to The Tiny Twirl team and learn more about the programs available.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <BookTrialButton className="!bg-white !text-turquoise hover:!bg-cream shadow-lg" />
            <Link to="/contact" className="btn-primary !bg-purple !border-none text-white hover:!bg-purple-dark">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
