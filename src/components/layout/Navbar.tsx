import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins, TrendingUp, Plus, Compass, Briefcase, BarChart3, Palette, Rocket } from 'lucide-react';
import { clsx } from 'clsx';
import { WalletButton } from '../wallet/WalletButton';
import { NetworkIndicator } from '../wallet/NetworkIndicator';
import { DeploymentModal } from '../deployment/DeploymentModal';

export function Navbar() {
  const location = useLocation();
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Coins },
    { name: 'Trade', href: '/trade', icon: TrendingUp },
    { name: 'Create', href: '/create', icon: Plus },
    { name: 'Discover', href: '/discover', icon: Compass },
    { name: 'Zora', href: '/zora', icon: Palette },
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Zora Coins</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={clsx(
                        'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive 
                          ? 'bg-purple-600 text-white' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Deploy Button */}
              <button
                onClick={() => setIsDeployModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                <Rocket className="w-4 h-4" />
                <span>Deploy</span>
              </button>
              
              <NetworkIndicator />
              <WalletButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Deployment Modal */}
      <DeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </>
  );
}