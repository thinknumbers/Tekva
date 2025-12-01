import { useState } from 'react';
import { X, DollarSign, TrendingUp } from 'lucide-react';

interface BorrowingCapacityProps {
  onClose: () => void;
}

export function BorrowingCapacity({ onClose }: BorrowingCapacityProps) {
  const [annualIncome, setAnnualIncome] = useState('');
  const [monthlyDebts, setMonthlyDebts] = useState('');
  const [deposit, setDeposit] = useState('');
  const [calculated, setCalculated] = useState(false);

  const calculateCapacity = () => {
    const income = parseFloat(annualIncome);
    const debts = parseFloat(monthlyDebts) || 0;
    const depositAmount = parseFloat(deposit) || 0;

    if (income) {
      // Typical lending multiplier is 4-4.5x annual income
      const maxBorrowing = income * 4.5;
      
      // Subtract monthly debts impact (approximate 12-month equivalent)
      const debtImpact = debts * 12 * 3;
      const adjustedBorrowing = Math.max(0, maxBorrowing - debtImpact);
      
      // Total buying power with deposit
      const totalBuyingPower = adjustedBorrowing + depositAmount;
      
      // Monthly payment estimate at 5% interest over 25 years
      const monthlyRate = 0.05 / 12;
      const months = 25 * 12;
      const estimatedMonthlyPayment = adjustedBorrowing > 0
        ? (adjustedBorrowing * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
        : 0;

      return {
        maxBorrowing: adjustedBorrowing.toFixed(2),
        totalBuyingPower: totalBuyingPower.toFixed(2),
        estimatedMonthlyPayment: estimatedMonthlyPayment.toFixed(2),
        incomeMultiple: (adjustedBorrowing / income).toFixed(1),
      };
    }

    return null;
  };

  const results = calculated ? calculateCapacity() : null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl text-slate-900 mb-1">Borrowing Capacity Calculator</h2>
              <p className="text-slate-600">Estimate how much you can borrow</p>
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
                <label className="block text-slate-900 mb-2">Annual Income (before tax)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                  <input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50,000"
                  />
                </div>
                <p className="text-sm text-slate-500 mt-1">Include all household income if applying jointly</p>
              </div>

              <div>
                <label className="block text-slate-900 mb-2">Monthly Debt Payments</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                  <input
                    type="number"
                    value={monthlyDebts}
                    onChange={(e) => setMonthlyDebts(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500"
                  />
                </div>
                <p className="text-sm text-slate-500 mt-1">Credit cards, car loans, student loans, etc.</p>
              </div>

              <div>
                <label className="block text-slate-900 mb-2">Available Deposit</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                  <input
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30,000"
                  />
                </div>
                <p className="text-sm text-slate-500 mt-1">Your savings available for deposit</p>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={() => setCalculated(true)}
              disabled={!annualIncome}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DollarSign className="w-5 h-5" />
              Calculate Capacity
            </button>

            {/* Results */}
            {calculated && results && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <div className="flex items-start gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg text-slate-900 mb-1">Your Borrowing Capacity</h3>
                      <p className="text-sm text-slate-600">Based on typical lending criteria</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-700">Maximum Borrowing</span>
                        <span className="text-3xl text-blue-600">£{parseFloat(results.maxBorrowing).toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-slate-600">
                        ({results.incomeMultiple}x your annual income)
                      </div>
                    </div>

                    {parseFloat(deposit) > 0 && (
                      <div className="flex justify-between items-center py-3 border-t border-blue-100">
                        <span className="text-slate-700">Total Buying Power</span>
                        <span className="text-xl text-slate-900">£{parseFloat(results.totalBuyingPower).toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center py-3 border-t border-blue-100">
                      <span className="text-slate-700">Estimated Monthly Payment</span>
                      <span className="text-lg text-slate-900">£{parseFloat(results.estimatedMonthlyPayment).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                  <h4 className="text-slate-900 mb-3">Important Notes</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>This is an estimate only. Actual borrowing capacity depends on lender criteria, credit score, and individual circumstances.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>Monthly payment assumes 5% interest rate over 25 years. Actual rates vary.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>Remember to factor in additional costs: solicitor fees, surveys, stamp duty, and moving costs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>Consider your comfort level with monthly payments and leave room for emergencies.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
