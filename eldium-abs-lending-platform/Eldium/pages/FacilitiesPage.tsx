
import React, { useState, useMemo } from 'react';
import { Facility, Covenant } from '../types';
import Card from '../components/ui/Card';
// FIX: Import TableColumn for explicit typing
import Table, { TableColumn } from '../components/ui/Table';
import Button from '../components/ui/Button';
import { useTheme } from '../contexts/ThemeContext';

const mockFacilities: Facility[] = [
  { id: 'F001', name: 'Alpha Warehouse', type: 'Warehouse', limit: 100000000, utilized: 65000000, currency: 'USD', originator: 'FinCorp', status: 'Active', covenants: [{id: 'C001', name: 'Loan-to-Value Ratio', status: 'Compliant', description: 'LTV must be <= 80%', currentValue: '75%', thresholdValue: '80%'}]},
  { id: 'F002', name: 'Beta Term Loan', type: 'Term Loan', limit: 50000000, utilized: 50000000, currency: 'USD', originator: 'Asset Co', status: 'Active', covenants: [{id: 'C002', name: 'Debt Service Coverage', status: 'Warning', description: 'DSCR must be >= 1.2x', currentValue: '1.15x', thresholdValue: '1.2x'}]},
  { id: 'F003', name: 'Gamma Revolver', type: 'Revolving', limit: 75000000, utilized: 20000000, currency: 'USD', originator: 'LendPro', status: 'Pending Approval' },
  { id: 'F004', name: 'Delta Closed Fund', type: 'Term Loan', limit: 30000000, utilized: 30000000, currency: 'USD', originator: 'FinCorp', status: 'Closed' },
];

const getFacilityStatusColor = (status: Facility['status']) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200';
    case 'Pending Approval': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200';
    case 'Closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

const getCovenantStatusColor = (status: Covenant['status']) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200';
      case 'Warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200';
      case 'Breached': return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };


const FacilitiesPage: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>(mockFacilities);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const { primaryColor } = useTheme();

  // FIX: Explicitly type 'columns' with TableColumn<Facility>[]
  const columns: TableColumn<Facility>[] = useMemo(() => [
    { header: 'Facility Name', accessor: 'name', className: 'font-medium text-gray-900 dark:text-white' },
    { header: 'Type', accessor: 'type' },
    { header: 'Originator', accessor: 'originator' },
    { 
      header: 'Limit', 
      accessor: (item: Facility) => `${item.currency} ${item.limit.toLocaleString()}`,
    },
    { 
      header: 'Utilized', 
      accessor: (item: Facility) => `${item.currency} ${item.utilized.toLocaleString()}`,
    },
    {
      header: 'Utilization',
      accessor: (item: Facility) => `${((item.utilized / item.limit) * 100).toFixed(1)}%`,
      render: (item: Facility) => {
        const utilization = (item.utilized / item.limit) * 100;
        return (
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full" 
              style={{ width: `${utilization}%`, backgroundColor: primaryColor }}
            ></div>
          </div>
        )
      }
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (item: Facility) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getFacilityStatusColor(item.status)}`}>
          {item.status}
        </span>
      )
    },
    {
        header: 'Actions',
        accessor: (item: Facility) => item.id, // Accessor can return ReactNode; here it's used for render context
        render: (item: Facility) => (
            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setSelectedFacility(item); }}>
                View
            </Button>
        )
    }
  ], [primaryColor]);

  const handleRowClick = (facility: Facility) => {
    setSelectedFacility(facility);
  };

  const handleAddNewFacility = () => {
    alert("Functionality to add a new facility would be implemented here.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Facilities Overview</h1>
        <Button variant="primary" onClick={handleAddNewFacility}>
            Add New Facility
        </Button>
      </div>

      <Card>
        <Table<Facility>
          columns={columns}
          data={facilities}
          onRowClick={handleRowClick}
          keyExtractor={(facility) => facility.id}
        />
      </Card>

      {selectedFacility && (
        <Card title={`Facility Details: ${selectedFacility.name}`} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div><strong>ID:</strong> {selectedFacility.id}</div>
            <div><strong>Type:</strong> {selectedFacility.type}</div>
            <div><strong>Originator:</strong> {selectedFacility.originator}</div>
            <div><strong>Limit:</strong> {selectedFacility.currency} {selectedFacility.limit.toLocaleString()}</div>
            <div><strong>Utilized:</strong> {selectedFacility.currency} {selectedFacility.utilized.toLocaleString()}</div>
            <div><strong>Status:</strong> <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getFacilityStatusColor(selectedFacility.status)}`}>{selectedFacility.status}</span></div>
            <div className="md:col-span-2">
                <h4 className="font-semibold mt-3 mb-2" style={{color: primaryColor}}>Covenants:</h4>
                {selectedFacility.covenants && selectedFacility.covenants.length > 0 ? (
                    <ul className="space-y-2">
                    {selectedFacility.covenants.map(covenant => (
                        <li key={covenant.id} className="p-2 border dark:border-gray-600 rounded-md bg-secondary-light dark:bg-gray-700">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{covenant.name}</span>
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getCovenantStatusColor(covenant.status)}`}>{covenant.status}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{covenant.description}</p>
                            {covenant.currentValue && <p className="text-sm">Current: {covenant.currentValue} (Threshold: {covenant.thresholdValue})</p>}
                        </li>
                    ))}
                    </ul>
                ) : <p>No covenants defined for this facility.</p>}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <Button variant="secondary" onClick={() => setSelectedFacility(null)}>Close</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FacilitiesPage;