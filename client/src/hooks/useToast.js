import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const Toast = () =>
    toast ? (
      <div
        className={`fixed bottom-6 right-6 z-[100] max-w-sm rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg ${
          toast.type === 'error' ? 'bg-red-600' : toast.type === 'success' ? 'bg-green-600' : 'bg-purple'
        }`}
        role="alert"
      >
        {toast.message}
      </div>
    ) : null;

  return { showToast, Toast };
};
