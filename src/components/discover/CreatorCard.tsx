import React from 'react';
import { TrendingUp, TrendingDown, Users, ExternalLink } from 'lucide-react';

interface Creator {
  id: number;
  name: string;
  username: string;
  category: string;
  coinSymbol: string;
  price: number;
  change: number;
  marketCap: number;
  holders: number;
  description: string;
  avatar: string;
  featured?: boolean;
}

interface CreatorCardProps {
  creator: Creator;
  featured?: boolean;
}

export function CreatorCard({ creator, featured = false }: CreatorCardProps) {
  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-200 ${
      featured ? 'lg:flex lg:items-center lg:space-x-6' : ''
    }`}>
      <div className={`flex items-center space-x-4 ${featured ? 'lg:flex-shrink-0' : 'mb-4'}`}>
        <img
          src={creator.avatar}
          alt={creator.name}
          className={`rounded-full object-cover ${featured ? 'w-16 h-16' : 'w-12 h-12'}`}
        />
        <div>
          <h3 className={`font-semibold text-white ${featured ? 'text-xl' : 'text-lg'}`}>
            {creator.name}
          </h3>
          <p className="text-slate-400 text-sm">{creator.username}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs bg-slate-700/50 px-2 py-1 rounded-full text-slate-300">
              {creator.category}
            </span>
            <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full">
              {creator.coinSymbol}
            </span>
          </div>
        </div>
      </div>

      <div className={`flex-1 ${featured ? 'lg:ml-6' : ''}`}>
        <p className="text-slate-300 text-sm mb-4">{creator.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-bold ${featured ? 'text-xl' : ''} text-white`}>
                ${creator.price.toFixed(3)}
              </span>
              <div className={`flex items-center space-x-1 ${
                creator.change > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {creator.change > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm">{Math.abs(creator.change)}%</span>
              </div>
            </div>
            <div className="text-slate-400 text-xs">Price</div>
          </div>

          <div>
            <div className={`font-semibold ${featured ? 'text-lg' : ''} text-white`}>
              ${creator.marketCap.toLocaleString()}
            </div>
            <div className="text-slate-400 text-xs">Market Cap</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">{creator.holders} holders</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Trade
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-slate-300 p-2 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}