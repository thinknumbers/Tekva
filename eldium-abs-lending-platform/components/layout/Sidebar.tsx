import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  APP_TITLE, 
  IconDashboard, 
  IconDeals, 
  IconPortfolio,
  IconCreditEngine,
  IconUsers,
  IconReports,
  IconSettings,
  IconHelpCenter,
  IconContactSupport,
  IconChevronLeft,
  MOCK_USER_PROFILE,
  IconUserCircle,
  IconThreeDots
} from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isCollapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-2.5 px-4 rounded-md transition-colors duration-150 ease-in-out group
         ${isActive ? 'bg-primary-dark text-white font-medium shadow-sm' : 'text-indigo-100 hover:bg-primary-dark hover:text-white'}
         ${isCollapsed ? 'justify-center' : ''}`
      }
      title={isCollapsed ? label : undefined}
    >
      {icon}
      {!isCollapsed && <span className="ml-3 text-sm">{label}</span>}
    </NavLink>
  );
};

interface NavSectionProps {
  title: string;
  isCollapsed: boolean;
}

const NavSection: React.FC<NavSectionProps> = ({ title, isCollapsed }) => {
  if (isCollapsed) return null;
  return (
    <h3 className="px-4 mt-4 mb-1 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
      {title}
    </h3>
  );
};


const Sidebar: React.FC = () => {
  const { primaryColor } = useTheme(); // primaryColor is for theme consistency if needed, but sidebar has fixed dark bg
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = MOCK_USER_PROFILE;

  return (
    <aside 
      className={`flex flex-col bg-primary text-white transition-all duration-300 ease-in-out border-r border-primary-dark shadow-lg`}
      style={{ width: isCollapsed ? '5rem' : '16rem' }} // 80px vs 256px
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-primary-dark">
        {!isCollapsed && (
          <span className="text-xl font-bold text-white">{APP_TITLE}</span>
        )}
        <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="p-1 rounded-md text-indigo-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <IconChevronLeft className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <NavSection title="Main Menu" isCollapsed={isCollapsed} />
        <NavItem to="/dashboard" icon={<IconDashboard className="w-5 h-5" />} label="Dashboard" isCollapsed={isCollapsed} />
        <NavItem to="/deals" icon={<IconDeals className="w-5 h-5" />} label="Deals" isCollapsed={isCollapsed} />
        <NavItem to="/portfolio" icon={<IconPortfolio className="w-5 h-5" />} label="Portfolio" isCollapsed={isCollapsed} />
        <NavItem to="/credit-engine" icon={<IconCreditEngine className="w-5 h-5" />} label="Credit Engine" isCollapsed={isCollapsed} />
        
        <NavSection title="Management" isCollapsed={isCollapsed} />
        <NavItem to="/users" icon={<IconUsers className="w-5 h-5" />} label="Users" isCollapsed={isCollapsed} />
        <NavItem to="/settings" icon={<IconSettings className="w-5 h-5" />} label="Settings" isCollapsed={isCollapsed} />
        <NavItem to="/reports" icon={<IconReports className="w-5 h-5" />} label="Reports" isCollapsed={isCollapsed} />

        <NavSection title="Support" isCollapsed={isCollapsed} />
        <NavItem to="/help-center" icon={<IconHelpCenter className="w-5 h-5" />} label="Help Center" isCollapsed={isCollapsed} />
        <NavItem to="/contact-support" icon={<IconContactSupport className="w-5 h-5" />} label="Contact Support" isCollapsed={isCollapsed} />
      </nav>

      <div className="p-3 border-t border-primary-dark">
        <div className="flex items-center">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-md" />
          ) : (
            <IconUserCircle className="w-9 h-9 text-indigo-200" />
          )}
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-indigo-200">{user.role}</p>
            </div>
          )}
          {!isCollapsed && (
            <button className="ml-auto p-1 text-indigo-200 hover:text-white">
              <IconThreeDots className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;