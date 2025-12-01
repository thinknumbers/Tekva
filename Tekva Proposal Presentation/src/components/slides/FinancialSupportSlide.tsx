import { Check } from 'lucide-react';

export function FinancialSupportSlide() {
  const deliverables = [
    'Smart, respectful hardship/support forms',
    'Dynamic question flows based on profile',
    'Secure doc upload',
    'Automated triaging logic',
    'Reviewer dashboards',
    'Clear applicant status tracking',
    'AI-generated case summaries',
    'Predictive analytics (future funding demand)',
  ];

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div>
        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full mb-3">
          Pillar 1
        </div>
        <h2 className="text-4xl text-blue-600 mb-2">Financial Support</h2>
        <p className="text-xl text-slate-600">Building dignity-first financial assistance systems</p>
      </div>

      <div className="flex-1">
        <h3 className="text-xl text-slate-800 mb-4">What I can deliver:</h3>
        <div className="grid grid-cols-2 gap-3">
          {deliverables.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-500">
        <p className="text-slate-700">
          <span className="text-green-700">Result:</span> Faster processing, reduced admin, better decisions, 
          and a smoother, more humane experience for families.
        </p>
      </div>
    </div>
  );
}
