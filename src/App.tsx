import React from 'react';
import { Calculator } from './components/Calculator';
import { Input } from './components/Input';
import {
  calculateSIP,
  calculateLumpsum,
  calculateRetirement,
  calculateSWP,
  calculateGoalBased
} from './utils/calculations';
import { CalculationResult } from './types/calculator';
import { Coins, PiggyBank, Heart, TrendingDown, Target } from 'lucide-react';

const tooltips = {
  monthlyInvestment: {
    title: 'Monthly Investment',
    description: 'The amount you plan to invest each month'
  },
  years: {
    title: 'Investment Period',
    description: 'Duration of your investment in years'
  },
  expectedReturn: {
    title: 'Expected Return',
    description: 'Annual return rate as a percentage'
  },
  principal: {
    title: 'Principal Amount',
    description: 'Initial investment amount'
  },
  currentAge: {
    title: 'Current Age',
    description: 'Your current age in years'
  },
  retirementAge: {
    title: 'Retirement Age',
    description: 'Age at which you plan to retire'
  },
  monthlyExpenses: {
    title: 'Monthly Expenses',
    description: 'Your current monthly expenses'
  },
  currentSavings: {
    title: 'Current Savings',
    description: 'Amount already saved for retirement'
  },
  inflation: {
    title: 'Inflation Rate',
    description: 'Expected annual inflation rate as a percentage'
  },
  corpus: {
    title: 'Initial Corpus',
    description: 'Total amount available for withdrawal'
  },
  withdrawalRate: {
    title: 'Annual Withdrawal Rate',
    description: 'Percentage of corpus to withdraw annually'
  },
  goalAmount: {
    title: 'Goal Amount',
    description: 'Target amount you want to achieve'
  }
};

