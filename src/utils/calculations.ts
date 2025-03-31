export const calculateSIP = (
  monthlyInvestment: number,
  years: number,
  expectedReturn: number
): CalculationResult => {
  const monthlyRate = expectedReturn / (12 * 100);
  const months = years * 12;
  const yearlyProjections: YearlyProjection[] = [];
  let totalInvestment = 0;
  let currentBalance = 0;

  for (let year = 1; year <= years; year++) {
    const yearStart = currentBalance;
    for (let month = 1; month <= 12; month++) {
      currentBalance = (currentBalance + monthlyInvestment) * (1 + monthlyRate);
      totalInvestment += monthlyInvestment;
    }
    
    yearlyProjections.push({
      year,
      investment: totalInvestment,
      returns: currentBalance - totalInvestment,
      balance: currentBalance
    });
  }

  return {
    totalInvestment,
    totalReturns: currentBalance - totalInvestment,
    finalAmount: currentBalance,
    yearlyProjections
  };
};

export const calculateLumpsum = (
  principal: number,
  years: number,
  expectedReturn: number
): CalculationResult => {
  const yearlyRate = expectedReturn / 100;
  const yearlyProjections: YearlyProjection[] = [];
  let currentBalance = principal;

  for (let year = 1; year <= years; year++) {
    currentBalance = currentBalance * (1 + yearlyRate);
    yearlyProjections.push({
      year,
      investment: principal,
      returns: currentBalance - principal,
      balance: currentBalance
    });
  }

  return {
    totalInvestment: principal,
    totalReturns: currentBalance - principal,
    finalAmount: currentBalance,
    yearlyProjections
  };
};

export const calculateRetirement = (
  currentAge: number,
  retirementAge: number,
  monthlyExpenses: number,
  currentSavings: number,
  expectedReturn: number,
  inflation: number
): CalculationResult => {
  const years = retirementAge - currentAge;
  const inflationAdjustedReturn = ((1 + expectedReturn / 100) / (1 + inflation / 100) - 1) * 100;
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflation / 100, years);
  const requiredCorpus = futureMonthlyExpenses * 12 * 25; // 25 years post retirement
  
  // Calculate required monthly investment
  const monthlyRate = inflationAdjustedReturn / (12 * 100);
  const months = years * 12;
  const PMT = (requiredCorpus - currentSavings * Math.pow(1 + monthlyRate, months)) 
              / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return calculateSIP(PMT, years, inflationAdjustedReturn);
};

export const calculateSWP = (
  corpus: number,
  withdrawalRate: number,
  years: number,
  expectedReturn: number
): CalculationResult => {
  const monthlyRate = expectedReturn / (12 * 100);
  const monthlyWithdrawal = (corpus * withdrawalRate) / (12 * 100);
  const yearlyProjections: YearlyProjection[] = [];
  let currentBalance = corpus;
  let totalWithdrawn = 0;

  for (let year = 1; year <= years; year++) {
    const yearStart = currentBalance;
    for (let month = 1; month <= 12; month++) {
      currentBalance = (currentBalance - monthlyWithdrawal) * (1 + monthlyRate);
      totalWithdrawn += monthlyWithdrawal;
    }
    
    yearlyProjections.push({
      year,
      investment: corpus,
      returns: currentBalance - (corpus - totalWithdrawn),
      balance: currentBalance
    });
  }

  return {
    totalInvestment: corpus,
    totalReturns: currentBalance - (corpus - totalWithdrawn),
    finalAmount: currentBalance,
    yearlyProjections
  };
};

export const calculateGoalBased = (
  goalAmount: number,
  years: number,
  expectedReturn: number,
  initialInvestment: number = 0
): CalculationResult => {
  const monthlyRate = expectedReturn / (12 * 100);
  const months = years * 12;
  
  // Calculate required monthly investment using PMT formula
  const PMT = (goalAmount - initialInvestment * Math.pow(1 + monthlyRate, months)) 
              / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return calculateSIP(PMT, years, expectedReturn);
};