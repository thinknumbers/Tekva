import { useState } from 'react';
import { X, Sparkles, ChevronRight } from 'lucide-react';

interface PitchDeckGeneratorProps {
  onClose: () => void;
}

export function PitchDeckGenerator({ onClose }: PitchDeckGeneratorProps) {
  const [formData, setFormData] = useState({
    ventureName: '',
    tagline: '',
    problem: '',
    solution: '',
    market: '',
    business: '',
    team: '',
  });
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerated(true);
  };

  const slides = [
    {
      title: 'Problem',
      content: formData.problem || 'Describe the problem you\'re solving',
      tip: 'Make it relatable and urgent. Use statistics if possible.'
    },
    {
      title: 'Solution',
      content: formData.solution || 'Explain your innovative solution',
      tip: 'Show how your solution uniquely addresses the problem.'
    },
    {
      title: 'Market Opportunity',
      content: formData.market || 'Define your target market and size',
      tip: 'Use TAM, SAM, SOM framework. Show growth potential.'
    },
    {
      title: 'Business Model',
      content: formData.business || 'Explain how you make money',
      tip: 'Be clear about pricing, revenue streams, and unit economics.'
    },
    {
      title: 'Team',
      content: formData.team || 'Introduce your founding team',
      tip: 'Highlight relevant experience and why you\'re the right team.'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl text-slate-900 mb-1">Pitch Deck Generator</h2>
              <p className="text-slate-600">Create compelling pitch deck content with AI</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Input Form */}
            <div className="space-y-4">
              <h3 className="text-lg text-slate-900 mb-4">Your Venture</h3>

              <div>
                <label className="block text-slate-700 mb-2">Venture Name *</label>
                <input
                  type="text"
                  value={formData.ventureName}
                  onChange={(e) => setFormData({ ...formData, ventureName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Tagline *</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="One sentence that captures your vision"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Problem *</label>
                <textarea
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="What problem are you solving?"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Solution *</label>
                <textarea
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="How does your product/service solve the problem?"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Market Opportunity</label>
                <textarea
                  value={formData.market}
                  onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Who is your target market? How big is it?"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Business Model</label>
                <textarea
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="How will you make money?"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Team</label>
                <textarea
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Key team members and their expertise"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!formData.ventureName || !formData.problem || !formData.solution}
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                Generate Pitch Deck Content
              </button>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <h3 className="text-lg text-slate-900">Preview Slides</h3>

              {!generated ? (
                <div className="flex items-center justify-center h-full bg-slate-50 rounded-lg p-12">
                  <div className="text-center text-slate-400">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Fill in your information to preview slides</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                  {/* Title Slide */}
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-8 text-white">
                    <h3 className="text-3xl mb-3">{formData.ventureName}</h3>
                    <p className="text-xl text-purple-100">{formData.tagline}</p>
                    <div className="mt-8 text-sm text-purple-200">Slide 1</div>
                  </div>

                  {/* Content Slides */}
                  {slides.map((slide, index) => (
                    <div key={index} className="bg-white border-2 border-purple-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-xl text-purple-600">{slide.title}</h4>
                        <span className="text-sm text-slate-500">Slide {index + 2}</span>
                      </div>
                      <p className="text-slate-800 mb-4 whitespace-pre-wrap">{slide.content}</p>
                      <div className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-600">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700">{slide.tip}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Closing Slide */}
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center">
                    <h3 className="text-2xl mb-4">Let's Build Together</h3>
                    <p className="text-purple-100 mb-6">{formData.ventureName}</p>
                    <div className="flex items-center justify-center gap-2 text-purple-200">
                      <span>Ready to learn more?</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <div className="mt-8 text-sm text-purple-200">Final Slide</div>
                  </div>
                </div>
              )}

              {generated && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-slate-900 mb-1 text-sm">Next Steps</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Export to PowerPoint or Google Slides</li>
                        <li>• Add visuals, charts, and graphics</li>
                        <li>• Practice your 3-minute pitch</li>
                        <li>• Get feedback from mentors</li>
                      </ul>
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
