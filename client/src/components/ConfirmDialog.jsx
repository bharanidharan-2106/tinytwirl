const ConfirmDialog = ({ open, isOpen, title, message, confirmLabel = 'Delete', onConfirm, onCancel, onClose }) => {
  const isVisible = open !== undefined ? open : isOpen;
  const handleCancel = onCancel || onClose;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card">
        {title && <h3 className="mb-2 text-lg font-bold text-charcoal">{title}</h3>}
        <p className="mb-6 text-charcoal/80">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-2xl border-2 border-gray-200 px-4 py-2 font-semibold text-charcoal hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-2xl bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
