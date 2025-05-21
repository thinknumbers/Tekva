
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { IconHelpCenter, IconSearch, IconBookOpen, IconChevronDown } from '../constants';
import { useTheme } from '../contexts/ThemeContext';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const mockFaqs: FaqItem[] = [
  { id: 'faq1', category: 'General', question: 'What is the Eldium ABS Lending Platform?', answer: 'It is a digital solution for managing asset-backed securities lending, streamlining processes for funders and originators.' },
  { id: 'faq2', category: 'Deals', question: 'How do I submit a new deal for assessment?', answer: 'Navigate to the "Deals Management" page and click "Add New Deal". Fill in the required information and submit. The credit engine will then perform an assessment.' },
  { id: 'faq3', category: 'Facilities', question: 'What are covenants and how are they monitored?', answer: 'Covenants are conditions agreed upon in a facility. The platform monitors them automatically based on ingested data, alerting users to potential breaches.' },
  { id: 'faq4', category: 'Reporting', question: 'Can I schedule reports to be generated automatically?', answer: 'Yes, most standard reports can be scheduled. Go to the "Reporting & Analytics" page, select a report template, and use the "Schedule" option.' },
  { id: 'faq5', category: 'General', question: 'Is my data secure on the platform?', answer: 'Security is paramount. The platform uses multi-layered security, encryption, and is designed to meet Australian regulatory standards like CPS 234.' },
  { id: 'faq6', category: 'Credit Engine', question: 'How does the Credit Engine assess risk?', answer: "Eldium's proprietary Credit Engine uses advanced models to analyze various data points including originator financials, asset quality, market conditions, and deal structure to generate a comprehensive risk score." },
];

interface DocCategory {
    id: string;
    name: string;
    description: string;
    // FIX: Changed React.ReactNode to React.ReactElement<{ className?: string }> for cat.icon to satisfy React.cloneElement and allow className
    icon: React.ReactElement<{ className?: string }>;
}

const mockDocCategories: DocCategory[] = [
    {id: 'getting_started', name: 'Getting Started', description: 'Platform overview, first login, and dashboard navigation.', icon: <IconBookOpen className="w-5 h-5 mr-2"/>},
    {id: 'deal_management', name: 'Deal Lifecycle Management', description: 'Submitting, tracking, and managing deals from origination to maturity.', icon: <IconBookOpen className="w-5 h-5 mr-2"/>},
    {id: 'facility_admin', name: 'Facility Administration', description: 'Setting up facilities, managing tranches, and monitoring covenants.', icon: <IconBookOpen className="w-5 h-5 mr-2"/>},
    {id: 'reporting_guide', name: 'Reporting & Analytics', description: 'Generating standard reports and understanding key metrics.', icon: <IconBookOpen className="w-5 h-5 mr-2"/>},
    {id: 'user_roles', name: 'User Roles & Permissions', description: 'Understanding different user access levels and capabilities.', icon: <IconBookOpen className="w-5 h-5 mr-2"/>},
    {id: 'compliance_security', name: 'Compliance & Security', description: 'Overview of security features and compliance adherence.', icon: <IconBookOpen className="w-5 h-5 mr-2"/>},
];

const FaqAccordionItem: React.FC<{ faq: FaqItem, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick}) => {
    const { primaryColor } = useTheme();
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <h2>
                <button 
                    type="button" 
                    className="flex items-center justify-between w-full py-3 px-1 text-left font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none"
                    onClick={onClick}
                    aria-expanded={isOpen}
                >
                    <span style={{color: isOpen ? primaryColor : undefined}}>{faq.question}</span>
                    <IconChevronDown className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </h2>
            {isOpen && (
                <div className="pb-3 px-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
            )}
        </div>
    )
}


const HelpCenterPage: React.FC = () => {
  const { primaryColor } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const filteredFaqs = mockFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8 bg-gradient-to-r from-primary-light via-primary to-primary-dark dark:from-primary-dark dark:via-primary-default dark:to-primary-light rounded-lg shadow-md">
        <IconHelpCenter className="w-16 h-16 text-white mx-auto mb-3" />
        <h1 className="text-4xl font-bold text-white">Eldium Help Center</h1>
        <p className="text-indigo-100 mt-2">How can we help you today?</p>
        <div className="mt-6 max-w-xl mx-auto px-4">
          <div className="relative">
            <input 
              type="search"
              placeholder="Search articles, FAQs, documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <Card title="Frequently Asked Questions (FAQs)" titleSize="lg">
        {filteredFaqs.length > 0 ? (
            filteredFaqs.map(faq => (
                <FaqAccordionItem 
                    key={faq.id} 
                    faq={faq}
                    isOpen={openFaqId === faq.id}
                    onClick={() => toggleFaq(faq.id)}
                />
            ))
        ) : (
            <p className="p-4 text-gray-500 dark:text-gray-400">No FAQs match your search term "{searchTerm}". Try a different query or browse our documentation categories.</p>
        )}
      </Card>

      <Card title="Documentation Categories" titleSize="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
            {mockDocCategories.map(cat => (
                <a 
                    key={cat.id} 
                    href="#" // Placeholder link
                    onClick={(e) => {e.preventDefault(); alert(`Navigate to documentation for ${cat.name}`)}}
                    className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700/60 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                >
                    <div className="flex items-center mb-1">
                        {/* FIX: cat.icon is now React.ReactElement<{ className?: string }>, direct clone works */}
                        {React.cloneElement(cat.icon, { className: "w-5 h-5 mr-2 text-primary dark:text-primary-light" })}
                        <h4 className="text-base font-semibold text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light">{cat.name}</h4>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cat.description}</p>
                </a>
            ))}
        </div>
      </Card>

      <Card title="Still Need Help?">
        <div className="p-4 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-3">
                If you can't find what you're looking for, our support team is ready to assist.
            </p>
            <Button 
                variant="primary" 
                onClick={() => window.location.hash = "/contact-support"}
            >
                Contact Support
            </Button>
        </div>
      </Card>
    </div>
  );
};

export default HelpCenterPage;