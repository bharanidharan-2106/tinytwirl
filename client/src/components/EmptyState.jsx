import { Inbox } from 'lucide-react';

const EmptyState = ({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  message,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 text-center shadow-card ${className}`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple/10">
        <Icon className="h-8 w-8 text-purple" aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-bold text-charcoal">{title}</h3>
      {message && <p className="mt-2 max-w-md text-charcoal/60">{message}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
