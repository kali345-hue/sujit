import React, { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Link2, RefreshCw, Ban as Bank, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ConnectedBank {
  id: string;
  name: string;
  type: string;
  connected: boolean;
}

export const BankConnection = () => {
  const [connectedBanks, setConnectedBanks] = useState<ConnectedBank[]>([
    { id: '1', name: 'Demo Bank', type: 'Checking', connected: true },
  ]);
  const [isConnecting, setIsConnecting] = useState(false);

  const onSuccess = useCallback(async (public_token: string) => {
    try {
      setIsConnecting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Simulate bank connection process
      await new Promise(resolve => setTimeout(resolve, 1500));

      setConnectedBanks(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          name: 'New Bank',
          type: 'Checking',
          connected: true,
        },
      ]);

      toast.success('Bank account connected successfully!');
    } catch (error) {
      console.error('Error linking bank:', error);
      toast.error('Failed to connect bank account');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const config = {
    token: null,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const handleDisconnect = async (bankId: string) => {
    try {
      // Simulate disconnection process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnectedBanks(prev => prev.filter(bank => bank.id !== bankId));
      toast.success('Bank disconnected successfully');
    } catch (error) {
      toast.error('Failed to disconnect bank');
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
          <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Connected Banks
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => open()}
          disabled={!ready || isConnecting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isConnecting ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Bank className="w-4 h-4" />
          )}
          {isConnecting ? 'Connecting...' : 'Connect Bank'}
        </motion.button>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence>
          {connectedBanks.map((bank) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Bank className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{bank.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{bank.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDisconnect(bank.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {connectedBanks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center"
          >
            <p className="text-gray-600 dark:text-gray-400">
              No banks connected. Click the button above to connect your first bank.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};