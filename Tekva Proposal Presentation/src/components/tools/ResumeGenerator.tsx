import { useState } from 'react';
import { X, Sparkles, Download, Copy } from 'lucide-react';

interface ResumeGeneratorProps {
  onClose: () => void;
}

export function ResumeGenerator({ onClose }: ResumeGeneratorProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    skills: '',
    education: '',
  });
  const [generated, setGenerated] = useState(false);
  const [generatedResume, setGeneratedResume] = useState('');

  const handleGenerate = () => {
    // Mock AI generation - in real app, this would call an AI API
    const resume = `
${formData.name.toUpperCase()}
${formData.email} | ${formData.phone}

PROFESSIONAL SUMMARY
${formData.summary || 'A dedicated professional with proven experience and strong work ethic, seeking to contribute skills and expertise to a dynamic organization.'}

EXPERIENCE
${formData.experience || 'Detail your work experience here, including job titles, companies, dates, and key achievements.'}

SKILLS
${formData.skills.split(',').map(skill => `• ${skill.trim()}`).join('\n') || '• Communication\n• Problem Solving\n• Team Collaboration'}

EDUCATION
${formData.education || 'Your educational background'}

---
Generated with Tekva AI Resume Builder
    `.trim();

    setGeneratedResume(resume);
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResume);
    alert('Resume copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl text-slate-900 mb-1">AI Resume Generator</h2>
              <p className="text-slate-600">Create a professional resume in minutes</p>
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
              <h3 className="text-lg text-slate-900 mb-4">Your Information</h3>

              <div>
                <label className="block text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+44 20 1234 5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Professional Summary</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Brief summary of your experience and goals..."
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Work Experience</label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="List your work experience, including job titles, companies, and key achievements..."
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Communication, Leadership, Data Analysis"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Education</label>
                <textarea
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Your educational background..."
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!formData.name || !formData.email || !formData.phone}
                className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                Generate Resume
              </button>
            </div>

            {/* Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-slate-900">Preview</h3>
                {generated && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-lg p-8 min-h-[600px] overflow-auto">
                {generated ? (
                  <pre className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed">
                    {generatedResume}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Fill in your information and click Generate</p>
                    </div>
                  </div>
                )}
              </div>

              {generated && (
                <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex gap-3">
                    <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-slate-900 mb-1">AI Tip</h4>
                      <p className="text-sm text-slate-700">
                        Your resume looks good! Consider adding specific metrics and achievements 
                        to make it even stronger. For example: "Increased sales by 30%" or 
                        "Managed team of 5 people."
                      </p>
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
