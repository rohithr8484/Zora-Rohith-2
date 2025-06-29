import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Shield, Zap, Globe } from 'lucide-react';
import { DeploymentButton } from './DeploymentButton';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeploymentModal({ isOpen, onClose }: DeploymentModalProps) {
  const features = [
    {
      icon: Shield,
      title: 'Secure Deployment',
      description: 'Deploy securely on Base network with built-in security features'
    },
    {
      icon: Zap,
      title: 'Zora Protocol Ready',
      description: 'Full integration with Zora Protocol for NFTs and creator coins'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Your deployed app will be accessible worldwide instantly'
    }
  ];

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
            className="relative bg-slate-800 rounded-2xl p-6 w-full max-w-lg mx-4 border border-slate-700/50 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">Deploy on Base</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <p className="text-slate-300 mb-4">
                  Deploy your Zora Coins platform to Base network for production use. 
                  Your app will be live and accessible to users worldwide.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Deployment Features</h3>
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600/20 to-teal-600/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                        <Icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm">{feature.title}</h4>
                        <p className="text-slate-400 text-xs">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Network Requirements */}
              <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium mb-2">Network Requirements</h4>
                <div className="space-y-1 text-sm text-slate-300">
                  <div>• Must be connected to Base or Base Sepolia</div>
                  <div>• Wallet connection required for deployment</div>
                  <div>• Zora Protocol features will be fully functional</div>
                </div>
              </div>

              {/* Deployment Button */}
              <DeploymentButton onDeploy={onClose} />

              {/* Additional Info */}
              <div className="text-xs text-slate-400 text-center">
                Deployment is free and takes approximately 2-3 minutes to complete
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}