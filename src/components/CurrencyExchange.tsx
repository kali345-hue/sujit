import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CurrencyExchange = () => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [amount, setAmount] = useState('1');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  useEffect(() => {
    fetchRates();
  }, [baseCurrency]);

  const fetchRates = async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const mockRates = {
        EUR: 0.92,
        GBP: 0.79,
        JPY: 150.25,
        CAD: 1.35,
        AUD: 1.52,
        USD: 1,
      };
      setRates(mockRates);
    } catch (error) {
      console.error('Error fetching rates:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Currency Exchange
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={fetchRates}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Base Currency
            </label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        <div className="mt-6 space-y-2">
          <AnimatePresence>
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-600 dark:text-gray-400 py-4"
              >
                <RefreshCw className="w-6 h-6 animate-spin mx-auto" />
              </motion.div>
            ) : (
              currencies
                .filter((currency) => currency !== baseCurrency)
                .map((currency) => (
                  <motion.div
                    key={currency}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {currency}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {(Number(amount) * (rates[currency] || 0)).toFixed(2)}
                    </span>
                  </motion.div>
                ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};