import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, ExternalLink, Copy, Check, AlertTriangle, Zap } from 'lucide-react';
import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { isZoraSupportedNetwork, getNetworkName, WALLET_CONFIG } from '../../config/wagmi';

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectionModal({ isOpen, onClose }: WalletConnectionModalProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [copied, setCopied] = useState(false);

  const isCorrectNetwork = isZoraSupportedNetwork(chainId);
  const networkName = getNetworkName(chainId);

  const handleConnect = () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  const handleNetworkSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: WALLET_CONFIG.requiredChain });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-slate-800 rounded-2xl p-6 w-full max-w-sm mx-4 border border-slate-700/50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            {isConnected ? (
              <div className="space-y-4">
                {/* Network Warning */}
                {!isCorrectNetwork && (
                  <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 font-medium">Wrong Network</span>
                    </div>
                    <p className="text-red-300 text-sm mb-3">
                      You're connected to {networkName}. Switch to Base network to use Zora Protocol features.
                    </p>
                    <button
                      onClick={handleNetworkSwitch}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Switch to Base Network
                    </button>
                  </div>
                )}

                {/* Connected State */}
                <div className={`rounded-lg p-4 ${
                  isCorrectNetwork 
                    ? 'bg-green-600/20 border border-green-500/30' 
                    : 'bg-slate-700/30'
                }`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrectNetwork ? 'bg-green-600' : 'bg-slate-600'
                    }`}>
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${
                        isCorrectNetwork ? 'text-green-400' : 'text-slate-300'
                      }`}>
                        {isCorrectNetwork ? 'Connected & Ready' : 'Connected'}
                      </div>
                      <div className="text-slate-300 text-xs font-mono">
                        {address && formatAddress(address)}
                      </div>
                    </div>
                  </div>

                  {/* Network Info */}
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-slate-400">Network:</span>
                    <span className={`font-medium ${
                      isCorrectNetwork ? 'text-green-400' : 'text-slate-300'
                    }`}>
                      {networkName}
                    </span>
                  </div>

                  {/* Zora Features Status */}
                  {isCorrectNetwork && (
                    <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 text-sm font-medium">Zora Protocol Ready</span>
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <div>✓ Create NFTs and Collections</div>
                        <div>✓ Mint and Trade</div>
                        <div>✓ Creator Rewards</div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={handleCopyAddress}
                      className="flex-1 bg-slate-600/50 hover:bg-slate-600 text-slate-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1.5"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        if (address) {
                          window.open(`https://basescan.org/address/${address}`, '_blank');
                        }
                      }}
                      className="flex-1 bg-slate-600/50 hover:bg-slate-600 text-slate-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Explorer</span>
                    </button>
                  </div>
                </div>

                {/* Disconnect Button */}
                <button
                  onClick={handleDisconnect}
                  className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Not Connected State */}
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-slate-300 text-sm mb-4">
                    Connect your wallet to start using Zora Protocol features
                  </p>
                </div>

                {/* Features Preview */}
                <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                  <h3 className="text-white font-medium mb-3">What you can do:</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span>Create and deploy creator coins</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                      <span>Mint NFTs on Zora Protocol</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span>Trade and collect digital assets</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      <span>Earn creator rewards</span>
                    </div>
                  </div>
                </div>

                {/* Connect Button */}
                <button
                  onClick={handleConnect}
                  className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </button>

                {/* Supported Wallets Info */}
                <div className="text-xs text-slate-400 text-center">
                  Supports MetaMask, Coinbase Wallet, WalletConnect, and more
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}