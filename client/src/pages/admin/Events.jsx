import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Trash2, Edit, Calendar as CalendarIcon, X, Plus, Image as ImageIcon, MapPin } from 'lucide-react';

const EventsAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [deleteId, setDeleteId] = useState(null);
  
  const initialForm = {
    title: '',
    description: '',
    eventDate: '',
    endDate: '',
    location: '',
    isPublished: true,
    file: null,
  };
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getEvents();
      // Sort by date (upcoming first)
      const sorted = res.data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      setEvents(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (event = null) => {
    setFormError('');
    if (event) {
      setEditingId(event._id);
      setFormData({
        title: event.title,
        description: event.description,
        eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 16) : '', // datetime-local format
        endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
        location: event.location || '',
        isPublished: event.isPublished,
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
    payload.append('eventDate', formData.eventDate);
    if (formData.endDate) payload.append('endDate', formData.endDate);
    payload.append('location', formData.location);
    payload.append('isPublished', formData.isPublished);
    if (formData.file) {
      payload.append('file', formData.file);
    }

    try {
      if (editingId) {
        await adminApi.updateEvent(editingId, payload);
      } else {
        await adminApi.createEvent(payload);
      }
      setIsModalOpen(false);
      fetchEvents();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save event.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminApi.deleteEvent(deleteId);
      fetchEvents();
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
      <SEO title="Manage Events" path="/admin/events" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-charcoal">Events</h1>
          <p className="text-gray-500 mt-1">Manage upcoming competitions, camps, and gatherings.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary py-2 px-6 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>
      
      {events.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-charcoal mb-2">No upcoming events</h3>
          <p className="text-gray-500 mb-6">Schedule your first event to keep the community informed.</p>
          <button onClick={() => handleOpenModal()} className="btn-primary">Add Event</button>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const eventDateObj = new Date(event.eventDate);
            const isPast = eventDateObj < new Date();
            
            return (
              <div key={event._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto shrink-0 relative bg-gray-100">
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-purple/5 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-purple/20" />
                    </div>
                  )}
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-xl p-2 text-center shadow-md min-w-[3rem]">
                    <span className="block text-xs font-bold text-gray-500 uppercase">{eventDateObj.toLocaleString('default', { month: 'short' })}</span>
                    <span className="block text-xl font-display font-bold text-purple">{eventDateObj.getDate()}</span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-charcoal text-xl">{event.title}</h3>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs font-bold rounded-md shrink-0 ${event.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {event.isPublished ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                      {isPast && (
                        <span className="px-2 py-1 text-xs font-bold rounded-md shrink-0 bg-gray-200 text-gray-600">
                          PAST
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <CalendarIcon size={16} />
                      <span>
                        {eventDateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {event.endDate && ` - ${new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                  
                  <div className="mt-auto flex justify-end gap-2 pt-4 border-t border-gray-100">
                    <button onClick={() => handleOpenModal(event)} className="p-2 text-gray-500 hover:text-purple transition-colors bg-gray-50 rounded-lg hover:bg-purple/10">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => setDeleteId(event._id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors bg-gray-50 rounded-lg hover:bg-red-50">
                      <Trash2 size={16} />
                    </button>
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
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-xl font-bold text-charcoal">{editingId ? 'Edit Event' : 'Add Event'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="event-form" onSubmit={handleFormSubmit} className="space-y-4">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time *</label>
                    <input 
                      type="datetime-local" required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time (Optional)</label>
                    <input 
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location / Venue</label>
                  <input 
                    type="text" placeholder="e.g. The Tiny Twirl Gym"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                    value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Image {editingId ? '(Optional, choose new to replace)' : '(Optional)'}</label>
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
                    type="checkbox" id="isPublished"
                    className="w-4 h-4 text-purple focus:ring-purple rounded border-gray-300"
                    checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})}
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">Published (Visible to public)</label>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="event-form" disabled={saving} className="btn-primary py-2 px-6 rounded-lg disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Event'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default EventsAdmin;
