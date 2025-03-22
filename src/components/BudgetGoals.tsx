import React, { useState } from 'react';
import { Target, AlertCircle } from 'lucide-react';

interface BudgetGoal {
  category: string;
  limit: number;
  spent: number;
}

export const BudgetGoals = () => {
  const [goals] = useState<BudgetGoal[]>([
    { category: 'Food', limit: 500, spent: 350 },
    { category: 'Entertainment', limit: 200, spent: 180 },
    { category: 'Transport', limit: 300, spent: 150 },
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Budget Goals</h2>
      </div>
      <div className="space-y-4">
        {goals.map((goal) => {
          const percentage = (goal.spent / goal.limit) * 100;
          const isNearLimit = percentage >= 90;
          
          return (
            <div key={goal.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {goal.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${goal.spent} / ${goal.limit}
                  </span>
                  {isNearLimit && (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isNearLimit ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};