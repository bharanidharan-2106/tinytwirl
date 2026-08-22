import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Trash2, Edit, List as ListIcon, X, Plus } from 'lucide-react';

const ProgramsAdmin = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [deleteId, setDeleteId] = useState(null);
  
  const initialForm = {
    name: '',
    slug: '',
    ageRange: '',
    stage: '',
    shortObjective: '',
    description: '',
    objectives: '',
    order: 0,
    isPublished: true
  };
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getPrograms();
      setPrograms(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenModal = (program = null) => {
    setFormError('');
    if (program) {
      setEditingId(program._id);
      setFormData({
        name: program.name,
        slug: program.slug,
        ageRange: program.ageRange,
        stage: program.stage,
        shortObjective: program.shortObjective,
        description: program.description,
        objectives: program.objectives?.join('\n') || '',
        order: program.order,
        isPublished: program.isPublished
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
    
    // Parse objectives from textarea to array
    const objectivesArray = formData.objectives
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const payload = {
      ...formData,
      objectives: objectivesArray
    };

    try {
      if (editingId) {
        await adminApi.updateProgram(editingId, payload);
      } else {
        await adminApi.createProgram(payload);
      }
      setIsModalOpen(false);
      fetchPrograms();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save program.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminApi.deleteProgram(deleteId);
      fetchPrograms();
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
      <SEO title="Manage Programs" path="/admin/programs" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-charcoal">Programs</h1>
          <p className="text-gray-500 mt-1">Manage gymnastics programs offered.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary py-2 px-6 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add Program
        </button>
      </div>
      
      {programs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <ListIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-charcoal mb-2">No programs added yet</h3>
          <p className="text-gray-500 mb-6">Add a program to display it on the public website.</p>
          <button onClick={() => handleOpenModal()} className="btn-primary">Add Program</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <tr>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Age Range</th>
                  <th className="p-4 font-medium">Stage</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {programs.map((prog) => (
                  <tr key={prog._id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      <p className="font-bold text-charcoal">{prog.name}</p>
                      <p className="text-xs text-gray-400">/{prog.slug}</p>
                    </td>
                    <td className="p-4 text-gray-600">{prog.ageRange}</td>
                    <td className="p-4 text-gray-600">{prog.stage}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-md ${prog.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {prog.isPublished ? 'ACTIVE' : 'DRAFT'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(prog)} className="p-2 text-gray-400 hover:text-purple transition-colors bg-white border border-gray-200 rounded-lg hover:border-purple">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => setDeleteId(prog._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white border border-gray-200 rounded-lg hover:border-red-200 hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-xl font-bold text-charcoal">{editingId ? 'Edit Program' : 'Add Program'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="program-form" onSubmit={handleFormSubmit} className="space-y-4">
                {formError && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                    {formError}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input 
                      type="text" required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL Path) *</label>
                    <input 
                      type="text" required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age Range *</label>
                    <input 
                      type="text" required placeholder="e.g. 3-5 Years"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.ageRange} onChange={e => setFormData({...formData, ageRange: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stage *</label>
                    <input 
                      type="text" required placeholder="e.g. Beginners"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                      value={formData.stage} onChange={e => setFormData({...formData, stage: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Objective *</label>
                  <input 
                    type="text" required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                    value={formData.shortObjective} onChange={e => setFormData({...formData, shortObjective: e.target.value})}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Objectives (One per line)</label>
                  <textarea 
                    rows="3" placeholder="Builds core strength&#10;Improves coordination"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple outline-none"
                    value={formData.objectives} onChange={e => setFormData({...formData, objectives: e.target.value})}
                  />
                </div>

                <div className="flex items-center gap-2">
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
              <button type="submit" form="program-form" disabled={saving} className="btn-primary py-2 px-6 rounded-lg disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Program'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Program"
        message="Are you sure you want to delete this program? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default ProgramsAdmin;
