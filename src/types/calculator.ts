export interface CalculatorInputs {
  principal?: number;
  monthlyInvestment?: number;
  years: number;
  expectedReturn: number;
  inflation?: number;
  targetCorpus?: number;
  currentAge?: number;
  retirementAge?: number;
  monthlyExpenses?: number;
  initialCorpus?: number;
  withdrawalRate?: number;
  goalAmount?: number;
  goalName?: string;
  goalDeadline?: Date;
}

export interface CalculationResult {
  totalInvestment: number;
  totalReturns: number;
  finalAmount: number;
  yearlyProjections: YearlyProjection[];
}

export interface YearlyProjection {
  year: number;
  investment: number;
  returns: number;
  balance: number;
}

export interface TooltipContent {
  title: string;
  description: string;
}