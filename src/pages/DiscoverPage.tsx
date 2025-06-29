import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Users, Star, ExternalLink } from 'lucide-react';
import { CreatorCard } from '../components/discover/CreatorCard';

export function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');

  const creators = [
    {
      id: 1,
      name: 'Alex Rivera',
      username: '@alexartist',
      category: 'Digital Art',
      coinSymbol: 'ALEX',
      price: 0.045,
      change: 12.5,
      marketCap: 45000,
      holders: 234,
      description: 'Creating stunning digital art and NFTs',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: 2,
      name: 'Sarah Chen',
      username: '@sarahmusic',
      category: 'Music',
      coinSymbol: 'MUSIC',
      price: 0.032,
      change: -3.2,
      marketCap: 32000,
      holders: 189,
      description: 'Independent musician and producer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 3,
      name: 'Mike Johnson',
      username: '@mikewriter',
      category: 'Writing',
      coinSymbol: 'WRITE',
      price: 0.078,
      change: 8.7,
      marketCap: 28000,
      holders: 156,
      description: 'Science fiction author and storyteller',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 4,
      name: 'Emma Wilson',
      username: '@emmaphoto',
      category: 'Photography',
      coinSymbol: 'PHOTO',
      price: 0.021,
      change: 15.3,
      marketCap: 19000,
      holders: 98,
      description: 'Travel and nature photographer',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    }
  ];

  const categories = ['All', 'Digital Art', 'Music', 'Writing', 'Photography', 'Gaming', 'Fitness'];

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
          <h1 className="text-3xl font-bold text-white mb-2">Discover Creators</h1>
          <p className="text-slate-300">Find and support amazing creators through their coins</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="trending">Trending</option>
              <option value="volume">Volume</option>
              <option value="price">Price</option>
              <option value="holders">Holders</option>
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Creator */}
        {creators.find(c => c.featured) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-teal-600/20 rounded-2xl p-8 border border-purple-500/30">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">Featured Creator</span>
              </div>
              <CreatorCard creator={creators.find(c => c.featured)!} featured />
            </div>
          </motion.div>
        )}

        {/* Creators Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {creators.filter(c => !c.featured).map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <CreatorCard creator={creator} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Creators
          </button>
        </motion.div>
      </div>
    </div>
  );
}