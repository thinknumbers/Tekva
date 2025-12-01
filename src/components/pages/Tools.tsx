import { useState } from 'react';
import { DollarSign, Briefcase, Rocket, Wrench } from 'lucide-react';
import { BudgetPlanner } from '../tools/BudgetPlanner';
import { LoanCalculator } from '../tools/LoanCalculator';
import { BorrowingCapacity } from '../tools/BorrowingCapacity';
import { ResumeGenerator } from '../tools/ResumeGenerator';
import { CoverLetterGenerator } from '../tools/CoverLetterGenerator';
import { InterviewPrep } from '../tools/InterviewPrep';
import { PitchDeckGenerator } from '../tools/PitchDeckGenerator';
import { BusinessPlanAssistant } from '../tools/BusinessPlanAssistant';
import { MarketSizeCalculator } from '../tools/MarketSizeCalculator';

type ToolCategory = 'financial' | 'work' | 'venture';
type ToolId = 
  | 'budget-planner' 
  | 'loan-calculator' 
  | 'borrowing-capacity'
  | 'resume-generator'
  | 'cover-letter-generator'
  | 'interview-prep'
  | 'pitch-deck-generator'
  | 'business-plan-assistant'
  | 'market-size-calculator';

export function Tools() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('financial');
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);

  const categories = [
    { id: 'financial' as ToolCategory, label: 'Financial Support', icon: DollarSign, color: 'blue' },
    { id: 'work' as ToolCategory, label: 'Work Pathways', icon: Briefcase, color: 'green' },
    { id: 'venture' as ToolCategory, label: 'Venture Support', icon: Rocket, color: 'purple' },
  ];

  const tools = {
    financial: [
      { id: 'budget-planner' as ToolId, name: 'Budget Planner', description: 'AI-powered tool to help plan your monthly budget' },
      { id: 'loan-calculator' as ToolId, name: 'Loan Calculator', description: 'Calculate loan payments and total interest' },
      { id: 'borrowing-capacity' as ToolId, name: 'Borrowing Capacity', description: 'Estimate how much you can borrow' },
    ],
    work: [
      { id: 'resume-generator' as ToolId, name: 'AI Resume Generator', description: 'Create a professional resume with AI assistance' },
      { id: 'cover-letter-generator' as ToolId, name: 'Cover Letter Generator', description: 'Generate tailored cover letters' },
      { id: 'interview-prep' as ToolId, name: 'Interview Prep', description: 'Practice with common interview questions' },
    ],
    venture: [
      { id: 'pitch-deck-generator' as ToolId, name: 'Pitch Deck Generator', description: 'Create compelling pitch deck content' },
      { id: 'business-plan-assistant' as ToolId, name: 'Business Plan Assistant', description: 'Get help writing your business plan' },
      { id: 'market-size-calculator' as ToolId, name: 'Market Size Calculator', description: 'Calculate your addressable market' },
    ],
  };

  const renderTool = () => {
    switch (activeTool) {
      case 'budget-planner':
        return <BudgetPlanner onClose={() => setActiveTool(null)} />;
      case 'loan-calculator':
        return <LoanCalculator onClose={() => setActiveTool(null)} />;
      case 'borrowing-capacity':
        return <BorrowingCapacity onClose={() => setActiveTool(null)} />;
      case 'resume-generator':
        return <ResumeGenerator onClose={() => setActiveTool(null)} />;
      case 'cover-letter-generator':
        return <CoverLetterGenerator onClose={() => setActiveTool(null)} />;
      case 'interview-prep':
        return <InterviewPrep onClose={() => setActiveTool(null)} />;
      case 'pitch-deck-generator':
        return <PitchDeckGenerator onClose={() => setActiveTool(null)} />;
      case 'business-plan-assistant':
        return <BusinessPlanAssistant onClose={() => setActiveTool(null)} />;
      case 'market-size-calculator':
        return <MarketSizeCalculator onClose={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  if (activeTool) {
    return renderTool();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Wrench className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl text-slate-900 mb-2">Tekva Tools</h1>
          <p className="text-lg text-slate-600">Free tools to help you succeed</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-3 ${
                  activeCategory === category.id
                    ? `bg-${category.color}-600 text-white shadow-lg scale-105`
                    : 'bg-white text-slate-700 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools[activeCategory].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <div className={`w-10 h-10 rounded-lg bg-${categories.find(c => c.id === activeCategory)?.color}-100 flex items-center justify-center`}>
                  <Wrench className={`w-5 h-5 text-${categories.find(c => c.id === activeCategory)?.color}-600`} />
                </div>
              </div>
              <p className="text-slate-600">{tool.description}</p>
              <div className="mt-4 text-blue-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                <span>Open Tool</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
