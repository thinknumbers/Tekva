import { useState } from 'react';
import { X, Sparkles, Copy } from 'lucide-react';

interface CoverLetterGeneratorProps {
  onClose: () => void;
}

export function CoverLetterGenerator({ onClose }: CoverLetterGeneratorProps) {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    company: '',
    experience: '',
    why: '',
  });
  const [generated, setGenerated] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  const handleGenerate = () => {
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    
    const letter = `${formData.name}
${today}

Dear Hiring Manager at ${formData.company},

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.company}. With my background in ${formData.experience}, I am confident that I would be a valuable addition to your team.

${formData.why || 'I am particularly drawn to this opportunity because it aligns perfectly with my career goals and allows me to leverage my skills and experience in a meaningful way.'}

Throughout my career, I have developed strong skills in problem-solving, teamwork, and communication. I am passionate about continuous learning and growth, and I believe that ${formData.company} would provide an excellent environment for me to contribute and develop professionally.

I am excited about the possibility of bringing my unique perspective and dedication to your team. I would welcome the opportunity to discuss how my experience and skills align with your needs.

Thank you for considering my application. I look forward to the opportunity to discuss this position further.

Sincerely,
${formData.name}`;

    setCoverLetter(letter);
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    alert('Cover letter copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl text-slate-900 mb-1">Cover Letter Generator</h2>
              <p className="text-slate-600">Create a personalized cover letter</p>
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
              <h3 className="text-lg text-slate-900 mb-4">Job Details</h3>

              <div>
                <label className="block text-slate-700 mb-2">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Marketing Manager"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., TechCorp Ltd"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Your Relevant Experience *</label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Briefly describe your relevant experience..."
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Why This Role? *</label>
                <textarea
                  value={formData.why}
                  onChange={(e) => setFormData({ ...formData, why: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Why are you interested in this position? What makes you a good fit?"
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-slate-900 mb-1 text-sm">AI Writing Tips</h4>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li>• Be specific about your skills and achievements</li>
                      <li>• Show enthusiasm for the role and company</li>
                      <li>• Keep it concise (one page maximum)</li>
                      <li>• Customize for each application</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!formData.name || !formData.jobTitle || !formData.company || !formData.experience}
                className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                Generate Cover Letter
              </button>
            </div>

            {/* Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-slate-900">Preview</h3>
                {generated && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                )}
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-lg p-8 min-h-[600px] overflow-auto">
                {generated ? (
                  <pre className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed">
                    {coverLetter}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Fill in the job details to generate your cover letter</p>
                    </div>
                  </div>
                )}
              </div>

              {generated && (
                <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex gap-3">
                    <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-slate-900 mb-1">Next Steps</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Review and customize the letter to match your voice</li>
                        <li>• Add specific examples of your achievements</li>
                        <li>• Proofread carefully before sending</li>
                        <li>• Save as PDF before attaching to application</li>
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
