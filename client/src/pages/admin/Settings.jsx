import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

const SettingsAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    registrationFee: 2000,
    registrationFeeEnabled: true,
    autismPackageFee: 800,
    autismPackageFeeEnabled: true,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getSettings();
      if (res.data) {
        setFormData({
          registrationFee: res.data.registrationFee || 0,
          registrationFeeEnabled: res.data.registrationFeeEnabled !== false,
          autismPackageFee: res.data.autismPackageFee || 0,
          autismPackageFeeEnabled: res.data.autismPackageFeeEnabled !== false,
        });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      await adminApi.updateSettings({
        registrationFee: Number(formData.registrationFee),
        registrationFeeEnabled: formData.registrationFeeEnabled,
        autismPackageFee: Number(formData.autismPackageFee),
        autismPackageFeeEnabled: formData.autismPackageFeeEnabled,
      });
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-2xl">
      <SEO title="Site Settings" path="/admin/settings" />
      
      <div>
        <h1 className="text-3xl font-display font-bold text-charcoal">Global Settings</h1>
        <p className="text-gray-500 mt-1">Manage global site pricing and fees.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
                {message}
              </div>
            )}
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 relative">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <label className="text-sm text-gray-500 font-medium cursor-pointer flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-purple focus:ring-purple border-gray-300 rounded cursor-pointer"
                           checked={formData.registrationFeeEnabled} 
                           onChange={e => setFormData({...formData, registrationFeeEnabled: e.target.checked})} />
                    Enable
                  </label>
                </div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Registration Fee (₹)</label>
                <input 
                  type="number" required 
                  className={`w-full max-w-[200px] px-3 py-2 border rounded-lg focus:ring-purple focus:border-purple outline-none ${!formData.registrationFeeEnabled ? 'bg-gray-100 text-gray-400 border-gray-200' : 'border-gray-300'}`}
                  disabled={!formData.registrationFeeEnabled}
                  value={formData.registrationFee} onChange={e => setFormData({...formData, registrationFee: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-2">One-time fee when joining. If disabled, it won't appear on the home page.</p>
              </div>

              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 relative">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <label className="text-sm text-gray-500 font-medium cursor-pointer flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-purple focus:ring-purple border-gray-300 rounded cursor-pointer"
                           checked={formData.autismPackageFeeEnabled} 
                           onChange={e => setFormData({...formData, autismPackageFeeEnabled: e.target.checked})} />
                    Enable
                  </label>
                </div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Autism Kids Package Fee (₹ per class)</label>
                <input 
                  type="number" required 
                  className={`w-full max-w-[200px] px-3 py-2 border rounded-lg focus:ring-purple focus:border-purple outline-none ${!formData.autismPackageFeeEnabled ? 'bg-gray-100 text-gray-400 border-gray-200' : 'border-gray-300'}`}
                  disabled={!formData.autismPackageFeeEnabled}
                  value={formData.autismPackageFee} onChange={e => setFormData({...formData, autismPackageFee: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-2">Fee charged per class for this package. If disabled, it won't appear on the home page.</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button type="submit" disabled={saving} className="btn-primary py-2 px-6 rounded-lg disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdmin;
