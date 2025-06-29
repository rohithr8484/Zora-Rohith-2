import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, Eye } from 'lucide-react';

interface NFTItem {
  id: string;
  name: string;
  image: string;
  creator: string;
  price?: string;
  likes: number;
  views: number;
  contractAddress: string;
  tokenId: string;
}

interface ZoraCollectionGridProps {
  items: NFTItem[];
  title: string;
}

export function ZoraCollectionGrid({ items, title }: ZoraCollectionGridProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Overlay Actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <a
                  href={`https://zora.co/collect/base:${item.contractAddress}/${item.tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-white mb-1 truncate">{item.name}</h3>
              <p className="text-slate-400 text-sm mb-3">by {item.creator}</p>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Heart className="w-4 h-4" />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Eye className="w-4 h-4" />
                    <span>{item.views}</span>
                  </div>
                </div>
                {item.price && (
                  <div className="text-white font-medium">
                    {item.price} ETH
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}