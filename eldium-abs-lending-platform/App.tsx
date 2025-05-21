
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import DealsPage from './pages/DealsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import SettingsPage from './pages/SettingsPage';
import PortfolioPage from './pages/PortfolioPage'; // New
import CreditEnginePage from './pages/CreditEnginePage'; // New
import UsersPage from './pages/UsersPage'; // New
import ReportsPage from './pages/ReportsPage'; // New
import HelpCenterPage from './pages/HelpCenterPage'; // New
import ContactSupportPage from './pages/ContactSupportPage'; // New
import { useTheme } from './contexts/ThemeContext';

const PageTitleUpdater: React.FC<{ setPageTitle: (title: string) => void }> = ({ setPageTitle }) => {
  const location = useLocation();
  React.useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/dashboard')) setPageTitle('Dashboard');
    else if (path.includes('/deals')) setPageTitle('Deals Management');
    else if (path.includes('/portfolio')) setPageTitle('Portfolio Overview');
    else if (path.includes('/credit-engine')) setPageTitle('Credit Engine Console');
    else if (path.includes('/users')) setPageTitle('User Management');
    else if (path.includes('/reports')) setPageTitle('Reporting & Analytics');
    else if (path.includes('/facilities')) setPageTitle('Facilities Overview');
    else if (path.includes('/settings')) setPageTitle('Settings');
    else if (path.includes('/help-center')) setPageTitle('Help Center');
    else if (path.includes('/contact-support')) setPageTitle('Contact Support');
    else setPageTitle('Eldium ABS');
  }, [location, setPageTitle]);
  return null;
};

const App: React.FC = () => {
  const { themeName } = useTheme();
  const [pageTitle, setPageTitle] = useState('Dashboard');

  React.useEffect(() => {
    const htmlElement = document.documentElement;
    if (themeName === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    // Set body background color to match Tailwind config for page.DEFAULT
    document.body.className = themeName === 'dark' ? 'bg-page-dark' : 'bg-page-DEFAULT';

  }, [themeName]);


  return (
    <HashRouter>
      <PageTitleUpdater setPageTitle={setPageTitle} />
      <div className={`flex h-screen text-gray-800 dark:text-gray-200 font-sans ${themeName === 'dark' ? 'bg-page-dark' : 'bg-page-DEFAULT'}`}>
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header pageTitle={pageTitle} />
          <main className={`flex-1 overflow-x-hidden overflow-y-auto p-6 ${themeName === 'dark' ? 'bg-page-dark' : 'bg-page-DEFAULT'}`}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/credit-engine" element={<CreditEnginePage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/help-center" element={<HelpCenterPage />} />
              <Route path="/contact-support" element={<ContactSupportPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;