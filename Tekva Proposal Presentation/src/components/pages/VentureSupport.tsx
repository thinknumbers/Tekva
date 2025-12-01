import { useState } from 'react';
import { Rocket, CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';

export function VentureSupport() {
  const { addVentureApplication } = useApplications();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    phone: '',
    ventureName: '',
    stage: '',
    industry: '',
    problem: '',
    solution: '',
    targetMarket: '',
    businessModel: '',
    teamSize: '',
    funding: '',
    timeline: '',
    supportNeeded: [] as string[],
  });

  const supportOptions = [
    'Business Planning',
    'Pitch Deck Creation',
    'Market Research',
    'Financial Modeling',
    'Legal Setup',
    'Branding & Design',
    'Website Development',
    'Marketing Strategy',
    'Mentorship',
    'Funding Connections',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSupport = (support: string) => {
    setFormData({
      ...formData,
      supportNeeded: formData.supportNeeded.includes(support)
        ? formData.supportNeeded.filter((s) => s !== support)
        : [...formData.supportNeeded, support],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addVentureApplication({
        founderName: formData.founderName,
        ventureName: formData.ventureName,
        stage: formData.stage,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-3xl text-slate-900 mb-4">Application Submitted!</h2>
            <p className="text-lg text-slate-600 mb-8">
              Congratulations, {formData.founderName}! Your venture "{formData.ventureName}" has been submitted
              to Tekva Labs. Our team will review your application and be in touch within 3-5 business days.
            </p>
            <div className="bg-purple-50 rounded-lg p-6 mb-8 text-left">
              <div className="flex items-start gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg text-slate-900 mb-2">What Happens Next?</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>AI-powered business opportunity assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Review by our venture support team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Invitation to founder workshop (if approved)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Access to Founder GPT and rapid prototyping tools</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 mt-4">
                <h4 className="text-slate-900 mb-2">Support Requested:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.supportNeeded.map((support) => (
                    <span
                      key={support}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                    >
                      {support}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFormData({
                  founderName: '',
                  email: '',
                  phone: '',
                  ventureName: '',
                  stage: '',
                  industry: '',
                  problem: '',
                  solution: '',
                  targetMarket: '',
                  businessModel: '',
                  teamSize: '',
                  funding: '',
                  timeline: '',
                  supportNeeded: [],
                });
              }}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit Another Venture
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Rocket className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl md:text-4xl text-slate-900 mb-2">Venture Support Application</h1>
          <p className="text-lg text-slate-600">Turn your idea into a thriving venture with Tekva Labs</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Step {step} of 3</span>
            <span className="text-sm text-slate-600">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Founder & Venture Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-slate-900 mb-4">Founder & Venture Information</h2>

                <div>
                  <label className="block text-slate-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+44 20 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Venture Name *</label>
                  <input
                    type="text"
                    name="ventureName"
                    value={formData.ventureName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="What's your venture called?"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 mb-2">Current Stage *</label>
                    <select
                      name="stage"
                      value={formData.stage}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select stage</option>
                      <option value="Idea">Idea</option>
                      <option value="Prototype">Prototype</option>
                      <option value="MVP">MVP (Minimum Viable Product)</option>
                      <option value="Early Revenue">Early Revenue</option>
                      <option value="Scaling">Scaling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Industry *</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Community Services">Community Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Model */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-slate-900 mb-4">Business Model</h2>

                <div>
                  <label className="block text-slate-700 mb-2">
                    What problem are you solving? *
                  </label>
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Describe the problem your venture addresses..."
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">
                    What's your solution? *
                  </label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Describe your solution and how it works..."
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">
                    Target Market *
                  </label>
                  <input
                    type="text"
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Jewish families in the UK, Small businesses, Students..."
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">
                    How will you make money? *
                  </label>
                  <textarea
                    name="businessModel"
                    value={formData.businessModel}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Describe your revenue model (subscriptions, sales, services, etc.)..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 mb-2">Team Size</label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select team size</option>
                      <option value="Just me">Just me</option>
                      <option value="2-3 people">2-3 people</option>
                      <option value="4-6 people">4-6 people</option>
                      <option value="7+ people">7+ people</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Funding Status</label>
                    <select
                      name="funding"
                      value={formData.funding}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select funding status</option>
                      <option value="Bootstrapped">Bootstrapped</option>
                      <option value="Friends & Family">Friends & Family</option>
                      <option value="Seeking Funding">Seeking Funding</option>
                      <option value="Angel/Seed">Angel/Seed Funded</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Support Needed */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-slate-900 mb-4">Support Needed</h2>

                <div>
                  <label className="block text-slate-700 mb-3">
                    What support do you need? * (Choose all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {supportOptions.map((support) => (
                      <button
                        key={support}
                        type="button"
                        onClick={() => toggleSupport(support)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                          formData.supportNeeded.includes(support)
                            ? 'border-purple-600 bg-purple-50 text-purple-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                        }`}
                      >
                        {support}
                      </button>
                    ))}
                  </div>
                  {formData.supportNeeded.length === 0 && (
                    <p className="text-sm text-amber-600 mt-2">Please select at least one support type</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">When do you want to launch?</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                  </select>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                  <div className="flex items-start gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg text-slate-900 mb-2">Tekva Labs Tools</h3>
                      <p className="text-slate-700 mb-3">
                        Once approved, you'll get access to:
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span><span className="text-slate-900">Founder GPT:</span> AI assistant for pitch decks, business plans, and market research</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span><span className="text-slate-900">Rapid Prototype Engine:</span> Build MVPs quickly with no-code tools</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span><span className="text-slate-900">Mentorship Network:</span> Connect with experienced entrepreneurs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span><span className="text-slate-900">Community Funding:</span> Access to investors and grants</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={formData.supportNeeded.length === 0}
                  className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
