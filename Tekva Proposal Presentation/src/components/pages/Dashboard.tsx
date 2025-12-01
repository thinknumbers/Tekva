import { useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowRight,
  Search,
  Filter,
  MoreVertical,
  Download,
  FileText,
  ExternalLink
} from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';

export function Dashboard() {
  const { financialApplications, workApplications, ventureApplications, loading } = useApplications();
  const [activeTab, setActiveTab] = useState<'all' | 'financial' | 'work' | 'venture'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <DollarSign className="w-5 h-5 text-blue-600" />;
      case 'work':
        return <Briefcase className="w-5 h-5 text-green-600" />;
      case 'venture':
        return <TrendingUp className="w-5 h-5 text-purple-600" />;
      default:
        return <Users className="w-5 h-5 text-slate-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const allApplications = [
    ...financialApplications.map(app => ({ ...app, type: 'financial' as const })),
    ...workApplications.map(app => ({ ...app, type: 'work' as const })),
    ...ventureApplications.map(app => ({ ...app, type: 'venture' as const })),
  ].sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());

  const filteredApplications = allApplications.filter(app => {
    const matchesTab = activeTab === 'all' || app.type === activeTab;
    const matchesSearch = 
      (app as any).name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app as any).founderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app as any).email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Tekva Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-600">System Active</span>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                +12% <TrendingUp className="w-3 h-3" />
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Total Applications</h3>
            <p className="text-3xl font-bold text-slate-900">{allApplications.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                +5% <TrendingUp className="w-3 h-3" />
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Financial Support</h3>
            <p className="text-3xl font-bold text-slate-900">{financialApplications.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                +8% <TrendingUp className="w-3 h-3" />
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Work Pathways</h3>
            <p className="text-3xl font-bold text-slate-900">{workApplications.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                +15% <TrendingUp className="w-3 h-3" />
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Venture Support</h3>
            <p className="text-3xl font-bold text-slate-900">{ventureApplications.length}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg w-full md:w-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'financial'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Financial
              </button>
              <button
                onClick={() => setActiveTab('work')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'work'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Work
              </button>
              <button
                onClick={() => setActiveTab('venture')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'venture'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Venture
              </button>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredApplications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium">
                          {(app.name || app.founderName || '?').charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{app.name || app.founderName}</p>
                          <p className="text-sm text-slate-500">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(app.type)}
                        <span className="text-slate-700 capitalize">{app.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(app.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">
                        {app.type === 'financial' && (
                          <>
                            <p>Amount: {app.amount || 'N/A'}</p>
                            <p>Type: {app.support_type}</p>
                            {app.document_url && (
                              <a 
                                href={app.document_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1 mt-1"
                              >
                                <FileText className="w-3 h-3" /> View Document
                              </a>
                            )}
                          </>
                        )}
                        {app.type === 'work' && (
                          <>
                            <p>Role: {app.workType}</p>
                            <p>Exp: {app.experience}</p>
                            {app.cvUrl && (
                              <a 
                                href={app.cvUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1 mt-1"
                              >
                                <FileText className="w-3 h-3" /> View CV
                              </a>
                            )}
                          </>
                        )}
                        {app.type === 'venture' && (
                          <>
                            <p>Venture: {app.ventureName}</p>
                            <p>Stage: {app.stage}</p>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredApplications.length}</span> of <span className="font-medium">{filteredApplications.length}</span> results
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
