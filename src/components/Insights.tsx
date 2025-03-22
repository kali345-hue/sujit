import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const Insights = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Financial Insights</h2>
      </div>
      <div className="space-y-4">
        <InsightCard
          title="Highest Expense Category"
          value="Food"
          change={12}
          description="12% higher than last month"
        />
        <InsightCard
          title="Savings Rate"
          value="25%"
          change={5}
          description="5% improvement from previous month"
          positive
        />
        <InsightCard
          title="Monthly Spending"
          value="$2,450"
          change={8}
          description="8% decrease from average"
          positive
        />
      </div>
    </div>
  );
};

interface InsightCardProps {
  title: string;
  value: string;
  change: number;
  description: string;
  positive?: boolean;
}

const InsightCard = ({ title, value, change, description, positive }: InsightCardProps) => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        <div className={`flex items-center ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{change}%</span>
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};