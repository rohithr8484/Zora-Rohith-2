import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function HoldingsTable() {
  const holdings = [
    {
      symbol: 'ARTIST',
      name: 'Artist Creator Coin',
      amount: 1200,
      price: 0.045,
      value: 54,
      change: 12.5,
      pnl: 6.75
    },
    {
      symbol: 'MUSIC',
      name: 'Music Maker',
      amount: 850,
      price: 0.032,
      value: 27.2,
      change: -3.2,
      pnl: -0.87
    },
    {
      symbol: 'WRITE',
      name: 'Writer Coin',
      amount: 950,
      price: 0.078,
      value: 74.1,
      change: 8.7,
      pnl: 6.44
    },
    {
      symbol: 'PHOTO',
      name: 'Photographer',
      amount: 680,
      price: 0.021,
      value: 14.28,
      change: 15.3,
      pnl: 2.18
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-3 text-sm font-medium text-slate-300">Coin</th>
            <th className="text-right py-3 text-sm font-medium text-slate-300">Amount</th>
            <th className="text-right py-3 text-sm font-medium text-slate-300">Price</th>
            <th className="text-right py-3 text-sm font-medium text-slate-300">Value</th>
            <th className="text-right py-3 text-sm font-medium text-slate-300">24h Change</th>
            <th className="text-right py-3 text-sm font-medium text-slate-300">P&L</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.symbol} className="border-b border-slate-700/50">
              <td className="py-4">
                <div>
                  <div className="font-medium text-white">{holding.symbol}</div>
                  <div className="text-sm text-slate-400">{holding.name}</div>
                </div>
              </td>
              <td className="text-right py-4 text-white">
                {holding.amount.toLocaleString()}
              </td>
              <td className="text-right py-4 text-white">
                ${holding.price.toFixed(3)}
              </td>
              <td className="text-right py-4 text-white">
                ${holding.value.toFixed(2)}
              </td>
              <td className="text-right py-4">
                <div className={`flex items-center justify-end space-x-1 ${
                  holding.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {holding.change > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(holding.change)}%</span>
                </div>
              </td>
              <td className="text-right py-4">
                <span className={`font-medium ${
                  holding.pnl > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {holding.pnl > 0 ? '+' : ''}${holding.pnl.toFixed(2)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}