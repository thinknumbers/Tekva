import { useState } from 'react';
import { X, TrendingUp, Calculator } from 'lucide-react';

interface MarketSizeCalculatorProps {
  onClose: () => void;
}

export function MarketSizeCalculator({ onClose }: MarketSizeCalculatorProps) {
  const [method, setMethod] = useState<'topdown' | 'bottomup'>('topdown');
  const [topDownData, setTopDownData] = useState({
    totalMarket: '',
    targetPercentage: '',
  });
  const [bottomUpData, setBottomUpData] = useState({
    targetCustomers: '',
    averageValue: '',
    purchaseFrequency: '',
  });
  const [calculated, setCalculated] = useState(false);

  const calculateTopDown = () => {
    const tam = parseFloat(topDownData.totalMarket);
    const percentage = parseFloat(topDownData.targetPercentage) / 100;
    
    if (tam && percentage) {
      const sam = tam * percentage;
      const som = sam * 0.1; // Assuming 10% of SAM is realistic SOM
      
      return {
        tam: tam.toFixed(0),
        sam: sam.toFixed(0),
        som: som.toFixed(0),
      };
    }
    return null;
  };

  const calculateBottomUp = () => {
    const customers = parseFloat(bottomUpData.targetCustomers);
    const value = parseFloat(bottomUpData.averageValue);
    const frequency = parseFloat(bottomUpData.purchaseFrequency);
    
    if (customers && value && frequency) {
      const annualRevenue = customers * value * frequency;
      const threeYearProjection = annualRevenue * 1.5; // 50% growth assumption
      const fiveYearProjection = annualRevenue * 2.5; // 150% total growth
      
      return {
        year1: annualRevenue.toFixed(0),
        year3: threeYearProjection.toFixed(0),
        year5: fiveYearProjection.toFixed(0),
        averageCustomerValue: (value * frequency).toFixed(0),
      };
    }
    return null;
  };

  const topDownResults = calculated && method === 'topdown' ? calculateTopDown() : null;
  const bottomUpResults = calculated && method === 'bottomup' ? calculateBottomUp() : null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl text-slate-900 mb-1">Market Size Calculator</h2>
              <p className="text-slate-600">Calculate TAM, SAM, and SOM for your venture</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Method Selection */}
            <div>
              <h3 className="text-lg text-slate-900 mb-4">Calculation Method</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setMethod('topdown');
                    setCalculated(false);
                  }}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    method === 'topdown'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <h4 className="text-lg text-slate-900 mb-2">Top-Down Approach</h4>
                  <p className="text-sm text-slate-600">
                    Start with total market size and narrow down to your addressable market
                  </p>
                </button>

                <button
                  onClick={() => {
                    setMethod('bottomup');
                    setCalculated(false);
                  }}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    method === 'bottomup'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <h4 className="text-lg text-slate-900 mb-2">Bottom-Up Approach</h4>
                  <p className="text-sm text-slate-600">
                    Calculate based on target customers and average transaction value
                  </p>
                </button>
              </div>
            </div>

            {/* Top-Down Inputs */}
            {method === 'topdown' && (
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-slate-700">
                    <span className="text-slate-900">TAM (Total Addressable Market):</span> The total market demand for your product/service<br />
                    <span className="text-slate-900">SAM (Serviceable Addressable Market):</span> The segment you can reach<br />
                    <span className="text-slate-900">SOM (Serviceable Obtainable Market):</span> The portion you can realistically capture
                  </p>
                </div>

                <div>
                  <label className="block text-slate-900 mb-2">Total Market Size (TAM)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                    <input
                      type="number"
                      value={topDownData.totalMarket}
                      onChange={(e) => setTopDownData({ ...topDownData, totalMarket: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="1,000,000,000"
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-1">Total market value in £</p>
                </div>

                <div>
                  <label className="block text-slate-900 mb-2">Your Target Market Percentage (SAM)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={topDownData.targetPercentage}
                      onChange={(e) => setTopDownData({ ...topDownData, targetPercentage: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">What % of the total market can you actually serve?</p>
                </div>
              </div>
            )}

            {/* Bottom-Up Inputs */}
            {method === 'bottomup' && (
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-slate-700">
                    Calculate your market size based on realistic customer numbers and transaction values.
                  </p>
                </div>

                <div>
                  <label className="block text-slate-900 mb-2">Target Number of Customers (Year 1)</label>
                  <input
                    type="number"
                    value={bottomUpData.targetCustomers}
                    onChange={(e) => setBottomUpData({ ...bottomUpData, targetCustomers: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1000"
                  />
                  <p className="text-sm text-slate-500 mt-1">How many customers can you realistically acquire?</p>
                </div>

                <div>
                  <label className="block text-slate-900 mb-2">Average Transaction Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                    <input
                      type="number"
                      value={bottomUpData.averageValue}
                      onChange={(e) => setBottomUpData({ ...bottomUpData, averageValue: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="50"
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-1">Average amount per purchase</p>
                </div>

                <div>
                  <label className="block text-slate-900 mb-2">Annual Purchase Frequency</label>
                  <input
                    type="number"
                    step="0.1"
                    value={bottomUpData.purchaseFrequency}
                    onChange={(e) => setBottomUpData({ ...bottomUpData, purchaseFrequency: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="4"
                  />
                  <p className="text-sm text-slate-500 mt-1">How many times per year will customers buy?</p>
                </div>
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={() => setCalculated(true)}
              disabled={
                method === 'topdown'
                  ? !topDownData.totalMarket || !topDownData.targetPercentage
                  : !bottomUpData.targetCustomers || !bottomUpData.averageValue || !bottomUpData.purchaseFrequency
              }
              className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="w-5 h-5" />
              Calculate Market Size
            </button>

            {/* Top-Down Results */}
            {calculated && topDownResults && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border-l-4 border-purple-600">
                  <div className="flex items-start gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg text-slate-900 mb-1">Market Size Analysis</h3>
                      <p className="text-sm text-slate-600">Top-Down Approach</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-700">TAM (Total Addressable Market)</span>
                        <span className="text-2xl text-purple-600">£{parseInt(topDownResults.tam).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-500">The entire market opportunity</p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-700">SAM (Serviceable Addressable Market)</span>
                        <span className="text-xl text-blue-600">£{parseInt(topDownResults.sam).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-500">The segment you can reach ({topDownData.targetPercentage}% of TAM)</p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-700">SOM (Serviceable Obtainable Market)</span>
                        <span className="text-lg text-green-600">£{parseInt(topDownResults.som).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-500">Realistic market capture (10% of SAM)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h4 className="text-slate-900 mb-2">Important Notes</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• SOM represents a conservative 10% capture of your SAM</li>
                    <li>• Use credible sources for TAM data</li>
                    <li>• Be prepared to defend your SAM percentage</li>
                    <li>• Consider geographic and demographic limitations</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Bottom-Up Results */}
            {calculated && bottomUpResults && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border-l-4 border-purple-600">
                  <div className="flex items-start gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg text-slate-900 mb-1">Revenue Projections</h3>
                      <p className="text-sm text-slate-600">Bottom-Up Approach</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-700">Average Customer Value (Annual)</span>
                        <span className="text-xl text-purple-600">£{parseInt(bottomUpResults.averageCustomerValue).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-500">Per customer per year</p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-700">Year 1 Revenue Potential</span>
                        <span className="text-2xl text-blue-600">£{parseInt(bottomUpResults.year1).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-500">Based on {bottomUpData.targetCustomers} customers</p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-700">Year 3 Projection</span>
                        <span className="text-xl text-green-600">£{parseInt(bottomUpResults.year3).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-500">Assuming 50% growth</p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-700">Year 5 Projection</span>
                        <span className="text-lg text-purple-600">£{parseInt(bottomUpResults.year5).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-500">Assuming 150% total growth</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="text-slate-900 mb-2">Growth Strategies to Consider</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Increase customer acquisition rate</li>
                    <li>• Improve customer lifetime value</li>
                    <li>• Expand to new market segments</li>
                    <li>• Introduce premium products/services</li>
                    <li>• Implement referral programs</li>
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
