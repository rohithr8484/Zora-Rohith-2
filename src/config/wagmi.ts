import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Zora Coins Platform',
  projectId: '2f05a7cac472ced85b0875842180f6dd', // Public demo project ID
  chains: [base, baseSepolia, mainnet],
  ssr: false,
});

// Wallet connection configuration
export const WALLET_CONFIG = {
  // Supported networks for Zora Protocol
  supportedChains: [base.id, baseSepolia.id],
  // Default chain for new connections
  defaultChain: base,
  // Required for Zora Protocol features
  requiredChain: base.id,
};

// Network switching helper
export const isZoraSupportedNetwork = (chainId: number): boolean => {
  return WALLET_CONFIG.supportedChains.includes(chainId);
};

// Get network display name
export const getNetworkName = (chainId: number): string => {
  switch (chainId) {
    case base.id:
      return 'Base';
    case baseSepolia.id:
      return 'Base Sepolia';
    case mainnet.id:
      return 'Ethereum';
    default:
      return 'Unknown Network';
  }
};