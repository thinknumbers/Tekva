import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/pages/Home';
import { FinancialSupport } from './components/pages/FinancialSupport';
import { WorkPathways } from './components/pages/WorkPathways';
import { VentureSupport } from './components/pages/VentureSupport';
import { Dashboard } from './components/pages/Dashboard';
import { ApplicationDetails } from './components/pages/ApplicationDetails';
import { Tools } from './components/pages/Tools';
import { ApplicationProvider } from './context/ApplicationContext';

export type Page = 'home' | 'financial' | 'work' | 'venture' | 'dashboard' | 'applicationDetails' | 'tools';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'financial':
        return <FinancialSupport />;
      case 'work':
        return <WorkPathways />;
      case 'venture':
        return <VentureSupport />;
      case 'dashboard':
        return <Dashboard onViewDetails={(app) => {
          setSelectedApplication(app);
          setCurrentPage('applicationDetails');
        }} />;
      case 'applicationDetails':
        return selectedApplication ? (
          <ApplicationDetails 
            application={selectedApplication} 
            onBack={() => setCurrentPage('dashboard')}
          />
        ) : null;
      case 'tools':
        return <Tools />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ApplicationProvider>
      <div className="min-h-screen bg-slate-50">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="pt-16">
          {renderPage()}
        </main>
      </div>
    </ApplicationProvider>
  );
}