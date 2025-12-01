import { useState } from 'react';
import { Briefcase, CheckCircle, Sparkles } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';

export function WorkPathways() {
  const { addWorkApplication } = useApplications();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    skills: [] as string[],
    availability: '',
    workType: '',
    education: '',
    cv: '',
    goals: '',
  });

  const skillOptions = [
    'Customer Service',
    'Data Entry',
    'Accounting',
    'Teaching',
    'Healthcare',
    'IT Support',
    'Sales',
    'Administration',
    'Hospitality',
    'Construction',
    'Education',
    'Marketing',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.includes(skill)
        ? formData.skills.filter((s) => s !== skill)
        : [...formData.skills, skill],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addWorkApplication({
        name: formData.name,
        skills: formData.skills,
        experience: formData.experience,
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl text-slate-900 mb-4">Profile Created!</h2>
            <p className="text-lg text-slate-600 mb-8">
              Welcome to Work Pathways, {formData.name}! Your profile has been created and our team
              is already matching you with opportunities.
            </p>
            <div className="bg-green-50 rounded-lg p-6 mb-8 text-left">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg text-slate-900 mb-2">AI-Powered Matching</h3>
                  <p className="text-slate-700">
                    Our system is analyzing your skills and experience to find the best job matches.
                    You'll receive notifications about suitable opportunities.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 mt-4">
                <h4 className="text-slate-900 mb-2">Your Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
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
                  name: '',
                  email: '',
                  phone: '',
                  experience: '',
                  skills: [],
                  availability: '',
                  workType: '',
                  education: '',
                  cv: '',
                  goals: '',
                });
              }}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Another Profile
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl text-slate-900 mb-2">Work Pathways Application</h1>
          <p className="text-lg text-slate-600">Find your path to meaningful employment</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Step {step} of 3</span>
            <span className="text-sm text-slate-600">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-slate-900 mb-4">Personal Information</h2>

                <div>
                  <label className="block text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
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
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+44 20 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Years of Experience *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Highest Education Level</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select education level</option>
                    <option value="High School">High School</option>
                    <option value="Some College">Some College</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Vocational Training">Vocational Training</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Skills & Preferences */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-slate-900 mb-4">Skills & Preferences</h2>

                <div>
                  <label className="block text-slate-700 mb-3">
                    Select Your Skills * (Choose all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                          formData.skills.includes(skill)
                            ? 'border-green-600 bg-green-50 text-green-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-green-300'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  {formData.skills.length === 0 && (
                    <p className="text-sm text-amber-600 mt-2">Please select at least one skill</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Preferred Work Type *</label>
                  <select
                    name="workType"
                    value={formData.workType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select work type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Flexible">Flexible Hours</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Availability *</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">When can you start?</option>
                    <option value="Immediately">Immediately</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Within 2-3 months">Within 2-3 months</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Goals & CV */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-slate-900 mb-4">Career Goals</h2>

                <div>
                  <label className="block text-slate-700 mb-2">
                    What are your career goals? *
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your career aspirations and what kind of work you're looking for..."
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                  <h3 className="text-slate-900 mb-3">AI-Powered Support Tools</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-slate-700">
                          <span className="text-slate-900">CV Builder:</span> Get help creating a professional CV
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-slate-700">
                          <span className="text-slate-900">Interview Prep:</span> Practice with AI mock interviews
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-slate-700">
                          <span className="text-slate-900">Job Matching:</span> Get personalized job recommendations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-slate-900 mb-2">Upload Your CV (Optional)</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    If you have an existing CV, upload it here. Otherwise, we'll help you create one.
                  </p>
                  <button
                    type="button"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-sm"
                  >
                    Choose File
                  </button>
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
                  disabled={step === 2 && formData.skills.length === 0}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
