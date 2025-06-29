import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpDown, Zap, Target, DollarSign } from 'lucide-react';
import { TradingChart } from '../components/trading/TradingChart';
import { OrderBook } from '../components/trading/OrderBook';
import { TradeForm } from '../components/trading/TradeForm';
import { RecentTrades } from '../components/trading/RecentTrades';

export function TradePage() {
  const [selectedCoin, setSelectedCoin] = useState({
    symbol: 'ARTIST',
    name: 'Artist Creator Coin',
    price: 0.045,
    change: 12.5,
    volume: 45000
  });

  const topCoins = [
    { symbol: 'ARTIST', name: 'Artist Creator', price: 0.045, change: 12.5, volume: 45000 },
    { symbol: 'MUSIC', name: 'Music Maker', price: 0.032, change: -3.2, volume: 32000 },
    { symbol: 'WRITE', name: 'Writer Coin', price: 0.078, change: 8.7, volume: 28000 },
    { symbol: 'PHOTO', name: 'Photographer', price: 0.021, change: 15.3, volume: 19000 },
  ];

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
          <h1 className="text-3xl font-bold text-white mb-2">Advanced Trading</h1>
          <p className="text-slate-300">Trade creator coins with Uniswap V4 features</p>
        </motion.div>

        {/* Top Coins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCoins.map((coin, index) => (
              <div
                key={coin.symbol}
                onClick={() => setSelectedCoin(coin)}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border cursor-pointer transition-all duration-200 ${
                  selectedCoin.symbol === coin.symbol
                    ? 'border-purple-500 bg-slate-800/70'
                    : 'border-slate-700/50 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{coin.symbol}</span>
                  <div className={`flex items-center space-x-1 ${
                    coin.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {coin.change > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm">{Math.abs(coin.change)}%</span>
                  </div>
                </div>
                <div className="text-sm text-slate-400 mb-1">{coin.name}</div>
                <div className="text-lg font-bold text-white">${coin.price.toFixed(3)}</div>
                <div className="text-xs text-slate-500">Vol: ${coin.volume.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Trading Interface */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart and Order Book */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedCoin.name}</h2>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-2xl font-bold text-white">
                      ${selectedCoin.price.toFixed(3)}
                    </span>
                    <div className={`flex items-center space-x-1 ${
                      selectedCoin.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedCoin.change > 0 ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                      <span>{Math.abs(selectedCoin.change)}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-lg text-sm">
                    V4 Pool
                  </div>
                  <div className="bg-teal-600/20 text-teal-400 px-3 py-1 rounded-lg text-sm">
                    Multi-Hop
                  </div>
                </div>
              </div>
              <TradingChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
            >
              <OrderBook />
            </motion.div>
          </div>

          {/* Trading Form and Recent Trades */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
            >
              <TradeForm coin={selectedCoin} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
            >
              <RecentTrades />
            </motion.div>
          </div>
        </div>

        {/* V4 Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <Zap className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Dynamic Fees</h3>
            <p className="text-slate-300 text-sm">
              Optimize trading costs with V4's dynamic fee structure
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <Target className="w-8 h-8 text-teal-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Multi-Hop Rewards</h3>
            <p className="text-slate-300 text-sm">
              Earn rewards through complex swap paths and routing
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <DollarSign className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Creator Rewards</h3>
            <p className="text-slate-300 text-sm">
              Support creators while earning trading rewards
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}