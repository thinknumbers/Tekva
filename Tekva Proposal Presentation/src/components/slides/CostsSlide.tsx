import { TrendingDown, Users, Repeat, Lightbulb, BarChart } from 'lucide-react';

export function CostsSlide() {
  const savings = [
    { icon: Users, text: 'Fewer staff needed for processing' },
    { icon: Repeat, text: 'Reusable components reduce dev time' },
    { icon: Lightbulb, text: 'GPTs reduce manual admin' },
    { icon: TrendingDown, text: 'Scalable tools reduce duplication' },
    { icon: BarChart, text: 'Analytics reduce blind decision-making' },
  ];

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div>
        <h2 className="text-4xl text-blue-600 mb-2">Costs, Resourcing & Efficiencies</h2>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-500">
        <p className="text-lg text-slate-700 mb-4">
          <span className="text-green-700">Because of automation + AI, Tekva saves significantly:</span>
        </p>
        <div className="space-y-3">
          {savings.map((saving, index) => {
            const Icon = saving.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-slate-700">{saving.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-slate-900 text-white rounded-lg p-8 flex flex-col justify-center">
        <h3 className="text-2xl mb-4">Recommendation:</h3>
        <p className="text-lg text-slate-200">
          Start with a flexible consulting engagement to build the platform foundation 
          and Tekva Labs capability.
        </p>
      </div>

      <div className="bg-blue-600 text-white rounded-lg p-4 text-center">
        <p className="text-lg">Let's turn vision into reality — together.</p>
      </div>
    </div>
  );
}
