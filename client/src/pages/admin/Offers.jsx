import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Trash2, Edit, Tag, X, Plus, Image as ImageIcon } from 'lucide-react';

const OffersAdmin = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [deleteId, setDeleteId] = useState(null);
  
  const initialForm = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    isActive: true,
    file: null,
  };
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getOffers();
      setOffers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleOpenModal = (offer = null) => {
    setFormError('');
    if (offer) {
      setEditingId(offer._id);
      setFormData({
        title: offer.title,
        description: offer.description,
        startDate: offer.startDate ? new Date(offer.startDate).toISOString().split('T')[0] : '',
        endDate: offer.endDate ? new Date(offer.endDate).toISOString().split('T')[0] : '',
        isActive: offer.isActive,
        file: null, // File is not prepopulated for edit
      });
    } else {
      setEditingId(null);
      setFormData(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('startDate', formData.startDate);
    payload.append('endDate', formData.endDate);
    payload.append('isActive', formData.isActive);
    if (formData.file) {
      payload.append('file', formData.file);
    }

    try {
      if (editingId) {
        await adminApi.updateOffer(editingId, payload);
      } else {
        await adminApi.createOffer(payload);
      }
      setIsModalOpen(false);
      fetchOffers();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save offer.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminApi.deleteOffer(deleteId);
      fetchOffers();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed. Please try again.');
    } finally {
      setDeleteId(null);
    }
  };

  const isOfferActive = (offer) => {
    if (!offer.isActive) return false;
    if (offer.endDate && new Date(offer.endDate) < new Date()) return false;
    return true;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SEO title="Manage Offers" path="/admin/offers" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-charcoal">Offers</h1>
          <p className="text-gray-500 mt-1">Manage special promotions and discounts.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary py-2 px-6 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Create Offer
        </button>
      </div>
      
      {offers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-charcoal mb-2">No active offers</h3>
          <p className="text-gray-500 mb-6">Create an offer when you have a promotion to publish.</p>
          <button onClick={() => handleOpenModal()} className="btn-primary">Create Offer</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const active = isOfferActive(offer);
            return (
              <div key={offer._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                {offer.imageUrl ? (
                  <img src={offer.imageUrl} alt={offer.title} className="w-full h-48 object-cover bg-gray-100" />
                ) : (
                  <div className="w-full h-48 bg-purple/5 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-purple/20" />
                  </div>
                )}
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-charcoal text-lg line-clamp-1">{offer.title}</h3>
                    <span className={`px-2 py-1 text-xs font-bold rounded-md shrink-0 ${active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {active ? 'ACTIVE' : (offer.isActive ? 'EXPIRED' : 'INACTIVE')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{offer.description}</p>
                  
                  <div className="mt-auto">
                    <div className="text-xs text-gray-400 mb-4 flex justify-between">
                      <span>Start: {new Date(offer.startDate).toLocaleDateString()}</span>
                      <span>End: {new Date(offer.endDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                      <button onClick={() => handleOpenModal(offer)} className="p-2 text-gray-500 hover:text-purple transition-colors bg-gray-50 rounded-lg hover:bg-purple/10">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => setDeleteId(offer._id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors bg-gray-50 rounded-lg hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-xl font-bold text-charcoal">{editingId ? 'Edit Offer' : 'Create Offer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="offer-form" onSubmit={handleFormSubmit} className="space-y-4">
                {formError && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                    {formError}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input 
                    type="text" required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea 
                    required rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                    <input 
                      type="date" required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                    <input 
                      type="date" required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image {editingId ? '(Optional, choose new to replace)' : '(Optional)'}</label>
                  <input 
                    type="file" accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple/10 file:text-purple hover:file:bg-purple/20 transition-colors"
                  />
                  {formData.file && (
                    <p className="mt-2 text-xs text-gray-500">Selected: {formData.file.name}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" id="isActive"
                    className="w-4 h-4 text-purple focus:ring-purple rounded border-gray-300"
                    checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})}
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active (Visible if within dates)</label>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="offer-form" disabled={saving} className="btn-primary py-2 px-6 rounded-lg disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Offer'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Offer"
        message="Are you sure you want to delete this offer? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default OffersAdmin;
