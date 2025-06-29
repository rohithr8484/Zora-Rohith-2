import React, { useState } from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { WalletConnectionModal } from './WalletConnectionModal';
import { WALLET_CONFIG, isZoraSupportedNetwork, getNetworkName } from '../../config/wagmi';

export function WalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const isCorrectNetwork = isZoraSupportedNetwork(chainId);

  const handleNetworkSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: WALLET_CONFIG.requiredChain });
    }
  };

  // Show network warning if connected but on wrong network
  if (isConnected && !isCorrectNetwork) {
    return (
      <>
        <button
          onClick={handleNetworkSwitch}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30"
        >
          <AlertCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Switch to Base</span>
          <span className="sm:hidden">Switch Network</span>
        </button>

        <WalletConnectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          isConnected
            ? 'bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30'
            : 'bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700'
        }`}
      >
        <Wallet className="w-4 h-4" />
        <span>
          {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
        </span>
      </button>

      <WalletConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}