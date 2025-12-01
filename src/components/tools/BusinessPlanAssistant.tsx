import { useState } from 'react';
import { X, Sparkles, FileText, CheckCircle } from 'lucide-react';

interface BusinessPlanAssistantProps {
  onClose: () => void;
}

export function BusinessPlanAssistant({ onClose }: BusinessPlanAssistantProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [sectionData, setSectionData] = useState<{ [key: number]: string }>({});

  const sections = [
    {
      title: 'Executive Summary',
      prompt: 'Write a brief overview of your business (2-3 paragraphs)',
      placeholder: 'Summarize your business concept, target market, unique value proposition, and financial highlights...',
      tip: 'Write this last, even though it comes first. It should capture the essence of your entire plan.'
    },
    {
      title: 'Company Description',
      prompt: 'Describe your company, its history, and mission',
      placeholder: 'What does your company do? When was it founded? What is your mission and vision?',
      tip: 'Include your legal structure, location, and what makes your company unique.'
    },
    {
      title: 'Market Analysis',
      prompt: 'Analyze your target market and industry',
      placeholder: 'Who are your customers? What is the market size? Who are your competitors? What are the trends?',
      tip: 'Use data and statistics. Show you understand your market deeply.'
    },
    {
      title: 'Organization & Management',
      prompt: 'Outline your business structure and team',
      placeholder: 'What is your organizational structure? Who are the key team members and their roles?',
      tip: 'Include an organizational chart and highlight relevant experience of key team members.'
    },
    {
      title: 'Products & Services',
      prompt: 'Describe what you\'re selling',
      placeholder: 'Detail your products or services. How do they benefit customers? What is your pricing strategy?',
      tip: 'Focus on customer benefits, not just features. Explain your competitive advantage.'
    },
    {
      title: 'Marketing & Sales',
      prompt: 'Explain how you\'ll attract and retain customers',
      placeholder: 'What is your marketing strategy? What are your sales tactics? What are your customer acquisition channels?',
      tip: 'Be specific about tactics and budget. Include both online and offline strategies.'
    },
    {
      title: 'Financial Projections',
      prompt: 'Provide financial forecasts and funding needs',
      placeholder: 'What are your projected revenues and expenses? What funding do you need? What are your key financial assumptions?',
      tip: 'Include 3-5 year projections. Be realistic and explain your assumptions.'
    },
  ];

  const handleSave = () => {
    if (sectionData[currentSection]?.trim()) {
      setCompletedSections([...new Set([...completedSections, currentSection])]);
    }
  };

  const handleNext = () => {
    handleSave();
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = (completedSections.length / sections.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl text-slate-900 mb-1">Business Plan Assistant</h2>
              <p className="text-slate-600">AI-guided business plan creation</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Progress</span>
              <span className="text-sm text-purple-600">{completedSections.length} of {sections.length} sections completed</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 p-6">
            {/* Section Navigation */}
            <div className="md:col-span-1 space-y-2">
              <h3 className="text-sm text-slate-600 mb-4">Sections</h3>
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                    currentSection === index
                      ? 'bg-purple-600 text-white shadow-lg'
                      : completedSections.includes(index)
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {completedSections.includes(index) && (
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="text-sm">{section.title}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="md:col-span-3 space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border-l-4 border-purple-600">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl text-slate-900 mb-2">{sections[currentSection].title}</h3>
                    <p className="text-slate-700">{sections[currentSection].prompt}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Your Content</label>
                <textarea
                  value={sectionData[currentSection] || ''}
                  onChange={(e) => setSectionData({ ...sectionData, [currentSection]: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder={sections[currentSection].placeholder}
                />
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-slate-900 mb-1">AI Tip</h4>
                    <p className="text-sm text-slate-700">{sections[currentSection].tip}</p>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  AI Suggestions
                </h4>
                <div className="space-y-2 text-sm text-slate-700">
                  {currentSection === 0 && (
                    <>
                      <p>• Keep it concise - investors often read this first</p>
                      <p>• Include your funding ask if seeking investment</p>
                      <p>• Highlight your most impressive achievements</p>
                    </>
                  )}
                  {currentSection === 2 && (
                    <>
                      <p>• Use TAM, SAM, SOM framework for market sizing</p>
                      <p>• Include competitor analysis and your differentiation</p>
                      <p>• Reference credible market research sources</p>
                    </>
                  )}
                  {currentSection === 6 && (
                    <>
                      <p>• Project at least 3 years forward</p>
                      <p>• Include income statement, cash flow, and balance sheet</p>
                      <p>• Explain key assumptions behind your numbers</p>
                    </>
                  )}
                  {currentSection !== 0 && currentSection !== 2 && currentSection !== 6 && (
                    <>
                      <p>• Be specific and detailed</p>
                      <p>• Use data and examples where possible</p>
                      <p>• Keep your target audience in mind</p>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <button
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous Section
                </button>

                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Section
                </button>

                {currentSection < sections.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Next Section
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Complete Plan
                  </button>
                )}
              </div>

              {completedSections.length === sections.length && (
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg text-slate-900 mb-2">Business Plan Complete! 🎉</h4>
                      <p className="text-slate-700 mb-4">
                        Great work! You've completed all sections of your business plan.
                      </p>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Download as PDF
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
