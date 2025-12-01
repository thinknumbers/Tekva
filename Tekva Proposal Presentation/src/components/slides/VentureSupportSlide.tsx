import { Check } from 'lucide-react';

export function VentureSupportSlide() {
  const deliverables = [
    'Founder intake form',
    'Automated business opportunity assessment',
    '"Founder GPT" for pitch decks, one-pagers, market sizing',
    'Rapid prototype engine (no-code and AI-assisted builds)',
    'Venture pipeline dashboard',
    'Stage gates + review governance',
  ];

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div>
        <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full mb-3">
          Pillar 3
        </div>
        <h2 className="text-4xl text-purple-600 mb-2">Venture Support</h2>
        <p className="text-xl text-slate-600">Empowering founders to solve real community problems</p>
      </div>

      <div className="flex-1">
        <h3 className="text-xl text-slate-800 mb-4">Tools I can deliver:</h3>
        <div className="grid grid-cols-2 gap-4">
          {deliverables.map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-purple-50 rounded-lg p-4">
              <div className="bg-purple-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                <Check className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border-l-4 border-purple-500">
        <p className="text-slate-700">
          <span className="text-purple-700">Result:</span> A functioning Tekva Labs engine 
          that produces real ventures — not just ideas.
        </p>
      </div>
    </div>
  );
}