function App() {
  // SIP Calculator State
  const [sipInputs, setSipInputs] = React.useState({
    monthlyInvestment: 5000,
    years: 10,
    expectedReturn: 12
  });
  const [sipResult, setSipResult] = React.useState<CalculationResult>();

  // Lumpsum Calculator State
  const [lumpsumInputs, setLumpsumInputs] = React.useState({
    principal: 100000,
    years: 10,
    expectedReturn: 12
  });
  const [lumpsumResult, setLumpsumResult] = React.useState<CalculationResult>();

  // Retirement Calculator State
  const [retirementInputs, setRetirementInputs] = React.useState({
    currentAge: 30,
    retirementAge: 60,
    monthlyExpenses: 50000,
    currentSavings: 500000,
    expectedReturn: 12,
    inflation: 6
  });
  const [retirementResult, setRetirementResult] = React.useState<CalculationResult>();

  // SWP Calculator State
  const [swpInputs, setSwpInputs] = React.useState({
    corpus: 10000000,
    withdrawalRate: 4,
    years: 20,
    expectedReturn: 8
  });
  const [swpResult, setSwpResult] = React.useState<CalculationResult>();

  // Goal-based Calculator State
  const [goalInputs, setGoalInputs] = React.useState({
    goalAmount: 1000000,
    years: 5,
    expectedReturn: 12,
    initialInvestment: 100000
  });
  const [goalResult, setGoalResult] = React.useState<CalculationResult>();

  // Calculate results when inputs change
  React.useEffect(() => {
    setSipResult(calculateSIP(
      sipInputs.monthlyInvestment,
      sipInputs.years,
      sipInputs.expectedReturn
    ));
  }, [sipInputs]);

  React.useEffect(() => {
    setLumpsumResult(calculateLumpsum(
      lumpsumInputs.principal,
      lumpsumInputs.years,
      lumpsumInputs.expectedReturn
    ));
  }, [lumpsumInputs]);

  React.useEffect(() => {
    setRetirementResult(calculateRetirement(
      retirementInputs.currentAge,
      retirementInputs.retirementAge,
      retirementInputs.monthlyExpenses,
      retirementInputs.currentSavings,
      retirementInputs.expectedReturn,
      retirementInputs.inflation
    ));
  }, [retirementInputs]);

  React.useEffect(() => {
    setSwpResult(calculateSWP(
      swpInputs.corpus,
      swpInputs.withdrawalRate,
      swpInputs.years,
      swpInputs.expectedReturn
    ));
  }, [swpInputs]);

  React.useEffect(() => {
    setGoalResult(calculateGoalBased(
      goalInputs.goalAmount,
      goalInputs.years,
      goalInputs.expectedReturn,
      goalInputs.initialInvestment
    ));
  }, [goalInputs]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Financial Investment Calculators
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Plan your investments and secure your financial future
          </p>
        </div>

        {/* SIP Calculator */}
        <Calculator
          title="SIP Calculator"
          description="Calculate your wealth with systematic investments"
          result={sipResult}
          tooltips={tooltips}
        >
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <Coins className="w-5 h-5" />
            <span className="font-medium">Systematic Investment Plan</span>
          </div>
          <Input
            label="Monthly Investment (₹)"
            value={sipInputs.monthlyInvestment}
            onChange={(value) => setSipInputs(prev => ({ ...prev, monthlyInvestment: value }))}
            min={500}
            tooltip={tooltips.monthlyInvestment}
          />
          <Input
            label="Investment Period (Years)"
            value={sipInputs.years}
            onChange={(value) => setSipInputs(prev => ({ ...prev, years: value }))}
            min={1}
            max={40}
            tooltip={tooltips.years}
          />
          <Input
            label="Expected Return (%)"
            value={sipInputs.expectedReturn}
            onChange={(value) => setSipInputs(prev => ({ ...prev, expectedReturn: value }))}
            min={1}
            max={30}
            step={0.1}
            tooltip={tooltips.expectedReturn}
          />
        </Calculator>

        {/* Lumpsum Calculator */}
        <Calculator
          title="Lumpsum Calculator"
          description="See how your one-time investment grows"
          result={lumpsumResult}
          tooltips={tooltips}
        >
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <PiggyBank className="w-5 h-5" />
            <span className="font-medium">Lumpsum Investment</span>
          </div>
          <Input
            label="Principal Amount (₹)"
            value={lumpsumInputs.principal}
            onChange={(value) => setLumpsumInputs(prev => ({ ...prev, principal: value }))}
            min={1000}
            tooltip={tooltips.principal}
          />
          <Input
            label="Investment Period (Years)"
            value={lumpsumInputs.years}
            onChange={(value) => setLumpsumInputs(prev => ({ ...prev, years: value }))}
            min={1}
            max={40}
            tooltip={tooltips.years}
          />
          <Input
            label="Expected Return (%)"
            value={lumpsumInputs.expectedReturn}
            onChange={(value) => setLumpsumInputs(prev => ({ ...prev, expectedReturn: value }))}
            min={1}
            max={30}
            step={0.1}
            tooltip={tooltips.expectedReturn}
          />
        </Calculator>

        {/* Retirement Calculator */}
        <Calculator
          title="Retirement Calculator"
          description="Plan for a comfortable retirement"
          result={retirementResult}
          tooltips={tooltips}
        >
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Retirement Planning</span>
          </div>
          <Input
            label="Current Age"
            value={retirementInputs.currentAge}
            onChange={(value) => setRetirementInputs(prev => ({ ...prev, currentAge: value }))}
            min={18}
            max={70}
            tooltip={tooltips.currentAge}
          />
          <Input
            label="Retirement Age"
            value={retirementInputs.retirementAge}
            onChange={(value) => setRetirementInputs(prev => ({ ...prev, retirementAge: value }))}
            min={45}
            max={80}
            tooltip={tooltips.retirementAge}
          />
          <Input
            label="Monthly Expenses (₹)"
            value={retirementInputs.monthlyExpenses}
            onChange={(value) => setRetirementInputs(prev => ({ ...prev, monthlyExpenses: value }))}
            min={10000}
            tooltip={tooltips.monthlyExpenses}
          />
          <Input
            label="Current Savings (₹)"
            value={retirementInputs.currentSavings}
            onChange={(value) => setRetirementInputs(prev => ({ ...prev, currentSavings: value }))}
            min={0}
            tooltip={tooltips.currentSavings}
          />
          <Input
            label="Expected Return (%)"
            value={retirementInputs.expectedReturn}
            onChange={(value) => setRetirementInputs(prev => ({ ...prev, expectedReturn: value }))}
            min={1}
            max={30}
            step={0.1}
            tooltip={tooltips.expectedReturn}
          />
          <Input
            label="Inflation Rate (%)"
            value={retirementInputs.inflation}
            onChange={(value) => setRetirementInputs(prev => ({ ...prev, inflation: value }))}
            min={1}
            max={15}
            step={0.1}
            tooltip={tooltips.inflation}
          />
        </Calculator>

        {/* SWP Calculator */}
        <Calculator
          title="SWP Calculator"
          description="Plan your systematic withdrawals"
          result={swpResult}
          tooltips={tooltips}
        >
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <TrendingDown className="w-5 h-5" />
            <span className="font-medium">Systematic Withdrawal Plan</span>
          </div>
          <Input
            label="Initial Corpus (₹)"
            value={swpInputs.corpus}
            onChange={(value) => setSwpInputs(prev => ({ ...prev, corpus: value }))}
            min={100000}
            tooltip={tooltips.corpus}
          />
          <Input
            label="Annual Withdrawal Rate (%)"
            value={swpInputs.withdrawalRate}
            onChange={(value) => setSwpInputs(prev => ({ ...prev, withdrawalRate: value }))}
            min={1}
            max={20}
            step={0.1}
            tooltip={tooltips.withdrawalRate}
          />
          <Input
            label="Time Period (Years)"
            value={swpInputs.years}
            onChange={(value) => setSwpInputs(prev => ({ ...prev, years: value }))}
            min={1}
            max={40}
            tooltip={tooltips.years}
          />
          <Input
            label="Expected Return (%)"
            value={swpInputs.expectedReturn}
            onChange={(value) => setSwpInputs(prev => ({ ...prev, expectedReturn: value }))}
            min={1}
            max={30}
            step={0.1}
            tooltip={tooltips.expectedReturn}
          />
        </Calculator>

        {/* Goal-based Calculator */}
        <Calculator
          title="Goal-based Calculator"
          description="Plan for your financial goals"
          result={goalResult}
          tooltips={tooltips}
        >
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <Target className="w-5 h-5" />
            <span className="font-medium">Goal-based Investment</span>
          </div>
          <Input
            label="Goal Amount (₹)"
            value={goalInputs.goalAmount}
            onChange={(value) => setGoalInputs(prev => ({ ...prev, goalAmount: value }))}
            min={10000}
            tooltip={tooltips.goalAmount}
          />
          <Input
            label="Initial Investment (₹)"
            value={goalInputs.initialInvestment}
            onChange={(value) => setGoalInputs(prev => ({ ...prev, initialInvestment: value }))}
            min={0}
            tooltip={tooltips.principal}
          />
          <Input
            label="Time to Goal (Years)"
            value={goalInputs.years}
            onChange={(value) => setGoalInputs(prev => ({ ...prev, years: value }))}
            min={1}
            max={40}
            tooltip={tooltips.years}
          />
          <Input
            label="Expected Return (%)"
            value={goalInputs.expectedReturn}
            onChange={(value) => setGoalInputs(prev => ({ ...prev, expectedReturn: value }))}
            min={1}
            max={30}
            step={0.1}
            tooltip={tooltips.expectedReturn}
          />
        </Calculator>
      </div>
    </div>
  );
}

export default App;
