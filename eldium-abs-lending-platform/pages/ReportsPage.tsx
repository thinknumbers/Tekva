
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { IconReports, IconDownload, IconCalendarDays, IconFilter, IconLineChartPlaceholder } from '../constants';
import { useTheme } from '../contexts/ThemeContext';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  lastGenerated?: string;
  icon: React.ReactNode;
}

const mockReportTemplates: ReportTemplate[] = [
  { id: 'portfolio_perf', name: 'Portfolio Performance Summary', description: 'Key metrics on overall portfolio health, yield, and growth.', category: 'Portfolio', lastGenerated: '2023-12-01', icon: <IconReports className="w-6 h-6 text-blue-600 dark:text-blue-400"/> },
  { id: 'risk_exposure', name: 'Risk Exposure Analysis', description: 'Detailed breakdown of risk concentrations by asset type, originator, and geography.', category: 'Risk', icon: <IconReports className="w-6 h-6 text-red-600 dark:text-red-400"/> },
  { id: 'facility_util', name: 'Facility Utilization Report', description: 'Tracks utilization levels, available capacity, and covenant status across facilities.', category: 'Facilities', lastGenerated: '2023-11-28', icon: <IconReports className="w-6 h-6 text-green-600 dark:text-green-400"/> },
  { id: 'cashflow_proj', name: 'Cash Flow Projections', description: 'Forecasted cash inflows and outflows based on current deal structures.', category: 'Financial', icon: <IconReports className="w-6 h-6 text-purple-600 dark:text-purple-400"/> },
  { id: 'compliance_audit', name: 'Compliance & Audit Log', description: 'Summary of compliance checks, policy adherence, and system audit trails.', category: 'Compliance', lastGenerated: 'Monthly Auto-Generated', icon: <IconReports className="w-6 h-6 text-yellow-600 dark:text-yellow-400"/> },
  { id: 'deal_pipeline', name: 'Deal Pipeline Activity', description: 'Tracks deals through various stages from origination to funding.', category: 'Deals', icon: <IconReports className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/> },
];

const ReportsPage: React.FC = () => {
  const { primaryColor } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState({ dateRange: 'last_30_days', category: 'all' });

  const handleGenerateReport = (reportId: string) => {
    alert(`Generating report: ${reportId}. This would typically trigger a backend process and provide a download link or display the report.`);
  };
  
  const handleScheduleReport = (reportId: string) => {
    alert(`Scheduling report: ${reportId}. This would open a scheduling configuration modal.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Reporting & Analytics</h1>
        <Button variant="outline" leftIcon={<IconFilter className="w-4 h-4" />}>
          Filter Reports
        </Button>
      </div>

      <Card title="Available Report Templates" titleSize="lg">
        <div className="p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockReportTemplates.map(report => (
            <Card key={report.id} className="flex flex-col shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start p-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full mr-3">
                    {report.icon}
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white">{report.name}</h3>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary-light/20 text-primary dark:bg-primary-dark/30 dark:text-primary-light font-medium">{report.category}</span>
                </div>
              </div>
              <p className="px-4 text-xs text-gray-500 dark:text-gray-400 flex-grow">{report.description}</p>
              {report.lastGenerated && <p className="px-4 pt-2 text-xs text-gray-400 dark:text-gray-500">Last generated: {report.lastGenerated}</p>}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 mt-3 flex space-x-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => handleScheduleReport(report.id)} leftIcon={<IconCalendarDays className="w-3.5 h-3.5"/>} className="text-xs">
                  Schedule
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleGenerateReport(report.id)} leftIcon={<IconDownload className="w-3.5 h-3.5"/>} className="text-xs">
                  Generate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

       <Card title="Custom Report Builder (Placeholder)">
        <div className="p-4 text-center">
          <IconReports className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            A future enhancement will allow users to build custom reports by selecting data points, filters, and visualization types.
          </p>
          <Button variant="primary" disabled>Launch Report Builder (Coming Soon)</Button>
        </div>
      </Card>
      
      <Card title="Scheduled Reports Overview (Placeholder)">
        <div className="p-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
                This section would list all currently scheduled reports, their frequency, next run time, and distribution lists.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400"><i>Mocked list of scheduled reports would appear here.</i></p>
            {/* Example of a single item:
            <div className="p-2 border rounded mt-2">
                <p className="font-semibold">Monthly Portfolio Performance</p>
                <p className="text-xs">Runs: 1st of every month | Next Run: Jan 1, 2024 | Recipients: management@eludium.com</p>
            </div>
            */}
        </div>
      </Card>

      <Card title="Key Analytics Snapshot (Placeholder)">
        <IconLineChartPlaceholder className="w-full h-64 md:h-72 p-2"/>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 pb-2">A quick visual overview of critical portfolio trends.</p>
      </Card>
    </div>
  );
};

export default ReportsPage;
