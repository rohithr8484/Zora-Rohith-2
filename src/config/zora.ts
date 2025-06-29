import { createPublicClient, http, Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { createCreatorClient } from '@zoralabs/protocol-sdk';

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

// Create Zora Protocol SDK client
export const createZoraClient = (chainId: number) => {
  return createCreatorClient({
    chainId,
  });
};

// Zora API endpoints
export const ZORA_API_BASE = 'https://api.zora.co';

// Platform configuration
export const PLATFORM_CONFIG = {
  // Platform referrer address for earning fees
  platformReferrer: '0x0000000000000000000000000000000000000000' as Address,
  // Default collection contract for minting
  defaultCollection: '0x0000000000000000000000000000000000000000' as Address,
  // IPFS gateway
  ipfsGateway: 'https://ipfs.io/ipfs/',
};

// Zora Protocol contract addresses on Base
export const ZORA_CONTRACTS = {
  // Zora Creator 1155 Factory
  CREATOR_1155_FACTORY: '0x777777C338d93e2C7adf08D102d45CA7CC4Ed021' as Address,
  // Zora Drops Factory
  DROPS_FACTORY: '0x7c74dfe39976dc395529c14e54a597809980e01c' as Address,
  // Protocol Rewards
  PROTOCOL_REWARDS: '0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B' as Address,
};

// Collection creation parameters
export interface ZoraCollectionParams {
  name: string;
  symbol: string;
  description: string;
  image: string;
  animationUrl?: string;
  defaultAdmin: Address;
  fundsRecipient: Address;
  royaltyBPS: number;
  setupActions?: any[];
}

// Token creation parameters
export interface ZoraTokenParams {
  tokenMetadataURI: string;
  maxSupply: bigint;
  createReferral: Address;
  pricePerToken: bigint;
  currency: Address;
  presaleStart: bigint;
  presaleEnd: bigint;
  saleStart: bigint;
  saleEnd: bigint;
}