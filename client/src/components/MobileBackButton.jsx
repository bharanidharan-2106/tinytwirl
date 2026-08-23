import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MobileBackButton = ({ className = '', light = false }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
        light
          ? 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
          : 'bg-white text-charcoal shadow-soft hover:bg-cream'
      } ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default MobileBackButton;
