import { useState } from 'react';
import { X, Calculator } from 'lucide-react';

interface LoanCalculatorProps {
  onClose: () => void;
}

export function LoanCalculator({ onClose }: LoanCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [calculated, setCalculated] = useState(false);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(loanTerm) * 12;

    if (principal && rate && months) {
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;

      return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      };
    }

    return null;
  };

  const results = calculated ? calculateLoan() : null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl text-slate-900 mb-1">Loan Calculator</h2>
              <p className="text-slate-600">Calculate your monthly payments</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-slate-900 mb-2">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-900 mb-2">Annual Interest Rate</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5.5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-900 mb-2">Loan Term</label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">years</span>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={() => setCalculated(true)}
              disabled={!loanAmount || !interestRate || !loanTerm}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="w-5 h-5" />
              Calculate
            </button>

            {/* Results */}
            {calculated && results && (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="text-lg text-slate-900 mb-4">Loan Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-blue-100">
                      <span className="text-slate-700">Monthly Payment</span>
                      <span className="text-2xl text-blue-600">£{results.monthlyPayment}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Total Payment</span>
                      <span className="text-lg text-slate-900">£{results.totalPayment}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Total Interest</span>
                      <span className="text-lg text-amber-600">£{results.totalInterest}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-6">
                  <h4 className="text-slate-900 mb-2">Breakdown</h4>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p>• You'll pay <span className="text-slate-900">£{results.monthlyPayment}</span> every month for <span className="text-slate-900">{loanTerm} years</span></p>
                    <p>• Total interest paid: <span className="text-amber-600">£{results.totalInterest}</span> ({((parseFloat(results.totalInterest) / parseFloat(loanAmount)) * 100).toFixed(1)}% of loan amount)</p>
                    <p>• Total amount to repay: <span className="text-slate-900">£{results.totalPayment}</span></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
