import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react';
import { MarketOverview } from '../components/analytics/MarketOverview';
import { VolumeChart } from '../components/analytics/VolumeChart';
import { TopPerformers } from '../components/analytics/TopPerformers';

export function AnalyticsPage() {
  const marketStats = {
    totalMarketCap: 2400000,
    totalVolume: 156000,
    totalUsers: 12500,
    totalTransactions: 45600
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
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-slate-300">Comprehensive market data and insights</p>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <BarChart3 className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-2xl font-bold text-white">
              ${marketStats.totalMarketCap.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Market Cap</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <TrendingUp className="w-8 h-8 text-teal-400 mb-3" />
            <div className="text-2xl font-bold text-white">
              ${marketStats.totalVolume.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">24h Volume</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <Users className="w-8 h-8 text-green-400 mb-3" />
            <div className="text-2xl font-bold text-white">
              {marketStats.totalUsers.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Active Users</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-2xl font-bold text-white">
              {marketStats.totalTransactions.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Transactions</div>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Market Overview</h2>
            <MarketOverview />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Volume Trends</h2>
            <VolumeChart />
          </motion.div>
        </div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Top Performers</h2>
          <TopPerformers />
        </motion.div>
      </div>
    </div>
  );
}