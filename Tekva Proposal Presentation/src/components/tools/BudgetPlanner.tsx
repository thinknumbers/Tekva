import { useState } from 'react';
import { X, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';

interface BudgetPlannerProps {
  onClose: () => void;
}

export function BudgetPlanner({ onClose }: BudgetPlannerProps) {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState({
    housing: '',
    utilities: '',
    food: '',
    transport: '',
    healthcare: '',
    education: '',
    other: '',
  });
  const [aiAdvice, setAiAdvice] = useState('');
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    const totalIncome = parseFloat(income) || 0;
    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    const remaining = totalIncome - totalExpenses;
    
    let advice = '';
    if (remaining > 0) {
      const savingsRate = (remaining / totalIncome) * 100;
      advice = `Great job! You have £${remaining.toFixed(2)} remaining each month (${savingsRate.toFixed(1)}% savings rate). `;
      
      if (savingsRate > 20) {
        advice += "You're doing excellent with your savings! Consider setting up automatic transfers to a savings account or investment fund.";
      } else if (savingsRate > 10) {
        advice += "You have a healthy savings rate. Try to gradually increase it to 20% for better financial security.";
      } else {
        advice += "Consider looking for areas where you can reduce expenses to increase your savings rate to at least 10-20%.";
      }
    } else if (remaining === 0) {
      advice = "You're breaking even. This is a good start, but it's important to build savings. Look for areas to reduce expenses even slightly.";
    } else {
      advice = `Warning: You're spending £${Math.abs(remaining).toFixed(2)} more than you earn each month. This is not sustainable. Priority areas to review: `;
      const expenseEntries = Object.entries(expenses).map(([key, val]) => ({ key, val: parseFloat(val) || 0 }));
      expenseEntries.sort((a, b) => b.val - a.val);
      advice += expenseEntries.slice(0, 2).map(e => e.key).join(' and ') + '.';
    }
    
    setAiAdvice(advice);
    setCalculated(true);
  };

  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const remaining = (parseFloat(income) || 0) - totalExpenses;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl text-slate-900 mb-1">AI Budget Planner</h2>
              <p className="text-slate-600">Get personalized budgeting advice</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Income */}
            <div>
              <label className="block text-slate-900 mb-2">Monthly Income (after tax)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Expenses */}
            <div>
              <h3 className="text-lg text-slate-900 mb-4">Monthly Expenses</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.keys(expenses).map((key) => (
                  <div key={key}>
                    <label className="block text-slate-700 mb-2 capitalize">{key}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                      <input
                        type="number"
                        value={expenses[key as keyof typeof expenses]}
                        onChange={(e) => setExpenses({ ...expenses, [key]: e.target.value })}
                        className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Total Income:</span>
                <span className="text-lg text-slate-900">£{(parseFloat(income) || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Total Expenses:</span>
                <span className="text-lg text-slate-900">£{totalExpenses.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-300 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-900">Remaining:</span>
                  <span className={`text-xl ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    £{remaining.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Get AI Budget Advice
            </button>

            {/* AI Advice */}
            {calculated && aiAdvice && (
              <div className={`rounded-lg p-6 border-l-4 ${
                remaining >= 0 ? 'bg-green-50 border-green-600' : 'bg-amber-50 border-amber-600'
              }`}>
                <div className="flex gap-3">
                  {remaining >= 0 ? (
                    <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="text-lg text-slate-900 mb-2">AI Budget Analysis</h3>
                    <p className="text-slate-700 leading-relaxed">{aiAdvice}</p>
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
