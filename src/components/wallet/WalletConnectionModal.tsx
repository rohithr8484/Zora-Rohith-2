import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, ExternalLink, Copy, Check } from 'lucide-react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectionModal({ isOpen, onClose }: WalletConnectionModalProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const [copied, setCopied] = useState(false);

  const handleConnect = () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
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
                {isConnected ? 'Wallet' : 'Connect Wallet'}
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
                {/* Connected State */}
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-green-400 text-sm font-medium">Connected</div>
                      <div className="text-slate-300 text-xs font-mono">
                        {address && formatAddress(address)}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2">
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
                  Disconnect
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
                    Connect to start trading creator coins
                  </p>
                </div>

                {/* Connect Button */}
                <button
                  onClick={handleConnect}
                  className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </button>

                {/* Info */}
                <div className="text-xs text-slate-400 text-center">
                  Secure connection via RainbowKit
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}