import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { WalletConnectionModal } from './WalletConnectionModal';

export function WalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

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