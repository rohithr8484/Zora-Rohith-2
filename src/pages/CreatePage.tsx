import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Zap, Target, Users } from 'lucide-react';
import { CreateCoinForm } from '../components/create/CreateCoinForm';

export function CreatePage() {
  const features = [
    {
      icon: Coins,
      title: 'Instant Deployment',
      description: 'Deploy your coin to Uniswap V4 pools instantly'
    },
    {
      icon: Zap,
      title: 'Advanced Features',
      description: 'Leverage V4\'s dynamic fees and multi-position liquidity'
    },
    {
      icon: Target,
      title: 'Creator Rewards',
      description: 'Earn from trading activity and supporter engagement'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Build a loyal community of supporters and traders'
    }
  ];

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Launch Your Creator Coin
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Create and deploy your own creator coin with advanced Uniswap V4 features. 
            Start building your community and earning rewards today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Why Create on Zora Coins?
              </h2>
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600/20 to-teal-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">
                Deployment Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Network:</span>
                  <span className="text-white">Base Mainnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pool Version:</span>
                  <span className="text-white">Uniswap V4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Initial Liquidity:</span>
                  <span className="text-white">0.1 ETH minimum</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Factory Address:</span>
                  <span className="text-white font-mono text-xs">0x777...45baF3</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CreateCoinForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}