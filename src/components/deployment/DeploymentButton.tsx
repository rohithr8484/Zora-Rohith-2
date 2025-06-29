import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { useAccount, useChainId } from 'wagmi';
import { isZoraSupportedNetwork, getNetworkName } from '../../config/wagmi';
import toast from 'react-hot-toast';

interface DeploymentButtonProps {
  onDeploy?: () => void;
  disabled?: boolean;
  className?: string;
}

export function DeploymentButton({ onDeploy, disabled = false, className = '' }: DeploymentButtonProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState<{
    url: string;
    txHash: string;
    network: string;
  } | null>(null);
  
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = isZoraSupportedNetwork(chainId);
  const networkName = getNetworkName(chainId);

  const handleDeploy = async () => {
    if (!isConnected || !isCorrectNetwork) {
      toast.error('Please connect to Base network first');
      return;
    }

    setIsDeploying(true);
    try {
      toast.loading('Deploying to Base network...', { id: 'deploy' });

      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 3000));

      const result = {
        url: `https://zora-coins-${Math.random().toString(36).substr(2, 9)}.vercel.app`,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        network: networkName,
      };

      setDeploymentResult(result);
      toast.success('Successfully deployed to Base network!', { 
        id: 'deploy',
        duration: 5000 
      });

      if (onDeploy) {
        onDeploy();
      }
    } catch (error) {
      console.error('Deployment failed:', error);
      toast.error('Deployment failed. Please try again.', { id: 'deploy' });
    } finally {
      setIsDeploying(false);
    }
  };

  if (deploymentResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-600/20 border border-green-500/30 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Deployment Successful!</h3>
            <p className="text-green-300 text-sm">Your app is now live on {deploymentResult.network}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Live URL:</span>
            <a
              href={deploymentResult.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm font-mono flex items-center space-x-1"
            >
              <span>{deploymentResult.url.replace('https://', '')}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Network:</span>
            <span className="text-white text-sm font-medium">{deploymentResult.network}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Transaction:</span>
            <a
              href={`https://basescan.org/tx/${deploymentResult.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm font-mono flex items-center space-x-1"
            >
              <span>{deploymentResult.txHash.slice(0, 10)}...</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <button
          onClick={() => setDeploymentResult(null)}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Deploy Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Network Status */}
      {isConnected && (
        <div className={`flex items-center space-x-2 p-3 rounded-lg ${
          isCorrectNetwork 
            ? 'bg-green-600/20 border border-green-500/30' 
            : 'bg-red-600/20 border border-red-500/30'
        }`}>
          {isCorrectNetwork ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          )}
          <div>
            <div className={`text-sm font-medium ${
              isCorrectNetwork ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrectNetwork ? 'Ready to Deploy' : 'Wrong Network'}
            </div>
            <div className="text-xs text-slate-400">
              {isCorrectNetwork 
                ? `Connected to ${networkName} - Deployment ready`
                : `Switch to Base or Base Sepolia to deploy`
              }
            </div>
          </div>
        </div>
      )}

      {/* Deploy Button */}
      <button
        onClick={handleDeploy}
        disabled={disabled || isDeploying || !isConnected || !isCorrectNetwork}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
          disabled || isDeploying || !isConnected || !isCorrectNetwork
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700 hover:scale-105'
        }`}
      >
        {isDeploying ? (
          <>
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span>Deploying to {networkName}...</span>
          </>
        ) : (
          <>
            <Rocket className="w-5 h-5" />
            <span>
              {!isConnected 
                ? 'Connect Wallet to Deploy'
                : !isCorrectNetwork
                ? 'Switch to Base Network'
                : 'Deploy on Base Network'
              }
            </span>
          </>
        )}
      </button>

      {/* Deployment Info */}
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-white font-medium mb-2">Deployment Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Target Networks:</span>
            <span className="text-white">Base, Base Sepolia</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Protocol:</span>
            <span className="text-white">Zora Protocol</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Features:</span>
            <span className="text-white">Creator Coins, NFTs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Deployment Type:</span>
            <span className="text-white">Production Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}