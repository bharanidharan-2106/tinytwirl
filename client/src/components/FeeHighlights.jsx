import { Link } from 'react-router-dom';
import { ClipboardList, HeartHandshake } from 'lucide-react';
import { siteConfig } from '../config/site';
import { formatRupee } from '../utils/fees';

const FeeHighlights = ({ settings }) => {
  // Fallback to siteConfig if settings not loaded yet
  const registration = settings?.registrationFee ?? siteConfig.fees.registration;
  const autismPerClass = settings?.autismPackageFee ?? siteConfig.fees.autismPerClass;

  const regEnabled = settings?.registrationFeeEnabled !== false;
  const autismEnabled = settings?.autismPackageFeeEnabled !== false;

  if (!regEnabled && !autismEnabled) return null;

  return (
    <section className="bg-white border-b border-purple/10">
      <div className="container-custom py-8 lg:py-10">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">Fees at a glance</h2>
          <p className="mt-2 text-charcoal/70">
            Clear starting costs for parents. Program package fees are listed with each program.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {regEnabled && (
            <div className="min-w-0 w-full rounded-3xl border border-turquoise/20 bg-turquoise/5 p-6">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-turquoise text-white">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-turquoise">Registration fee</p>
              <p className="mt-1 font-display text-3xl font-bold text-charcoal">{formatRupee(registration)}</p>
              <p className="mt-2 text-sm text-charcoal/70">One-time fee when your child joins The Tiny Twirl.</p>
            </div>
          )}
          {autismEnabled && (
            <div className="min-w-0 w-full rounded-3xl border border-purple/15 bg-purple/5 p-6">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-purple text-white">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-purple">Autism Kids Package</p>
              <p className="mt-1 font-display text-3xl font-bold text-charcoal">
                {formatRupee(autismPerClass)} <span className="text-lg font-semibold text-charcoal/70">per class</span>
              </p>
              <p className="mt-2 text-sm text-charcoal/70">Inclusive support, charged per class.</p>
            </div>
          )}
        </div>
        <p className="mt-5 text-center text-sm text-charcoal/70">
          3-month, 6-month and 12-month packages vary by program.{' '}
          <Link to="/programs" className="font-bold text-purple hover:underline">
            See program fees
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FeeHighlights;
