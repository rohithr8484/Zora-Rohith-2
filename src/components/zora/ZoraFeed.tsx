import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, ExternalLink } from 'lucide-react';

interface FeedItem {
  id: string;
  type: 'mint' | 'sale' | 'like' | 'comment';
  user: {
    name: string;
    avatar: string;
    address: string;
  };
  nft?: {
    name: string;
    image: string;
    contractAddress: string;
    tokenId: string;
  };
  action: string;
  timestamp: string;
  price?: string;
}

interface ZoraFeedProps {
  items: FeedItem[];
}

export function ZoraFeed({ items }: ZoraFeedProps) {
  const getActionColor = (type: string) => {
    switch (type) {
      case 'mint': return 'text-green-400';
      case 'sale': return 'text-blue-400';
      case 'like': return 'text-red-400';
      case 'comment': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
        >
          <div className="flex items-start space-x-4">
            {/* User Avatar */}
            <img
              src={item.user.avatar}
              alt={item.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-white">{item.user.name}</span>
                <span className={`text-sm ${getActionColor(item.type)}`}>
                  {item.action}
                </span>
                {item.price && (
                  <span className="text-sm text-slate-300">
                    for {item.price} ETH
                  </span>
                )}
                <span className="text-xs text-slate-500">{item.timestamp}</span>
              </div>
              
              {/* NFT Preview */}
              {item.nft && (
                <div className="flex items-center space-x-3 bg-slate-900/50 rounded-lg p-3 mb-3">
                  <img
                    src={item.nft.image}
                    alt={item.nft.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">
                      {item.nft.name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {item.nft.contractAddress.slice(0, 6)}...{item.nft.contractAddress.slice(-4)}
                    </div>
                  </div>
                  <a
                    href={`https://zora.co/collect/base:${item.nft.contractAddress}/${item.nft.tokenId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex items-center space-x-4 text-slate-400">
                <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Comment</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                  <Share className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}