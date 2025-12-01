import { TrendingUp, Users, BarChart3, Lightbulb, Eye, Target } from 'lucide-react';

export function OpportunitySlide() {
  const needs = [
    { icon: TrendingUp, text: 'scale impact' },
    { icon: Users, text: 'support more families' },
    { icon: BarChart3, text: 'reduce admin load' },
    { icon: Lightbulb, text: 'cut duplication' },
    { icon: Eye, text: 'bring transparency' },
    { icon: Target, text: 'create measurable outcomes' },
  ];

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div>
        <h2 className="text-4xl text-blue-600 mb-2">The Opportunity</h2>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-600">
        <p className="text-lg text-slate-700">
          Right now, Tekva has <span className="text-blue-700">vision</span>, 
          <span className="text-blue-700"> trust</span>, and 
          <span className="text-blue-700"> momentum</span>… but needs systems to:
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 flex-1">
        {needs.map((need, index) => {
          const Icon = need.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 flex items-center gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-slate-700">{need.text}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 rounded-lg p-6 text-white">
        <p className="text-xl mb-2">This is where I can help.</p>
        <p className="text-slate-300">
          I build real, working platforms quickly — with AI, automation, and modern product design.
        </p>
      </div>
    </div>
  );
}
