import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Trash2, Edit, MessageSquare, X, Plus, Star } from 'lucide-react';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [deleteId, setDeleteId] = useState(null);
  
  const initialForm = {
    parentName: '',
    childProgram: '',
    content: '',
    rating: 5,
    isPublished: true,
    isFeatured: false,
  };
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getTestimonials();
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenModal = (testimonial = null) => {
    setFormError('');
    if (testimonial) {
      setEditingId(testimonial._id);
      setFormData({
        parentName: testimonial.parentName,
        childProgram: testimonial.childProgram || '',
        content: testimonial.content,
        rating: testimonial.rating || 5,
        isPublished: testimonial.isPublished,
        isFeatured: testimonial.isFeatured || false,
      });
    } else {
      setEditingId(null);
      setFormData(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    
    try {
      if (editingId) {
        await adminApi.updateTestimonial(editingId, formData);
      } else {
        await adminApi.createTestimonial(formData);
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save testimonial.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminApi.deleteTestimonial(deleteId);
      fetchTestimonials();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed. Please try again.');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SEO title="Manage Testimonials" path="/admin/testimonials" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-charcoal">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage feedback and reviews from parents.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary py-2 px-6 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>
      
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-charcoal mb-2">No testimonials yet</h3>
          <p className="text-gray-500 mb-6">Add feedback from happy parents to display on your site.</p>
          <button onClick={() => handleOpenModal()} className="btn-primary">Add Testimonial</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((testi) => (
            <div key={testi._id} className={`bg-white rounded-2xl p-6 shadow-sm border ${testi.isFeatured ? 'border-purple/30 bg-purple/5' : 'border-gray-100'} flex flex-col`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-charcoal text-lg">{testi.parentName}</h3>
                  {testi.childProgram && (
                    <p className="text-sm text-gray-500">{testi.childProgram}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-1">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md shrink-0 ${testi.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {testi.isPublished ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                    {testi.isFeatured && (
                      <span className="px-2 py-1 text-xs font-bold rounded-md shrink-0 bg-purple-100 text-purple">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(testi.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 italic mb-6 flex-1">"{testi.content}"</p>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100/50">
                <button onClick={() => handleOpenModal(testi)} className="p-2 text-gray-500 hover:text-purple transition-colors bg-white border border-gray-200 rounded-lg hover:border-purple">
                  <Edit size={16} />
                </button>
                <button onClick={() => setDeleteId(testi._id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors bg-white border border-gray-200 rounded-lg hover:border-red-200 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-xl font-bold text-charcoal">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="testimonial-form" onSubmit={handleFormSubmit} className="space-y-4">
                {formError && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                    {formError}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
                    <input 
                      type="text" required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Child/Program (Optional)</label>
                    <input 
                      type="text" placeholder="e.g. Sarah - Preschool"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.childProgram} onChange={e => setFormData({...formData, childProgram: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Content *</label>
                  <textarea 
                    required rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                    value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                    value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" id="isPublished"
                      className="w-4 h-4 text-purple focus:ring-purple rounded border-gray-300"
                      checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})}
                    />
                    <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">Published (Visible to public)</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" id="isFeatured"
                      className="w-4 h-4 text-purple focus:ring-purple rounded border-gray-300"
                      checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured (Show on Homepage)</label>
                  </div>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="testimonial-form" disabled={saving} className="btn-primary py-2 px-6 rounded-lg disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Testimonial'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default TestimonialsAdmin;
