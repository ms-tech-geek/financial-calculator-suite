import React from 'react';
import { Info } from 'lucide-react';
import { TooltipContent } from '../types/calculator';

interface InputProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  tooltip?: TooltipContent;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  tooltip
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {tooltip && (
          <div className="group relative">
            <Info className="w-4 h-4 text-blue-500 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 z-10">
              <p className="font-medium">{tooltip.title}</p>
              <p className="text-xs mt-1 text-gray-300">{tooltip.description}</p>
            </div>
          </div>
        )}
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min={min}
        max={max}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};