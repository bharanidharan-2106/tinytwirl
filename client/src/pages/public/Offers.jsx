import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import SEO from '../../components/SEO';
import PageHero from '../../components/ui/PageHero';
import OfferBanner from '../../components/ui/OfferBanner';
import { publicApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { BookTrialButton } from '../../components/ContactButtons';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await publicApi.getOffers();
        // Filter only active offers
        const activeOffers = (data || []).filter(
          o => o.isActive && (!o.endDate || new Date(o.endDate) >= new Date())
        );
        setOffers(activeOffers);
      } catch (err) {
        setError('Failed to load offers. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="flex flex-col">
      <SEO 
        title="Gymnastics Offers | The Tiny Twirl" 
        description="Check out our latest special offers and discounts at The Tiny Twirl."
        path="/offers"
      />
      
      <PageHero 
        title="Special Offers"
        description="Great deals to get your child started on their gymnastics journey."
      />
      
      <section className="section-padding container-custom min-h-[50vh]">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-2xl">{error}</div>
        ) : offers.length > 0 ? (
          <div className="space-y-12">
            {offers.map((offer) => (
              <OfferBanner key={offer._id} offer={offer} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No Special Offers Right Now"
            message="There's no special offer running right now. Check back soon or contact us for current program information."
            action={<BookTrialButton />}
            icon={Tag}
          />
        )}
      </section>
    </div>
  );
};

export default Offers;
