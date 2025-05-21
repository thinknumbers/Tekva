
import React, { useState }
from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { IconCreditEngine, IconPlay, IconDocumentText } from '../constants';
import { useTheme } from '../contexts/ThemeContext';

interface SimulationParams {
  dealAmount: string;
  assetType: string;
  originatorRating: string;
  loanTerm: string;
}

interface SimulationResult {
  riskScore: number;
  confidence: string;
  recommendedRate: string;
  keyFactors: string[];
  assessmentId: string;
}

const CreditEnginePage: React.FC = () => {
  const { primaryColor } = useTheme();
  const [params, setParams] = useState<SimulationParams>({
    dealAmount: '20000000',
    assetType: 'Auto Loans',
    originatorRating: 'A+',
    loanTerm: '5'
  });
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const runSimulation = () => {
    setIsLoading(true);
    setResult(null);
    // Mock API call
    setTimeout(() => {
      setResult({
        riskScore: parseFloat((Math.random() * 4 + 5).toFixed(1)), // Score between 5.0 and 9.0
        confidence: ['High', 'Medium', 'High'][Math.floor(Math.random()*3)],
        recommendedRate: (parseFloat(params.loanTerm) * 0.5 + Math.random() * 2 + 3).toFixed(2) + '%',
        keyFactors: [
          'Originator financial stability',
          'Historical performance of similar assets',
          `Current market conditions for ${params.assetType}`,
          'Loan term vs. asset lifecycle'
        ],
        assessmentId: `CEA-${Date.now().toString().slice(-6)}`
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Credit Engine Console</h1>
        <Button variant="outline" leftIcon={<IconCreditEngine className="w-4 h-4" />}>
          Model v2.3 Active
        </Button>
      </div>

      <Card title="Eldium Proprietary Credit Assessment" titleSize="lg">
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Leverage Eldium's advanced, AI-powered credit assessment models to evaluate deal risk and make informed lending decisions. 
            Our models analyze a multitude of factors to provide a comprehensive risk profile, ensuring superior credit assessment and robust oversight.
            This simulation tool allows for preliminary assessment based on key deal parameters.
          </p>
           <div className="p-3 bg-primary-light/10 dark:bg-primary-dark/10 border-l-4 border-primary rounded-md">
                <p className="text-sm text-primary dark:text-primary-light font-medium">
                    Intellectual Property: The methodologies, algorithms, and data weightings used by the Eldium Credit Engine are proprietary and form a core part of Eldium's competitive advantage.
                </p>
            </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Run New Assessment Simulation">
          <form className="space-y-4 p-1">
            <div>
              <label htmlFor="dealAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deal Amount (AUD)</label>
              <input type="number" name="dealAmount" id="dealAmount" value={params.dealAmount} onChange={handleParamChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700" />
            </div>
            <div>
              <label htmlFor="assetType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary Asset Type</label>
              <select name="assetType" id="assetType" value={params.assetType} onChange={handleParamChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700">
                <option>Auto Loans</option>
                <option>Equipment Leases</option>
                <option>Residential Mortgages</option>
                <option>SME Loans</option>
                <option>Consumer Credit</option>
              </select>
            </div>
            <div>
              <label htmlFor="originatorRating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Originator Credit Rating (Indicative)</label>
              <input type="text" name="originatorRating" id="originatorRating" value={params.originatorRating} onChange={handleParamChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700" />
            </div>
             <div>
              <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Average Loan Term (Years)</label>
              <input type="number" name="loanTerm" id="loanTerm" value={params.loanTerm} onChange={handleParamChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700" />
            </div>
            <Button type="button" variant="primary" onClick={runSimulation} disabled={isLoading} leftIcon={isLoading ? null : <IconPlay className="w-4 h-4" />}>
              {isLoading ? 'Assessing...' : 'Run Assessment'}
            </Button>
          </form>
        </Card>

        {isLoading && (
            <Card title="Assessment in Progress...">
                <div className="p-4 flex flex-col items-center justify-center h-full">
                    <IconCreditEngine className="w-16 h-16 text-primary animate-pulse" />
                    <p className="mt-4 text-gray-600 dark:text-gray-300">Analyzing parameters and generating risk profile...</p>
                </div>
            </Card>
        )}

        {result && !isLoading && (
          <Card title={`Simulation Result (ID: ${result.assessmentId})`} titleClassName="bg-green-50 dark:bg-green-900/50">
            <div className="p-4 space-y-3">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Eldium Risk Score</p>
                <p className="text-5xl font-bold" style={{ color: primaryColor }}>{result.riskScore.toFixed(1)}<span className="text-2xl text-gray-600 dark:text-gray-300">/10</span></p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Confidence Level: <span className="font-medium text-gray-700 dark:text-gray-200">{result.confidence}</span></p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Recommended Indicative Rate:</p>
                <p className="text-lg text-gray-900 dark:text-white">{result.recommendedRate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Influencing Factors:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 mt-1">
                  {result.keyFactors.map(factor => <li key={factor}>{factor}</li>)}
                </ul>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                 <p className="text-xs text-gray-500 dark:text-gray-400">Disclaimer: This is a simulated assessment based on limited parameters. A full assessment involves comprehensive data ingestion and analysis.</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Card title="Model Management & Governance (Placeholder)">
        <div className="p-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
                This section would provide details on the current model version, last calibration date, performance monitoring, and governance workflows.
                It ensures transparency and adherence to regulatory requirements for model risk management.
            </p>
            <div className="flex space-x-2">
                <Button variant="outline" size="sm" leftIcon={<IconDocumentText className="w-4 h-4"/>}>View Model Documentation</Button>
                <Button variant="outline" size="sm">Audit Trail (Mock)</Button>
            </div>
        </div>
      </Card>

    </div>
  );
};

export default CreditEnginePage;
