import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Coins, Users, ArrowRight, Zap, Target, Globe, Rocket } from 'lucide-react';
import { DeploymentModal } from '../components/deployment/DeploymentModal';

export function HomePage() {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const features = [
    {
      icon: Coins,
      title: 'Create Coins',
      description: 'Launch your own creator coin with Zora Protocol integration',
      href: '/create'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Trading',
      description: 'Trade with sophisticated features and multi-hop rewards',
      href: '/trade'
    },
    {
      icon: Users,
      title: 'Discover Creators',
      description: 'Find and support your favorite creators through coin trading',
      href: '/discover'
    }
  ];

  const stats = [
    { label: 'Total Volume', value: '$2.4M', icon: TrendingUp },
    { label: 'Active Coins', value: '1,247', icon: Coins },
    { label: 'Creators', value: '892', icon: Users },
    { label: 'Supporters', value: '12.5K', icon: Globe }
  ];

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                The Future of
                <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                  {' '}Creator Economy
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Trade creator coins with advanced Zora Protocol features. Support your favorite creators 
                while earning rewards through innovative trading mechanisms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/create"
                  className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Launch Your Coin</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsDeployModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Deploy on Base</span>
                </button>
                <Link
                  to="/discover"
                  className="border border-slate-600 text-slate-300 px-8 py-3 rounded-lg font-medium hover:bg-slate-800 hover:text-white transition-all duration-200"
                >
                  Explore Creators
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700/50"
                  >
                    <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Powered by Zora Protocol
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Experience next-generation creator economy with advanced protocol features and Base network deployment
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="group"
                  >
                    <Link to={feature.href}>
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group-hover:bg-slate-800/70">
                        <Icon className="w-12 h-12 text-purple-400 mb-4 group-hover:text-purple-300 transition-colors" />
                        <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-300 group-hover:text-slate-200 transition-colors">
                          {feature.description}
                        </p>
                        <div className="flex items-center mt-4 text-purple-400 group-hover:text-purple-300 transition-colors">
                          <span className="text-sm font-medium">Learn more</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-600/20 to-teal-600/20 rounded-2xl p-8 md:p-12 text-center border border-purple-500/30"
            >
              <Zap className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Creator Economy?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join the revolution of creator-supporter value exchange through innovative trading mechanisms on Base network
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/create"
                  className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Target className="w-5 h-5" />
                  <span>Start Creating</span>
                </Link>
                <button
                  onClick={() => setIsDeployModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Deploy Now</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Deployment Modal */}
      <DeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </>
  );
}