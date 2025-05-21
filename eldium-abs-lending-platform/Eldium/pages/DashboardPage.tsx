import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table, { TableColumn } from '../components/ui/Table';
import { Deal, ActivityItem, PortfolioSegment } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import {
  IconWallet, IconBriefcase, IconDocumentText, IconChartPie, IconNewDeal, IconEye, IconPencil,
  IconUpload, IconDocumentArrowUp, IconPlay, IconBellAlert, IconDonutChartPlaceholder, IconLineChartPlaceholder,
  IconActivityNewDeal, IconActivityAssessment, IconActivityCash, IconActivityAlert
} from '../constants';

interface KpiCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  iconBgColor: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend, trendDirection, icon, iconBgColor }) => {
  const trendColor = trendDirection === 'up' ? 'text-green-500' : trendDirection === 'down' ? 'text-red-500' : 'text-gray-500';
  const trendArrow = trendDirection === 'up' ? '↑' : trendDirection === 'down' ? '↓' : '';

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className={`p-2.5 rounded-lg mr-4 ${iconBgColor}`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trendColor}`}>
              {trendArrow} {trend}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

const mockDashboardDeals: Deal[] = [
  { id: 'ABS-2023-028', name: 'Auto Loan ABS Tranche A', originator: 'Macquarie Bank', assetType: 'Equipment Leases', amount: 42500000, currency: 'AUD', status: 'Approved', submittedDate: '2023-11-20', riskScore: 7.5 },
  { id: 'ABS-2023-027', name: 'Consumer Credit Card ABS', originator: 'ANZ', assetType: 'Auto Loans', amount: 38200000, currency: 'AUD', status: 'Under Review', submittedDate: '2023-11-15', riskScore: 6.5 },
  { id: 'ABS-2023-026', name: 'Small Business Loan Sec.', originator: 'CBA', assetType: 'Credit Cards', amount: 29700000, currency: 'AUD', status: 'Rejected', submittedDate: '2023-11-10', riskScore: 4.0 },
  // FIX: Changed status from 'Funding' to 'Funded' to match Deal type
  { id: 'ABS-2023-025', name: 'Mortgage Backed Sec. B', originator: 'NAB', assetType: 'Mortgages', amount: 45800000, currency: 'AUD', status: 'Funded', submittedDate: '2023-11-05', riskScore: 8.0 },
];

const getStatusBadge = (status: Deal['status']) => {
  switch (status) {
    case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200';
    case 'Under Review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200';
    case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-200';
    // FIX: Changed case from 'Funding' to 'Funded' to match Deal type
    case 'Funded': return 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-200';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300';
  }
};

const getRiskScoreColor = (score?: number) => {
  if (score === undefined) return 'bg-gray-300';
  if (score >= 7.5) return 'bg-green-500';
  if (score >= 5) return 'bg-yellow-500';
  return 'bg-red-500';
};

const RecentActivityItem: React.FC<{ activity: ActivityItem }> = ({ activity }) => (
    <li className="flex items-start space-x-3 py-2">
        <div className={`p-1.5 rounded-full text-white ${activity.iconBgColor || 'bg-primary'}`}>
            {activity.icon || <IconActivityNewDeal className="w-4 h-4" />}
        </div>
        <div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200">{activity.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.description}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{activity.time}</p>
        </div>
    </li>
);

const mockRecentActivity: ActivityItem[] = [
    { id: '1', type: 'new_deal', title: 'New deal signed', description: '$32.5M auto loan ABS from Westpac', time: '2 hours ago', icon: <IconActivityNewDeal className="w-4 h-4"/>, iconBgColor: 'bg-blue-500' },
    { id: '2', type: 'assessment_complete', title: 'Credit assessment completed', description: 'Deal #ABS-2023-024 scored 7.8/10', time: 'Yesterday', icon: <IconActivityAssessment className="w-4 h-4"/>, iconBgColor: 'bg-green-500' },
    { id: '3', type: 'cash_reconciliation', title: 'Cash reconciliation', description: 'Monthly payment processed for 18 deals', time: '2 days ago', icon: <IconActivityCash className="w-4 h-4"/>, iconBgColor: 'bg-purple-500' },
    { id: '4', type: 'covenant_alert', title: 'Covenant alert', description: 'Deal #ABS-2023-011 approaching DSCR limit', time: '3 days ago', icon: <IconActivityAlert className="w-4 h-4"/>, iconBgColor: 'bg-yellow-500' },
];

const mockPortfolioComposition: PortfolioSegment[] = [
    { name: 'Auto Loans', value: 40, color: '#4A90E2' }, // Blue
    { name: 'Mortgages', value: 30, color: '#50E3C2' }, // Green
    { name: 'Equipment Leases', value: 15, color: '#F5A623' }, // Orange
    { name: 'Credit Cards', value: 10, color: '#BD10E0' }, // Purple
    { name: 'Other', value: 5, color: '#D0021B' }, // Red
];


const DashboardPage: React.FC = () => {
  const { primaryColor } = useTheme();
  const [activePortfolioTimeRange, setActivePortfolioTimeRange] = useState('1M');
  const [activePerformanceTab, setActivePerformanceTab] = useState('Performance');

  const dealColumns: TableColumn<Deal>[] = [
    { header: 'DEAL ID', accessor: 'id', className: 'text-xs text-primary hover:underline cursor-pointer', headerClassName: 'text-xs' },
    { header: 'ORIGINATOR', accessor: 'originator', className: 'text-xs', headerClassName: 'text-xs' },
    { header: 'ASSET TYPE', accessor: 'assetType', className: 'text-xs', headerClassName: 'text-xs' },
    { 
      header: 'AMOUNT', 
      accessor: (item) => `${item.currency} ${(item.amount / 1000000).toFixed(1)}M`,
      className: 'text-xs font-medium',
      headerClassName: 'text-xs'
    },
    {
      header: 'RISK SCORE',
      accessor: 'riskScore',
      className: 'text-xs',
      headerClassName: 'text-xs',
      render: (item) => (
        <div className="flex items-center">
          <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
            <div 
              className={`h-1.5 rounded-full ${getRiskScoreColor(item.riskScore)}`}
              style={{ width: `${(item.riskScore || 0) * 10}%`}}
            ></div>
          </div>
          <span>{item.riskScore?.toFixed(1) || 'N/A'}</span>
        </div>
      )
    },
    {
      header: 'STATUS',
      accessor: 'status',
      className: 'text-xs',
      headerClassName: 'text-xs',
      render: (item) => (
        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(item.status)}`}>
          {item.status}
        </span>
      )
    },
    {
      header: 'ACTIONS',
      accessor: 'id',
      className: 'text-xs',
      headerClassName: 'text-xs text-right',
      render: () => (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm" className="p-1 text-gray-500 hover:text-primary">
            <IconEye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 text-gray-500 hover:text-primary">
            <IconPencil className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard title="Total Portfolio Value" value="$128.5M" trend="12.5% from last month" trendDirection="up" icon={<IconWallet className="w-5 h-5 text-white"/>} iconBgColor="bg-blue-500" />
        <KpiCard title="Active Deals" value="24" trend="3 new this week" trendDirection="up" icon={<IconBriefcase className="w-5 h-5 text-white"/>} iconBgColor="bg-green-500" />
        <KpiCard title="Avg. Deal Size" value="$28.4M" trend="2.3% from last quarter" trendDirection="down" icon={<IconDocumentText className="w-5 h-5 text-white"/>} iconBgColor="bg-yellow-500" />
        <KpiCard title="Risk Score" value="7.2/10" trend="Improved by 0.8 points" trendDirection="up" icon={<IconChartPie className="w-5 h-5 text-white"/>} iconBgColor="bg-red-500" />
      </div>

      {/* Portfolio Composition & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Portfolio Composition" className="lg:col-span-2"
          actions={
            <div className="flex space-x-1">
              {['1M', '3M', '6M', '1Y'].map(range => (
                <Button 
                  key={range} 
                  size="sm" 
                  variant={activePortfolioTimeRange === range ? 'primary' : 'ghost'}
                  onClick={() => setActivePortfolioTimeRange(range)}
                  className={`px-2 py-0.5 text-xs ${activePortfolioTimeRange !== range ? 'text-gray-500' : ''}`}
                >
                  {range}
                </Button>
              ))}
            </div>
          }
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-2">
            <IconDonutChartPlaceholder className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0" />
            <div className="w-full md:w-auto">
              <ul className="space-y-1.5 mt-2 text-xs">
                {mockPortfolioComposition.map(segment => (
                  <li key={segment.name} className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: segment.color }}></span>
                    <span className="text-gray-600 dark:text-gray-300">{segment.name}</span>
                    <span className="ml-auto font-medium text-gray-700 dark:text-gray-200">{segment.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
        <Card title="Recent Activity">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto pr-1">
            {mockRecentActivity.map(activity => <RecentActivityItem key={activity.id} activity={activity} />)}
          </ul>
        </Card>
      </div>
      
      {/* Deal Pipeline */}
      <Card title="Deal Pipeline"
        actions={
          <Button variant="primary" size="sm" onClick={() => alert('New Deal Form')} leftIcon={<IconNewDeal className="w-4 h-4" />}>
            New Deal
          </Button>
        }
      >
        <Table<Deal>
          columns={dealColumns}
          data={mockDashboardDeals}
          keyExtractor={(deal) => deal.id}
          onRowClick={(deal) => alert(`View Deal: ${deal.id}`)}
        />
      </Card>

      {/* Quick Actions & Portfolio Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Quick Actions" className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Import Data', icon: <IconUpload className="w-5 h-5"/>, color: 'bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-200' },
              { label: 'Generate Report', icon: <IconDocumentArrowUp className="w-5 h-5"/>, color: 'bg-purple-100 text-purple-600 dark:bg-purple-700 dark:text-purple-200' },
              { label: 'Run Analysis', icon: <IconPlay className="w-5 h-5"/>, color: 'bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-200' },
              { label: 'Set Alerts', icon: <IconBellAlert className="w-5 h-5"/>, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-700 dark:text-yellow-200' },
            ].map(action => (
              <button key={action.label} className={`p-3 rounded-lg flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow ${action.color.split(' ')[0]} ${action.color.split(' ')[1]}`}>
                <div className={`p-2 rounded-full mb-1.5 ${action.color}`}>
                  {action.icon}
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card title="Portfolio Performance" className="lg:col-span-2">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-2">
            {['Performance', 'Risk Metrics', 'Cash Flow'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActivePerformanceTab(tab)}
                className={`px-3 py-2 text-sm font-medium focus:outline-none
                  ${activePerformanceTab === tab 
                    ? 'border-b-2 border-primary text-primary dark:text-primary-light' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            <IconLineChartPlaceholder className="w-full h-56 md:h-64"/>
             <div className="flex justify-center space-x-4 mt-2 text-xs">
                <div className="flex items-center"><span className="w-3 h-3 bg-primary mr-1.5"></span>Yield</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-green-500 mr-1.5"></span>Benchmark</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;