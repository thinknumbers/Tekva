
import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Table, { TableColumn } from '../components/ui/Table';
import Button from '../components/ui/Button';
import { IconUsers, IconPlusCircle, IconPencil, IconEye } from '../constants';
import { UserProfile } from '../types'; // Assuming UserProfile is suitable
import { useTheme } from '../contexts/ThemeContext';

interface AppUser extends UserProfile {
  id: string;
  email: string;
  lastLogin: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

const mockUsers: AppUser[] = [
  { id: 'usr_001', name: 'Alice Wonderland', email: 'alice@eludium.com', role: 'Administrator', lastLogin: '2023-12-10 10:00 UTC', status: 'Active', avatarUrl: 'https://picsum.photos/seed/alice/40/40' },
  { id: 'usr_002', name: 'Bob The Builder', email: 'bob@eludium.com', role: 'Originator Lead', lastLogin: '2023-12-09 15:30 UTC', status: 'Active', avatarUrl: 'https://picsum.photos/seed/bob/40/40' },
  { id: 'usr_003', name: 'Charlie Brown', email: 'charlie@eludium.com', role: 'Funder Analyst', lastLogin: '2023-11-20 09:00 UTC', status: 'Inactive', avatarUrl: 'https://picsum.photos/seed/charlie/40/40' },
  { id: 'usr_004', name: 'Diana Prince', email: 'diana@eludium.com', role: 'Compliance Officer', lastLogin: '2023-12-10 11:00 UTC', status: 'Active', avatarUrl: 'https://picsum.photos/seed/diana/40/40' },
  { id: 'usr_005', name: 'Edward Scissorhands', email: 'edward@eludium.com', role: 'Read-Only Viewer', lastLogin: 'Never', status: 'Pending', avatarUrl: 'https://picsum.photos/seed/edward/40/40' },
];

const mockRoles = [
    { id: 'admin', name: 'Administrator', description: 'Full access to all platform features and settings.'},
    { id: 'funder_lead', name: 'Funder Lead', description: 'Manages facilities, approves deals, views reports.'},
    { id: 'funder_analyst', name: 'Funder Analyst', description: 'Reviews deals, performs analysis, generates reports.'},
    { id: 'originator_lead', name: 'Originator Lead', description: 'Submits deals, manages originator-specific data.'},
    { id: 'compliance_officer', name: 'Compliance Officer', description: 'Access to audit logs, compliance reports, and relevant settings.'},
    { id: 'viewer', name: 'Read-Only Viewer', description: 'Can view dashboards and reports but cannot make changes.'},
];

const getStatusBadgeClass = (status: AppUser['status']) => {
    switch (status) {
        case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200';
        case 'Inactive': return 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300';
        case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200';
        default: return '';
    }
};

const UsersPage: React.FC = () => {
  const { primaryColor } = useTheme();
  const [users, setUsers] = useState<AppUser[]>(mockUsers);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);

  const columns: TableColumn<AppUser>[] = useMemo(() => [
    { 
        header: 'Name', 
        accessor: 'name',
        render: (item) => (
            <div className="flex items-center">
                <img src={item.avatarUrl || `https://ui-avatars.com/api/?name=${item.name.replace(' ','+')}&background=random`} alt={item.name} className="w-8 h-8 rounded-full mr-3 object-cover"/>
                <div>
                    <div className="font-medium text-gray-800 dark:text-white">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.email}</div>
                </div>
            </div>
        )
    },
    { header: 'Role', accessor: 'role' },
    { header: 'Last Login', accessor: 'lastLogin' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (item: AppUser) => (
        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(item.status)}`}>
          {item.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (item: AppUser) => (
        <div className="space-x-1">
          <Button variant="ghost" size="sm" onClick={() => {setSelectedUser(item); alert(`View/Edit user: ${item.name}`) }} className="p-1">
            <IconPencil className="w-4 h-4" />
          </Button>
           <Button variant="ghost" size="sm" onClick={() => alert(`More actions for ${item.name}`)} className="p-1">
            <IconEye className="w-4 h-4" /> {/* Placeholder for more actions */}
          </Button>
        </div>
      )
    }
  ], []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Management</h1>
        <Button variant="primary" leftIcon={<IconPlusCircle className="w-5 h-5" />} onClick={() => alert('Open "Add New User" form')}>
          Add New User
        </Button>
      </div>

      <Card title="Platform Users">
        <Table<AppUser>
          columns={columns}
          data={users}
          keyExtractor={(user) => user.id}
          onRowClick={(user) => {setSelectedUser(user); alert(`Viewing details for ${user.name}`)}}
        />
      </Card>

      <Card title="Role-Based Access Control (RBAC)" titleSize="lg">
        <div className="p-4">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                Manage user roles and their associated permissions to ensure proper data access and operational security. 
                Eldium supports granular permission settings aligned with organizational structure and compliance needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockRoles.map(role => (
                    <div key={role.id} className="p-3 border dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700/50">
                        <h4 className="font-semibold text-sm" style={{color: primaryColor}}>{role.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{role.description}</p>
                        <Button variant="outline" size="sm" className="mt-2 text-xs !px-2 !py-0.5" onClick={() => alert(`Configure permissions for ${role.name}`)}>
                            Configure Permissions
                        </Button>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                 <Button variant="primary" size="sm" onClick={() => alert('Open "Add New Role" dialog')}>Add New Role</Button>
            </div>
        </div>
      </Card>
      
      <Card title="Security & Audit (Placeholder)">
        <div className="p-4 text-gray-600 dark:text-gray-300">
          This section would provide access to user activity logs, settings for Multi-Factor Authentication (MFA), Single Sign-On (SSO) configurations, and password policies.
        </div>
      </Card>
    </div>
  );
};

export default UsersPage;
