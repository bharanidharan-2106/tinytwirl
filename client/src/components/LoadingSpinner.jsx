import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', label = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2
        className={`animate-spin text-purple ${sizeClasses[size] || sizeClasses.md}`}
        aria-hidden="true"
      />
      {label && <span className="text-sm font-medium text-charcoal/60">{label}</span>}
    </div>
  );
};

export default LoadingSpinner;
