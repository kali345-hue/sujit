import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L14.586 14.586C15.367 15.367 16.633 15.367 17.414 14.586L20 12"
          className="stroke-blue-600 dark:stroke-blue-400"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 7L12 3L16 7"
          className="stroke-blue-600 dark:stroke-blue-400"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white"> Finance Tracker</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Making Tomorrow better</p>
      </div>
    </div>
  );
};