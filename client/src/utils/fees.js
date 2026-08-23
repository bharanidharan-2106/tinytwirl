export const formatRupee = (amount) => {
  if (amount === null || amount === undefined || amount === '') return null;
  const value = Number(amount);
  if (!Number.isFinite(value)) return null;
  return `₹${value.toLocaleString('en-IN')}`;
};

export const FEE_PLANS = [
  { key: 'threeMonths', label: '3 Months', detail: '28 classes' },
  { key: 'sixMonths', label: '6 Months', detail: '52 classes' },
  { key: 'twelveMonths', label: '12 Months', detail: '100 classes' },
  { key: 'sibling', label: 'Siblings', detail: '' },
];

export const getProgramFeePlans = (program) =>
  FEE_PLANS.map((plan) => ({
    ...plan,
    amount: program?.fees?.[plan.key],
    formatted: formatRupee(program?.fees?.[plan.key]),
  })).filter((plan) => plan.formatted);
