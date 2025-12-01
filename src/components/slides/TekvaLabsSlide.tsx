import { Zap, Code, Users, Database, Brain, Layout } from 'lucide-react';

export function TekvaLabsSlide() {
  const features = [
    { icon: Zap, text: 'Rapid prototyping capability' },
    { icon: Layout, text: 'Standardised component library' },
    { icon: Users, text: 'Shared login & unified UI' },
    { icon: Database, text: 'Core data model across all apps' },
    { icon: Brain, text: 'AI embedded into every workflow' },
    { icon: Code, text: 'Reusable forms, GPTs, dashboards, templates' },
  ];

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div className="text-center">
        <h2 className="text-5xl text-blue-600 mb-3">Introducing: Tekva Labs</h2>
        <p className="text-2xl text-slate-700">The Tekva innovation engine.</p>
        <p className="text-lg text-slate-500 mt-2">
          A lightweight, fast-moving unit that turns problems into products.
        </p>
      </div>

      <div className="flex-1">
        <h3 className="text-xl text-slate-800 mb-4 text-center">What it includes:</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-5 flex items-center gap-4 border border-blue-100">
                <div className="bg-blue-600 text-white rounded-lg p-3">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-slate-700">{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 text-center">
        <p className="text-lg">
          This becomes the <span className="font-semibold">platform layer</span> that all community tools can sit on.
        </p>
      </div>
    </div>
  );
}
