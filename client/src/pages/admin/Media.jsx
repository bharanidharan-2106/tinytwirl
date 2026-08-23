import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Trash2, Image as ImageIcon, Video, X, Star } from 'lucide-react';

const Media = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Delete state
  const [deleteId, setDeleteId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'OTHER',
    file: null,
  });
  const [formError, setFormError] = useState('');

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getMedia();
      setMedia(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setFormError('Please select a file to upload.');
      return;
    }
    
    setFormError('');
    setUploading(true);
    
    const data = new FormData();
    data.append('file', formData.file);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);

    try {
      await adminApi.uploadMedia(data);
      setIsModalOpen(false);
      setFormData({ title: '', description: '', category: 'OTHER', file: null });
      fetchMedia();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminApi.deleteMedia(deleteId);
      fetchMedia();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed. Please try again.');
    } finally {
      setDeleteId(null);
    }
  };

  const handleToggleFeature = async (item) => {
    try {
      if (!item.isFeatured) {
        const featuredCount = media.filter(m => m.isFeatured).length;
        if (featuredCount >= 4) {
          alert('You can only feature up to 4 media items on the home page.');
          return;
        }
      }
      await adminApi.updateMedia(item._id, { isFeatured: !item.isFeatured });
      fetchMedia();
    } catch (err) {
      console.error('Toggle feature failed', err);
      alert('Failed to update featured status.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SEO title="Manage Media" path="/admin/media" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-charcoal">Media Library</h1>
          <p className="text-gray-500 mt-1">Upload and manage photos and videos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary py-2 px-6 rounded-xl flex items-center gap-2"
        >
          <ImageIcon size={18} />
          Upload Media
        </button>
      </div>
      
      {media.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-charcoal mb-2">No media uploaded yet</h3>
          <p className="text-gray-500 mb-6">Upload your first photo or video to showcase The Tiny Twirl.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">Upload Now</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((item) => (
            <div key={item._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group relative flex flex-col">
              <div className="aspect-square bg-gray-100 relative">
                {item.type === 'VIDEO' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                    <Video className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 font-medium bg-white/80 px-2 py-1 rounded">Video</span>
                  </div>
                ) : (
                  <img src={item.thumbnailUrl || item.cloudinaryUrl} alt={item.title} className="w-full h-full object-cover" />
                )}
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleToggleFeature(item)}
                      className={`p-3 rounded-full transform hover:scale-110 transition-all shadow-lg ${item.isFeatured ? 'bg-yellow-400 text-white' : 'bg-white text-gray-400 hover:text-yellow-400'}`}
                      title={item.isFeatured ? 'Remove from Home Page' : 'Feature on Home Page'}
                    >
                      <Star size={20} className={item.isFeatured ? 'fill-current' : ''} />
                    </button>
                    <button 
                      onClick={() => setDeleteId(item._id)}
                      className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-all shadow-lg"
                      title="Delete Media"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-center relative">
                {item.isFeatured && (
                  <div className="absolute top-0 right-3 -translate-y-1/2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Featured
                  </div>
                )}
                <p className="font-bold text-charcoal text-sm truncate">{item.title}</p>
                <p className="text-xs text-gray-500 capitalize">{item.category.toLowerCase()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-charcoal">Upload Media</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="CLASSES">Classes</option>
                  <option value="EVENTS">Events</option>
                  <option value="PERFORMANCES">Performances</option>
                  <option value="KIDS">Kids</option>
                  <option value="CENTRE">Centre</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                  rows="2"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File * (Image or Video)</label>
                <input 
                  type="file" required accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple/10 file:text-purple hover:file:bg-purple/20 transition-colors"
                />
                {formData.file && (
                  <p className="mt-2 text-xs text-gray-500">Selected: {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)</p>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="btn-primary py-2 px-6 rounded-lg disabled:opacity-50">
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Media"
        message="Are you sure you want to delete this media? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Media;
