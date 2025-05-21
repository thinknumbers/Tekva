
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Table, { TableColumn } from '../components/ui/Table';
import Button from '../components/ui/Button';
import { IconLineChartPlaceholder, IconDonutChartPlaceholder, IconFilter, IconBriefcase, IconWallet, IconChartPie } from '../constants'; // Reusing dashboard icons
import { Deal } from '../types'; // Assuming Deal type is relevant here
import { useTheme } from '../contexts/ThemeContext';


interface PortfolioMetric {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  bgColorClass: string;
}

const mockPortfolioMetrics: PortfolioMetric[] = [
  { id: 'totalAssets', label: 'Total Assets Under Management', value: '$450.2M', icon: <IconWallet className="w-6 h-6 text-white" />, bgColorClass: 'bg-blue-500' },
  { id: 'numFacilities', label: 'Active Facilities', value: '12', icon: <IconBriefcase className="w-6 h-6 text-white" />, bgColorClass: 'bg-green-500' },
  { id: 'avgRisk', label: 'Weighted Avg. Risk Score', value: '6.8/10', icon: <IconChartPie className="w-6 h-6 text-white" />, bgColorClass: 'bg-red-500' },
  { id: 'avgYield', label: 'Average Portfolio Yield', value: '5.2%', icon: <IconChartPie className="w-6 h-6 text-white" />, bgColorClass: 'bg-yellow-500' }
];

const mockAssetBreakdown = [
    { name: 'Auto Loans', value: 35, color: '#4A90E2' },
    { name: 'Residential Mortgages', value: 25, color: '#50E3C2' },
    { name: 'Equipment Leases', value: 20, color: '#F5A623' },
    { name: 'SME Loans', value: 15, color: '#BD10E0' },
    { name: 'Other Structured Products', value: 5, color: '#D0021B' },
];

const mockPerformingDeals: Deal[] = [
  { id: 'DP001', name: 'Premier Auto Loan Pool A', originator: 'Global Finance', amount: 25000000, currency: 'USD', status: 'Funded', submittedDate: '2023-01-10', riskScore: 8.1, assetType: 'Auto Loans' },
  { id: 'DP002', name: 'Secure SME Tranche 1', originator: 'Business Lenders Inc.', amount: 15000000, currency: 'USD', status: 'Funded', submittedDate: '2023-02-15', riskScore: 7.8, assetType: 'SME Loans' },
];

const mockUnderReviewDeals: Deal[] = [
  { id: 'DU001', name: 'NextGen Equipment Lease', originator: 'TechLease Co.', amount: 12000000, currency: 'USD', status: 'Under Review', submittedDate: '2023-11-05', riskScore: 6.5, assetType: 'Equipment Leases' },
  { id: 'DU002', name: 'Urban Residential Fund II', originator: 'City Mortgages', amount: 30000000, currency: 'USD', status: 'Pending', submittedDate: '2023-10-20', riskScore: 7.0, assetType: 'Residential Mortgages' },
];


const PortfolioPage: React.FC = () => {
  const { primaryColor } = useTheme();
  const [filter, setFilter] = useState<string>('all');

  const dealColumns: TableColumn<Deal>[] = [
    { header: 'Deal Name', accessor: 'name', className: 'font-medium text-gray-900 dark:text-white' },
    { header: 'Asset Type', accessor: 'assetType' },
    { header: 'Amount', accessor: (item) => `${item.currency} ${(item.amount / 1000000).toFixed(1)}M` },
    { header: 'Risk Score', accessor: 'riskScore', render: (item) => item.riskScore?.toFixed(1) || 'N/A' },
    { header: 'Status', accessor: 'status', render: (item) => <span className={`px-2 py-0.5 text-xs rounded-full ${item.status === 'Funded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span> },
  ];


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Portfolio Overview</h1>
        <Button variant="outline" leftIcon={<IconFilter className="w-4 h-4" />}>
          Filters
        </Button>
      </div>

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockPortfolioMetrics.map(metric => (
          <Card key={metric.id} className="shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${metric.bgColorClass}`}>
                    {metric.icon}
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-tight">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{metric.value}</p>
                </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Asset Breakdown and Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Asset Type Breakdown" className="lg:col-span-1">
            <div className="flex flex-col items-center py-2">
                <IconDonutChartPlaceholder className="w-36 h-36 md:w-40 md:h-40 flex-shrink-0" />
                 <ul className="space-y-1.5 mt-4 text-xs w-full max-w-xs">
                    {mockAssetBreakdown.map(segment => (
                    <li key={segment.name} className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: segment.color }}></span>
                        <span className="text-gray-600 dark:text-gray-300">{segment.name}</span>
                        <span className="ml-auto font-medium text-gray-700 dark:text-gray-200">{segment.value}%</span>
                    </li>
                    ))}
                </ul>
            </div>
        </Card>
        <Card title="Portfolio Value Over Time" className="lg:col-span-2">
          <IconLineChartPlaceholder className="w-full h-64 md:h-72"/>
          <div className="flex justify-center space-x-4 mt-2 text-xs">
            <div className="flex items-center"><span className="w-3 h-3 mr-1.5" style={{backgroundColor: primaryColor}}></span>Portfolio Value</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-gray-400 mr-1.5"></span>Benchmark Index</div>
          </div>
        </Card>
      </div>
      
      {/* Key Performing Assets */}
      <Card title="Key Performing Deals">
        <Table<Deal>
          columns={dealColumns}
          data={mockPerformingDeals}
          keyExtractor={(deal) => deal.id}
          onRowClick={(deal) => alert(`Viewing Deal: ${deal.name}`)}
        />
      </Card>

      {/* Assets Under Review / Upcoming Maturities */}
      <Card title="Deals Under Review / Action Required">
        <Table<Deal>
          columns={dealColumns}
          data={mockUnderReviewDeals}
          keyExtractor={(deal) => deal.id}
          onRowClick={(deal) => alert(`Viewing Deal: ${deal.name}`)}
        />
        <div className="p-4 text-sm text-gray-600 dark:text-gray-300">
            This section would highlight deals requiring attention, upcoming covenant checks, or approaching maturity dates.
        </div>
      </Card>

    </div>
  );
};

export default PortfolioPage;
