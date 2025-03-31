import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';
import { CalculationResult, TooltipContent } from '../types/calculator';

interface CalculatorProps {
  title: string;
  description: string;
  children: React.ReactNode;
  result?: CalculationResult;
  tooltips: Record<string, TooltipContent>;
}

export const Calculator: React.FC<CalculatorProps> = ({
  title,
  description,
  children,
  result,
  tooltips
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-blue-100 mt-1">{description}</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {children}
          </div>
          
          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Total Investment</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(result.totalInvestment)}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Total Returns</p>
                  <p className="text-xl font-bold text-green-900">
                    {formatCurrency(result.totalReturns)}
                  </p>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.yearlyProjections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="investment" 
                      stroke="#2563eb" 
                      name="Investment"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="returns" 
                      stroke="#16a34a" 
                      name="Returns"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};