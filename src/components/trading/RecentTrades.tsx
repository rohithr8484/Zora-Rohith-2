import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function RecentTrades() {
  const trades = [
    { type: 'buy', price: 0.0451, amount: 1200, time: '14:32:15' },
    { type: 'sell', price: 0.0449, amount: 850, time: '14:31:42' },
    { type: 'buy', price: 0.0450, amount: 950, time: '14:30:18' },
    { type: 'buy', price: 0.0448, amount: 1100, time: '14:29:55' },
    { type: 'sell', price: 0.0447, amount: 750, time: '14:28:33' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
      <div className="space-y-2">
        {trades.map((trade, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700/50">
            <div className="flex items-center space-x-2">
              {trade.type === 'buy' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm font-medium ${
                trade.type === 'buy' ? 'text-green-400' : 'text-red-400'
              }`}>
                {trade.type.toUpperCase()}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-white">{trade.price.toFixed(4)}</div>
              <div className="text-xs text-slate-400">{trade.amount}</div>
            </div>
            <div className="text-xs text-slate-500">{trade.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}