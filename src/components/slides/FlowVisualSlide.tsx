import { ArrowRight } from 'lucide-react';

export function FlowVisualSlide() {
  const steps = [
    { num: 1, text: 'Applicant starts form' },
    { num: 2, text: 'Dynamic questions adjust in real time' },
    { num: 3, text: 'Admin receives AI summary' },
    { num: 4, text: 'Reviewer selects support type' },
    { num: 5, text: 'System triggers workflow (funding, referrals, documentation)' },
    { num: 6, text: 'Applicant sees status updates' },
    { num: 7, text: 'Data feeds Tekva analytics engine' },
  ];

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div>
        <h2 className="text-4xl text-blue-600 mb-2">Financial Support System Flow</h2>
        <p className="text-slate-500">Example Process</p>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-3">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                {step.num}
              </div>
              <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                <p className="text-slate-700">{step.text}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowRight className="w-5 h-5 text-blue-400 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white rounded-lg p-4 text-center">
        <p className="text-lg">Clean, simple, automated.</p>
      </div>
    </div>
  );
}
