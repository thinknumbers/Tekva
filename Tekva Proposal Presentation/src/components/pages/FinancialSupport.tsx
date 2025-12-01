import { useState } from 'react';
import { DollarSign, CheckCircle, Upload, AlertCircle } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';

export function FinancialSupport() {
  const { addFinancialApplication } = useApplications();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    familySize: '',
    supportType: '',
    urgency: '',
    monthlyIncome: '',
    expenses: '',
    situation: '',
    amount: '',
  });

  const supportTypes = [
    'Emergency Housing',
    'Food Assistance',
    'Medical Bills',
    'Education Fees',
    'Utility Bills',
    'Other',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addFinancialApplication({
        name: formData.name,
        familySize: parseInt(formData.familySize),
        supportType: formData.supportType,
        amount: formData.amount,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      // Optionally handle error state here
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
            <h2 className="text-3xl text-slate-900 mb-4">Application Submitted</h2>
            <p className="text-lg text-slate-600 mb-8">
              Thank you, {formData.name}. Your application has been received and is being reviewed by our team.
              We will contact you within 2-3 business days.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg text-slate-900 mb-4">Application Summary:</h3>
              <div className="space-y-2 text-slate-700">
                <p><span className="text-slate-500">Support Type:</span> {formData.supportType}</p>
                <p><span className="text-slate-500">Family Size:</span> {formData.familySize}</p>
                <p><span className="text-slate-500">Status:</span> Pending Review</p>
                <p><span className="text-slate-500">Reference ID:</span> FS-{Date.now().toString().slice(-6)}</p>
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
                  familySize: '',
                  supportType: '',
                  urgency: '',
                  monthlyIncome: '',
                  expenses: '',
                  situation: '',
                  amount: '',
                });
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Another Application
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl text-slate-900 mb-2">Financial Support Application</h1>
          <p className="text-lg text-slate-600">We're here to help. All information is confidential.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Step {step} of 3</span>
            <span className="text-sm text-slate-600">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+44 20 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Family Size *</label>
                  <input
                    type="number"
                    name="familySize"
                    value={formData.familySize}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of people in household"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Support Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-slate-900 mb-4">Support Details</h2>

                <div>
                  <label className="block text-slate-700 mb-2">Type of Support Needed *</label>
                  <select
                    name="supportType"
                    value={formData.supportType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a support type</option>
                    {supportTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Urgency Level *</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select urgency</option>
                    <option value="immediate">Immediate (within 24 hours)</option>
                    <option value="urgent">Urgent (within 1 week)</option>
                    <option value="moderate">Moderate (within 2-4 weeks)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Estimated Amount Needed</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="£"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 mb-2">Monthly Income</label>
                    <input
                      type="text"
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="£"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Monthly Expenses</label>
                    <input
                      type="text"
                      name="expenses"
                      value={formData.expenses}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="£"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-slate-900 mb-4">Additional Information</h2>

                <div>
                  <label className="block text-slate-700 mb-2">
                    Please describe your current situation *
                  </label>
                  <textarea
                    name="situation"
                    value={formData.situation}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your circumstances and how we can help..."
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <div className="flex gap-3">
                    <Upload className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-slate-900 mb-2">Document Upload (Optional)</h3>
                      <p className="text-sm text-slate-600 mb-4">
                        You can upload supporting documents such as bills, medical records, or proof of income.
                      </p>
                      <button
                        type="button"
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-sm"
                      >
                        Choose Files
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-500">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-slate-900 mb-2">Privacy & Confidentiality</h3>
                      <p className="text-sm text-slate-700">
                        All information provided is strictly confidential and will only be used to assess
                        your application and provide appropriate support.
                      </p>
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
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
