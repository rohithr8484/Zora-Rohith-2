import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Zora Coins Platform',
  projectId: '2f05a7cac472ced85b0875842180f6dd', // Public demo project ID
  chains: [base, baseSepolia],
  ssr: false,
});