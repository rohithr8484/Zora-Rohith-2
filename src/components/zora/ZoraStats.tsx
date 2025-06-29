import React from 'react';
import { TrendingUp, Users, Coins, Activity } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function ZoraStats() {
  const stats: StatItem[] = [
    {
      label: 'Total Volume',
      value: '1,247 ETH',
      change: '+12.5%',
      icon: TrendingUp
    },
    {
      label: 'Active Creators',
      value: '2,891',
      change: '+8.2%',
      icon: Users
    },
    {
      label: 'NFTs Minted',
      value: '45,672',
      change: '+15.3%',
      icon: Coins
    },
    {
      label: 'Daily Transactions',
      value: '1,234',
      change: '+5.7%',
      icon: Activity
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon className="w-8 h-8 text-purple-400" />
              {stat.change && (
                <span className="text-green-400 text-sm font-medium">
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-slate-400 text-sm">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}