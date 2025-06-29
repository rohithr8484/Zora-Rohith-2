import React from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { Wifi, WifiOff } from 'lucide-react';

export function NetworkIndicator() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address: address,
  });

  const getNetworkInfo = () => {
    switch (chainId) {
      case base.id:
        return { name: 'Base', color: 'bg-blue-600', isSupported: true };
      case baseSepolia.id:
        return { name: 'Base Sepolia', color: 'bg-orange-600', isSupported: true };
      default:
        return { name: 'Unsupported', color: 'bg-red-600', isSupported: false };
    }
  };

  if (!isConnected) {
    return null;
  }

  const network = getNetworkInfo();
  const formattedBalance = balance ? parseFloat(balance.formatted).toFixed(4) : '0.0000';

  return (
    <div className="flex items-center space-x-3">
      {/* Balance Display */}
      <div className="hidden sm:flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
        <span className="text-slate-300 text-sm font-medium">
          {formattedBalance} ETH
        </span>
      </div>

      {/* Network Indicator */}
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${
        network.isSupported 
          ? 'border-slate-700/50 bg-slate-800/50' 
          : 'border-red-500/50 bg-red-600/20'
      }`}>
        {network.isSupported ? (
          <Wifi className="w-3 h-3 text-green-400" />
        ) : (
          <WifiOff className="w-3 h-3 text-red-400" />
        )}
        <div className={`w-2 h-2 rounded-full ${network.color}`} />
        <span className={`text-xs font-medium ${
          network.isSupported ? 'text-slate-300' : 'text-red-400'
        }`}>
          {network.name}
        </span>
      </div>
    </div>
  );
}