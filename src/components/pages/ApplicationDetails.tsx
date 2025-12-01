import { useState, useEffect } from 'react';
import { useApplications, ApplicationComment } from '../../context/ApplicationContext';
import { 
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Briefcase,
  TrendingUp,
  FileText,
  ExternalLink,
  Edit2,
  Save,
  X,
  MessageSquare,
  Send,
  RefreshCcw,
  Edit3
} from 'lucide-react';

interface ApplicationDetailsProps {
  application: any;
  onBack: () => void;
}

export function ApplicationDetails({ application, onBack }: ApplicationDetailsProps) {
  const { updateApplicationStatus, updateApplicationDetails, fetchComments, addComment } = useApplications();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(application);
  const [comments, setComments] = useState<ApplicationComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  // Load comments on mount
  useEffect(() => {
    loadComments();
  }, [application.id]);

  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const data = await fetchComments(application.id, application.type);
      setComments(data);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      await addComment(application.id, application.type, newComment);
      setNewComment('');
      loadComments(); // Reload comments
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', { 
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCommentIcon = (type: string) => {
    switch (type) {
      case 'status_change':
        return <RefreshCcw className="w-4 h-4 text-blue-600" />;
      case 'edit':
        return <Edit3 className="w-4 h-4 text-amber-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-slate-600" />;
    }
  };

  const getTypeIcon = () => {
    switch (application.type) {
      case 'financial':
        return <DollarSign className="w-8 h-8 text-blue-600" />;
      case 'work':
        return <Briefcase className="w-8 h-8 text-green-600" />;
      case 'venture':
        return <TrendingUp className="w-8 h-8 text-purple-600" />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (application.type) {
      case 'financial':
        return 'bg-blue-50 border-blue-200';
      case 'work':
        return 'bg-green-50 border-green-200';
      case 'venture':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'placed':
      case 'incubating':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
      case 'reviewing':
      case 'matched':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleSave = async () => {
    try {
      await updateApplicationDetails(application.id, application.type, editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateApplicationStatus(application.id, application.type, newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${getTypeColor()} border`}>
                  {getTypeIcon()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {application.name || application.founderName}
                  </h1>
                  <p className="text-sm text-slate-500 capitalize">
                    {application.type} Application • ID #{application.id.slice(0, 8)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setEditForm(application);
                      setIsEditing(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900">{application.email || 'N/A'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900">{application.phone || 'N/A'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Submission Date
                  </label>
                  <p className="text-slate-900">{formatDate(application.date)}</p>
                </div>
              </div>
            </div>

            {/* Type-Specific Details - Financial */}
            {application.type === 'financial' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Financial Support Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Support Type</label>
                    {isEditing ? (
                      <select
                        value={editForm.supportType || ''}
                        onChange={(e) => setEditForm({ ...editForm, supportType: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Loan">Loan</option>
                        <option value="Grant">Grant</option>
                        <option value="Emergency Aid">Emergency Aid</option>
                      </select>
                    ) : (
                      <p className="text-slate-900">{application.supportType}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Requested Amount</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.amount || ''}
                        onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900 font-semibold text-lg">{application.amount || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Family Size</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.familySize || ''}
                        onChange={(e) => setEditForm({ ...editForm, familySize: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900">{application.familySize}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Monthly Income</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.monthlyIncome || ''}
                        onChange={(e) => setEditForm({ ...editForm, monthlyIncome: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900">{application.monthlyIncome || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Urgency Level</label>
                    {isEditing ? (
                      <select
                        value={editForm.urgency || 'low'}
                        onChange={(e) => setEditForm({ ...editForm, urgency: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        application.urgency === 'high' ? 'bg-red-100 text-red-700' :
                        application.urgency === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {(application.urgency || 'low').toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-600 mb-1">Situation Description</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.situation || ''}
                      onChange={(e) => setEditForm({ ...editForm, situation: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                      {application.situation || 'No description provided.'}
                    </p>
                  )}
                </div>
                {application.documentUrl && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-600 mb-2">Supporting Documents</label>
                    <a
                      href={application.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      View Document
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Type-Specific Details - Work */}
            {application.type === 'work' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Work Pathways Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Work Type</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.workType || ''}
                        onChange={(e) => setEditForm({ ...editForm, workType: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900">{application.workType}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Experience Level</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.experience || ''}
                        onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900">{application.experience}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Availability</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.availability || ''}
                        onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900">{application.availability}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Education</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.education || ''}
                        onChange={(e) => setEditForm({ ...editForm, education: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900">{application.education || 'N/A'}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-600 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {application.skills?.map((skill: string) => (
                      <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-600 mb-1">Career Goals</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.goals || ''}
                      onChange={(e) => setEditForm({ ...editForm, goals: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                      {application.goals || 'No goals provided.'}
                    </p>
                  )}
                </div>
                {application.cvUrl && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-600 mb-2">Curriculum Vitae</label>
                    <a
                      href={application.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      View CV
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Type-Specific Details - Venture */}
            {application.type === 'venture' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Venture Support Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Venture Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.ventureName || ''}
                        onChange={(e) => setEditForm({ ...editForm, ventureName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900 font-semibold">{application.ventureName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Development Stage</label>
                    {isEditing ? (
                      <select
                        value={editForm.stage || ''}
                        onChange={(e) => setEditForm({ ...editForm, stage: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Idea">Idea</option>
                        <option value="MVP">MVP</option>
                        <option value="Growth">Growth</option>
                      </select>
                    ) : (
                      <p className="text-slate-900">{application.stage}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Industry</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.industry || ''}
                        onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900">{application.industry || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Team Size</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.teamSize || ''}
                        onChange={(e) => setEditForm({ ...editForm, teamSize: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900">{application.teamSize || 'N/A'}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-600 mb-1">Problem Statement</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.problem || ''}
                      onChange={(e) => setEditForm({ ...editForm, problem: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                      {application.problem || 'No problem statement provided.'}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-600 mb-1">Solution</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.solution || ''}
                      onChange={(e) => setEditForm({ ...editForm, solution: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                      {application.solution || 'No solution provided.'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Status Management */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Application Status</h2>
              <div className="space-y-2">
                {['pending', 'reviewing', 'approved', 'rejected', 'matched', 'placed', 'incubating'].map((status) => {
                  const isValid =
                    (application.type === 'financial' && ['pending', 'reviewing', 'approved', 'rejected'].includes(status)) ||
                    (application.type === 'work' && ['pending', 'matched', 'placed'].includes(status)) ||
                    (application.type === 'venture' && ['pending', 'reviewing', 'incubating'].includes(status));

                  if (!isValid) return null;

                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(status)}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors border ${
                        application.status === status
                          ? getStatusColor(status)
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Info</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Application Type</p>
                  <p className="text-slate-900 font-medium capitalize">{application.type}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Current Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Application ID</p>
                  <p className="text-slate-900 font-mono text-xs">{application.id}</p>
                </div>
              </div>
            </div>

            {/* Activity & Comments */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Activity & Comments</h2>
                <button
                  onClick={loadComments}
                  className="p-1 hover:bg-slate-100 rounded transition-colors"
                  title="Refresh comments"
                >
                  <RefreshCcw className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {loadingComments ? (
                  <p className="text-sm text-slate-500 text-center py-4">Loading...</p>
                ) : comments.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">No activity yet</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          {getCommentIcon(comment.comment_type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          {comment.comment_type === 'status_change' && comment.previous_status && comment.new_status ? (
                            <div>
                              <p className="text-sm font-medium text-slate-900">Status changed</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 capitalize">
                                  {comment.previous_status}
                                </span>
                                <span className="text-xs text-slate-400">→</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 capitalize">
                                  {comment.new_status}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-slate-700">{comment.content}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-slate-500">{comment.created_by}</p>
                            <span className="text-xs text-slate-400">•</span>
                            <p className="text-xs text-slate-500">{formatCommentDate(comment.created_at)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment */}
              <div className="border-t border-slate-200 pt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  <Send className="w-4 h-4" />
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
