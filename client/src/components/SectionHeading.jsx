const SectionHeading = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mx-auto mb-12 max-w-3xl text-center ${className}`}>
      <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-charcoal/70 sm:text-xl">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
