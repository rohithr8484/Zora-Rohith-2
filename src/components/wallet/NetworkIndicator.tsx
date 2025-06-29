import React from 'react';
import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { isZoraSupportedNetwork, getNetworkName } from '../../config/wagmi';

export function NetworkIndicator() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({
    address: address,
  });

  const getNetworkInfo = () => {
    const isSupported = isZoraSupportedNetwork(chainId);
    const name = getNetworkName(chainId);
    
    switch (chainId) {
      case base.id:
        return { name: 'Base', color: 'bg-blue-600', isSupported: true, icon: Wifi };
      case baseSepolia.id:
        return { name: 'Base Sepolia', color: 'bg-orange-600', isSupported: true, icon: Wifi };
      default:
        return { name, color: 'bg-red-600', isSupported: false, icon: WifiOff };
    }
  };

  if (!isConnected) {
    return null;
  }

  const network = getNetworkInfo();
  const formattedBalance = balance ? parseFloat(balance.formatted).toFixed(4) : '0.0000';

  const handleNetworkSwitch = () => {
    if (switchChain && !network.isSupported) {
      switchChain({ chainId: base.id });
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Balance Display */}
      <div className="hidden sm:flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
        <span className="text-slate-300 text-sm font-medium">
          {formattedBalance} ETH
        </span>
      </div>

      {/* Network Indicator */}
      <div 
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all duration-200 ${
          network.isSupported 
            ? 'border-slate-700/50 bg-slate-800/50 hover:bg-slate-800/70' 
            : 'border-red-500/50 bg-red-600/20 hover:bg-red-600/30'
        }`}
        onClick={handleNetworkSwitch}
      >
        {network.isSupported ? (
          <Wifi className="w-3 h-3 text-green-400" />
        ) : (
          <AlertTriangle className="w-3 h-3 text-red-400" />
        )}
        <div className={`w-2 h-2 rounded-full ${network.color}`} />
        <span className={`text-xs font-medium ${
          network.isSupported ? 'text-slate-300' : 'text-red-400'
        }`}>
          {network.name}
        </span>
      </div>

      {/* Zora Protocol Badge */}
      {network.isSupported && (
        <div className="hidden md:flex items-center space-x-1 bg-purple-600/20 px-2 py-1 rounded-lg border border-purple-500/30">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-purple-300">Zora Ready</span>
        </div>
      )}
    </div>
  );
}