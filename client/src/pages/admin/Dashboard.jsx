import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Tag, Calendar, MessageSquare, PlusCircle } from 'lucide-react';
import { adminApi } from '../../services/api';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState({
    media: 0,
    programs: 0,
    offers: 0,
    events: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminApi.getStats();
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  const statCards = [
    { title: 'Media', count: stats.media, icon: Image, color: 'text-blue-500', bg: 'bg-blue-100', path: '/admin/media' },
    { title: 'Programs', count: stats.programs, icon: List, color: 'text-purple', bg: 'bg-purple/10', path: '/admin/programs' },
    { title: 'Active Offers', count: stats.offers, icon: Tag, color: 'text-green-500', bg: 'bg-green-100', path: '/admin/offers' },
    { title: 'Upcoming Events', count: stats.events, icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-100', path: '/admin/events' },
    { title: 'Testimonials', count: stats.testimonials, icon: MessageSquare, color: 'text-pink-500', bg: 'bg-pink-100', path: '/admin/testimonials' },
  ];

  const quickActions = [
    { label: 'Upload Media', path: '/admin/media' },
    { label: 'Add Program', path: '/admin/programs' },
    { label: 'Create Offer', path: '/admin/offers' },
    { label: 'Add Event', path: '/admin/events' },
    { label: 'Add Testimonial', path: '/admin/testimonials' },
  ];

  return (
    <div className="space-y-8">
      <SEO title="Admin Dashboard" path="/admin/dashboard" />
      
      <div>
        <h1 className="text-3xl font-display font-bold text-charcoal">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Manage your website content from here.</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card, idx) => (
          <Link key={idx} to={card.path} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-purple/30 transition-colors flex items-center gap-4">
            <div className={`p-4 rounded-full ${card.bg}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-charcoal">{card.count}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-charcoal mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          {quickActions.map((action, idx) => (
            <Link 
              key={idx} 
              to={action.path}
              className="inline-flex items-center gap-2 bg-purple/10 text-purple hover:bg-purple hover:text-white px-5 py-3 rounded-xl font-medium transition-colors"
            >
              <PlusCircle size={18} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
