import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, TrendingUp, Users, Plus } from 'lucide-react';
import { ZoraCreateForm } from '../components/zora/ZoraCreateForm';
import { ZoraCollectionGrid } from '../components/zora/ZoraCollectionGrid';
import { ZoraStats } from '../components/zora/ZoraStats';
import { ZoraFeed } from '../components/zora/ZoraFeed';

export function ZoraPage() {
  const [activeTab, setActiveTab] = useState<'explore' | 'create' | 'feed'>('explore');

  // Mock data
  const mockNFTs = [
    {
      id: '1',
      name: 'Digital Dreams #1',
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
      creator: 'Artist1',
      price: '0.1',
      likes: 24,
      views: 156,
      contractAddress: '0x1234567890123456789012345678901234567890',
      tokenId: '1'
    },
    {
      id: '2',
      name: 'Crypto Portrait #5',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      creator: 'Artist2',
      price: '0.15',
      likes: 18,
      views: 89,
      contractAddress: '0x2345678901234567890123456789012345678901',
      tokenId: '5'
    },
    {
      id: '3',
      name: 'Abstract Vision',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      creator: 'Artist3',
      likes: 32,
      views: 203,
      contractAddress: '0x3456789012345678901234567890123456789012',
      tokenId: '12'
    },
    {
      id: '4',
      name: 'Neon Nights',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      creator: 'Artist4',
      price: '0.08',
      likes: 15,
      views: 67,
      contractAddress: '0x4567890123456789012345678901234567890123',
      tokenId: '8'
    }
  ];

  const mockFeedItems = [
    {
      id: '1',
      type: 'mint' as const,
      user: {
        name: 'Alice Creator',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
        address: '0xAlice'
      },
      nft: {
        name: 'Digital Dreams #1',
        image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=100',
        contractAddress: '0x1234567890123456789012345678901234567890',
        tokenId: '1'
      },
      action: 'minted',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'sale' as const,
      user: {
        name: 'Bob Collector',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
        address: '0xBob'
      },
      nft: {
        name: 'Crypto Portrait #5',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
        contractAddress: '0x2345678901234567890123456789012345678901',
        tokenId: '5'
      },
      action: 'purchased',
      timestamp: '4 hours ago',
      price: '0.15'
    }
  ];

  const tabs = [
    { id: 'explore', label: 'Explore', icon: Palette },
    { id: 'create', label: 'Create', icon: Plus },
    { id: 'feed', label: 'Activity', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Zora Protocol
            <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              {' '}Integration
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Create, collect, and trade NFTs on the decentralized Zora protocol
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <ZoraStats />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-teal-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'explore' && (
            <ZoraCollectionGrid items={mockNFTs} title="Featured NFTs" />
          )}
          
          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <ZoraCreateForm />
            </div>
          )}
          
          {activeTab === 'feed' && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              <ZoraFeed items={mockFeedItems} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}