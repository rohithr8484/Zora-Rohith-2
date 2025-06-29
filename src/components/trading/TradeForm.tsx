import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface TradeFormProps {
  coin: {
    symbol: string;
    name: string;
    price: number;
  };
}

export function TradeForm({ coin }: TradeFormProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Trade {coin.symbol}</h3>
      
      {/* Trade Type Toggle */}
      <div className="flex rounded-lg bg-slate-900/50 p-1 mb-4">
        <button
          onClick={() => setTradeType('buy')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            tradeType === 'buy'
              ? 'bg-green-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setTradeType('sell')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            tradeType === 'sell'
              ? 'bg-red-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sell
        </button>
      </div>

      {/* Order Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Order Type
        </label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value as 'market' | 'limit')}
          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
        >
          <option value="market">Market</option>
          <option value="limit">Limit</option>
        </select>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Amount
        </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Current Price */}
      <div className="mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Current Price:</span>
          <span className="text-white">${coin.price.toFixed(3)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Estimated Total:</span>
          <span className="text-white">
            ${amount ? (parseFloat(amount) * coin.price).toFixed(3) : '0.000'}
          </span>
        </div>
      </div>

      {/* Trade Button */}
      <button
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          tradeType === 'buy'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {tradeType === 'buy' ? 'Buy' : 'Sell'} {coin.symbol}
      </button>

      {/* V4 Features Info */}
      <div className="mt-4 p-3 bg-purple-600/10 border border-purple-500/30 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <ArrowUpDown className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">V4 Features Active</span>
        </div>
        <div className="text-xs text-slate-400">
          Dynamic fees, multi-hop routing, and creator rewards enabled
        </div>
      </div>
    </div>
  );
}