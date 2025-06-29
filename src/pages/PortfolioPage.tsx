import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, Activity, DollarSign } from 'lucide-react';
import { PortfolioChart } from '../components/portfolio/PortfolioChart';
import { HoldingsTable } from '../components/portfolio/HoldingsTable';

export function PortfolioPage() {
  const portfolioStats = {
    totalValue: 1247.89,
    totalChange: 8.7,
    totalVolume: 45600,
    activePositions: 8
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
          <p className="text-slate-300">Track your creator coin investments and performance</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-8 h-8 text-purple-400" />
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{portfolioStats.totalChange}%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              ${portfolioStats.totalValue.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Total Value</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <Activity className="w-8 h-8 text-teal-400 mb-2" />
            <div className="text-2xl font-bold text-white">
              {portfolioStats.activePositions}
            </div>
            <div className="text-slate-400 text-sm">Active Positions</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <DollarSign className="w-8 h-8 text-green-400 mb-2" />
            <div className="text-2xl font-bold text-white">
              ${portfolioStats.totalVolume.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Total Volume</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <TrendingUp className="w-8 h-8 text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-white">
              +${(portfolioStats.totalValue * portfolioStats.totalChange / 100).toFixed(2)}
            </div>
            <div className="text-slate-400 text-sm">Total P&L</div>
          </div>
        </motion.div>

        {/* Portfolio Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Portfolio Performance</h2>
          <PortfolioChart />
        </motion.div>

        {/* Holdings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Your Holdings</h2>
          <HoldingsTable />
        </motion.div>
      </div>
    </div>
  );
}