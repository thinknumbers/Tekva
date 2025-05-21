
import React, { useState, useMemo } from 'react';
import { Deal } from '../types';
import Card from '../components/ui/Card';
// FIX: Import TableColumn for explicit typing
import Table, { TableColumn } from '../components/ui/Table';
import Button from '../components/ui/Button';
import { useTheme } from '../contexts/ThemeContext';

const mockDeals: Deal[] = [
  { id: 'D001', name: 'Project Titan', originator: 'FinCorp', amount: 25000000, currency: 'USD', status: 'Funded', submittedDate: '2023-10-15', creditScore: 820, facilityId: 'F001' },
  { id: 'D002', name: 'Phoenix Initiative', originator: 'Asset Co', amount: 15000000, currency: 'USD', status: 'Approved', submittedDate: '2023-11-01', creditScore: 780, facilityId: 'F002' },
  { id: 'D003', name: 'Neptune Portfolio', originator: 'LendPro', amount: 45000000, currency: 'USD', status: 'Pending', submittedDate: '2023-11-20', facilityId: 'F003' },
  { id: 'D004', name: 'Orion Securitization', originator: 'FinCorp', amount: 30000000, currency: 'USD', status: 'Rejected', submittedDate: '2023-09-05', creditScore: 650 },
  { id: 'D005', name: 'Galaxy Funding', originator: 'Asset Co', amount: 10000000, currency: 'USD', status: 'Pending', submittedDate: '2023-12-01', facilityId: 'F001'},
];

const getStatusColor = (status: Deal['status']) => {
  switch (status) {
    case 'Funded': return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200';
    case 'Approved': return 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200';
    case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200';
    case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const { primaryColor } = useTheme();

  // FIX: Explicitly type 'columns' with TableColumn<Deal>[]
  const columns: TableColumn<Deal>[] = useMemo(() => [
    { header: 'Deal Name', accessor: 'name', className: 'font-medium text-gray-900 dark:text-white' },
    { header: 'Originator', accessor: 'originator' },
    { 
      header: 'Amount', 
      accessor: (item: Deal) => `${item.currency} ${item.amount.toLocaleString()}`,
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (item: Deal) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      )
    },
    { header: 'Submitted', accessor: 'submittedDate' },
    { 
      header: 'Credit Score', 
      accessor: (item: Deal) => item.creditScore ? String(item.creditScore) : 'N/A',
      className: 'text-center'
    },
    {
        header: 'Actions',
        accessor: (item: Deal) => item.id, // Accessor can return ReactNode; here it's used for render context
        render: (item: Deal) => (
            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setSelectedDeal(item); }}>
                View
            </Button>
        )
    }
  ], []);

  const handleRowClick = (deal: Deal) => {
    setSelectedDeal(deal);
  };
  
  // Placeholder for new deal modal/form
  const handleAddNewDeal = () => {
    alert("Functionality to add a new deal would be implemented here.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Deals Management</h1>
        <Button variant="primary" onClick={handleAddNewDeal}>
            Add New Deal
        </Button>
      </div>

      <Card>
        <Table<Deal>
          columns={columns}
          data={deals}
          onRowClick={handleRowClick}
          keyExtractor={(deal) => deal.id}
        />
      </Card>

      {selectedDeal && (
        <Card title={`Deal Details: ${selectedDeal.name}`} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div><strong>ID:</strong> {selectedDeal.id}</div>
            <div><strong>Originator:</strong> {selectedDeal.originator}</div>
            <div><strong>Amount:</strong> {selectedDeal.currency} {selectedDeal.amount.toLocaleString()}</div>
            <div><strong>Status:</strong> <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedDeal.status)}`}>{selectedDeal.status}</span></div>
            <div><strong>Submitted Date:</strong> {selectedDeal.submittedDate}</div>
            <div><strong>Facility ID:</strong> {selectedDeal.facilityId || 'N/A'}</div>
            <div className="md:col-span-2">
              <h4 className="font-semibold mt-2" style={{color: primaryColor}}>Proprietary Credit Assessment:</h4>
              {selectedDeal.creditScore ? (
                <p>Eldium Score: <span className="font-bold text-lg">{selectedDeal.creditScore}</span> / 1000</p>
              ) : (
                <p>Credit assessment pending or not applicable.</p>
              )}
              {/* Placeholder for more detailed credit assessment info */}
              <div className="mt-2 p-3 bg-secondary-light dark:bg-gray-700 rounded">
                <p className="text-sm">Detailed credit model output and risk factors would be displayed here. This leverages Eldium's IP.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <Button variant="secondary" onClick={() => setSelectedDeal(null)}>Close</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DealsPage;