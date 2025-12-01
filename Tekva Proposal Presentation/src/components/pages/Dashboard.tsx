import { useState } from 'react';
import { 
  LayoutDashboard, 
  DollarSign, 
  Briefcase, 
  Rocket, 
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';

export function Dashboard() {
  const { financialApplications, workApplications, ventureApplications } = useApplications();
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'work' | 'venture'>('overview');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  const stats = [
    {
      icon: DollarSign,
      label: 'Financial Applications',
      value: financialApplications.length,
      change: '+12%',
      color: 'blue',
    },
    {
      icon: Briefcase,
      label: 'Work Pathways',
      value: workApplications.length,
      change: '+8%',
      color: 'green',
    },
    {
      icon: Rocket,
      label: 'Ventures',
      value: ventureApplications.length,
      change: '+15%',
      color: 'purple',
    },
    {
      icon: Users,
      label: 'Total Applicants',
      value: financialApplications.length + workApplications.length + ventureApplications.length,
      change: '+11%',
      color: 'slate',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'placed':
      case 'incubating':
        return 'bg-green-100 text-green-700';
      case 'reviewing':
      case 'matched':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'placed':
      case 'incubating':
        return <CheckCircle className="w-4 h-4" />;
      case 'reviewing':
      case 'matched':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl text-slate-900">Tekva Dashboard</h1>
          </div>
          <p className="text-lg text-slate-600">Monitor and manage all applications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 whitespace-nowrap transition-colors ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`px-6 py-4 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'financial'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                Financial Support
              </button>
              <button
                onClick={() => setActiveTab('work')}
                className={`px-6 py-4 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'work'
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Work Pathways
              </button>
              <button
                onClick={() => setActiveTab('venture')}
                className={`px-6 py-4 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'venture'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Rocket className="w-4 h-4" />
                Ventures
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl text-slate-900 mb-4">Recent Activity</h2>
                
                <div className="space-y-4">
                  {/* Recent Financial Applications */}
                  {financialApplications.slice(0, 2).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-slate-900">{app.name}</p>
                          <p className="text-sm text-slate-600">{app.supportType} • {app.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Recent Work Applications */}
                  {workApplications.slice(0, 2).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-600 text-white p-2 rounded-lg">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-slate-900">{app.name}</p>
                          <p className="text-sm text-slate-600">{app.experience} experience • {app.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                        <button className="text-green-600 hover:text-green-700">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Recent Venture Applications */}
                  {ventureApplications.slice(0, 2).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-600 text-white p-2 rounded-lg">
                          <Rocket className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-slate-900">{app.ventureName}</p>
                          <p className="text-sm text-slate-600">{app.founderName} • {app.stage} • {app.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                        <button className="text-purple-600 hover:text-purple-700">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Support Tab */}
            {activeTab === 'financial' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-slate-900">Financial Support Applications</h2>
                  <span className="text-sm text-slate-600">{financialApplications.length} total</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Applicant</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Support Type</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Family Size</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Amount</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialApplications.map((app) => (
                        <tr key={app.id} className="border-t border-slate-200 hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">{app.name}</td>
                          <td className="px-4 py-3 text-slate-700">{app.supportType}</td>
                          <td className="px-4 py-3 text-slate-700">{app.familySize}</td>
                          <td className="px-4 py-3 text-slate-700">{app.amount || '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit ${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)}
                              {app.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-700">{app.date}</td>
                          <td className="px-4 py-3">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Work Pathways Tab */}
            {activeTab === 'work' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-slate-900">Work Pathways Applications</h2>
                  <span className="text-sm text-slate-600">{workApplications.length} total</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Skills</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Experience</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workApplications.map((app) => (
                        <tr key={app.id} className="border-t border-slate-200 hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">{app.name}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {app.skills.slice(0, 2).map((skill) => (
                                <span key={skill} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                              {app.skills.length > 2 && (
                                <span className="text-xs text-slate-500">+{app.skills.length - 2}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-700">{app.experience}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit ${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)}
                              {app.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-700">{app.date}</td>
                          <td className="px-4 py-3">
                            <button className="text-green-600 hover:text-green-700 text-sm">
                              Match Jobs
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Ventures Tab */}
            {activeTab === 'venture' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-slate-900">Venture Applications</h2>
                  <span className="text-sm text-slate-600">{ventureApplications.length} total</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Venture Name</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Founder</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Stage</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventureApplications.map((app) => (
                        <tr key={app.id} className="border-t border-slate-200 hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">{app.ventureName}</td>
                          <td className="px-4 py-3 text-slate-700">{app.founderName}</td>
                          <td className="px-4 py-3">
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                              {app.stage}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit ${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)}
                              {app.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-700">{app.date}</td>
                          <td className="px-4 py-3">
                            <button className="text-purple-600 hover:text-purple-700 text-sm">
                              Assess
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
