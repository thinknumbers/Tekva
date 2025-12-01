import { Check } from 'lucide-react';

export function WorkPathwaysSlide() {
  const deliverables = [
    'Skills & career intake tool',
    'Candidate scoring & matching engine',
    'AI-assisted CV prep + mock interviews',
    'Micro-credential and training recommendations',
    'Employer partner portal',
    'Placement outcome tracking',
  ];

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div>
        <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full mb-3">
          Pillar 2
        </div>
        <h2 className="text-4xl text-green-600 mb-2">Work Pathways</h2>
        <p className="text-xl text-slate-600">From skills → employment → independence</p>
      </div>

      <div className="flex-1">
        <h3 className="text-xl text-slate-800 mb-4">What I can build:</h3>
        <div className="grid grid-cols-2 gap-4">
          {deliverables.map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-green-50 rounded-lg p-4">
              <div className="bg-green-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-500">
        <p className="text-slate-700">
          <span className="text-green-700">Result:</span> Tekva becomes the central connector 
          between employers and community talent.
        </p>
      </div>
    </div>
  );
}
