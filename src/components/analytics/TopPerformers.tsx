import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function TopPerformers() {
  const performers = [
    { symbol: 'PHOTO', name: 'Photographer', change: 15.3, volume: 19000 },
    { symbol: 'ARTIST', name: 'Artist Creator', change: 12.5, volume: 45000 },
    { symbol: 'WRITE', name: 'Writer Coin', change: 8.7, volume: 28000 },
    { symbol: 'GAME', name: 'Game Creator', change: 6.2, volume: 15000 },
    { symbol: 'MUSIC', name: 'Music Maker', change: -3.2, volume: 32000 },
  ];

  return (
    <div className="space-y-4">
      {performers.map((performer, index) => (
        <div key={performer.symbol} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            <div>
              <div className="font-medium text-white">{performer.symbol}</div>
              <div className="text-sm text-slate-400">{performer.name}</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`flex items-center space-x-1 ${
              performer.change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {performer.change > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">{Math.abs(performer.change)}%</span>
            </div>
            <div className="text-sm text-slate-400">
              Vol: ${performer.volume.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}