import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';

// Zora Protocol configuration
export const ZORA_NETWORK = {
  MAINNET: base,
  TESTNET: baseSepolia,
};

// Use Base network for Zora Protocol
export const zoraPublicClient = createPublicClient({
  chain: base,
  transport: http(),
});

// Zora API endpoints
export const ZORA_API_BASE = 'https://api.zora.co';

// Platform configuration
export const PLATFORM_CONFIG = {
  // Platform referrer address for earning fees
  platformReferrer: '0x0000000000000000000000000000000000000000',
  // Default collection contract for minting
  defaultCollection: '0x0000000000000000000000000000000000000000',
};