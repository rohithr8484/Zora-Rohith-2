import { useAccount, usePublicClient, useWalletClient, useChainId } from 'wagmi';
import { Address, parseEther } from 'viem';
import { createZoraClient, ZORA_CONTRACTS, ZoraTokenParams } from '../config/zora';
import toast from 'react-hot-toast';

export interface CreateNFTParams {
  name: string;
  description: string;
  imageFile: File;
  animationUrl?: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
  maxSupply?: number;
  pricePerToken?: string;
}

export function useZoraCreate() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();

  const uploadToIPFS = async (file: File): Promise<string> => {
    // Mock IPFS upload - in production, integrate with Pinata, NFT.Storage, etc.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`ipfs://bafkreihz5knnvvsvmaxlpw3kout23te6yboquyvvs72wzfulgrkwj7r7dm`);
      }, 1500);
    });
  };

  const createMetadata = async (params: CreateNFTParams, imageUri: string) => {
    const metadata = {
      name: params.name,
      description: params.description,
      image: imageUri,
      animation_url: params.animationUrl,
      external_url: `https://zora-coins.app/nft/${params.name.toLowerCase().replace(/\s+/g, '-')}`,
      attributes: [
        ...(params.attributes || []),
        {
          trait_type: "Created On",
          value: "Zora Protocol"
        },
        {
          trait_type: "Creator",
          value: address || "Unknown"
        }
      ]
    };

    // Mock metadata upload to IPFS
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`ipfs://bafkreihz5knnvvsvmaxlpw3kout23te6yboquyvvs72wzfulgrkwj7r7dm`);
      }, 1000);
    });
  };

  const createNFT = async (params: CreateNFTParams) => {
    if (!isConnected || !address || !walletClient || !publicClient) {
      throw new Error('Wallet not connected');
    }

    try {
      toast.loading('Uploading image to IPFS...', { id: 'create-nft' });

      // Step 1: Upload image to IPFS
      const imageUri = await uploadToIPFS(params.imageFile);

      toast.loading('Creating metadata...', { id: 'create-nft' });

      // Step 2: Create and upload metadata
      const metadataUri = await createMetadata(params, imageUri);

      toast.loading('Creating NFT with Zora Protocol...', { id: 'create-nft' });

      // Step 3: Create Zora client
      const zoraClient = createZoraClient(chainId);

      // Step 4: Prepare token parameters
      const tokenParams: Partial<ZoraTokenParams> = {
        tokenMetadataURI: metadataUri,
        maxSupply: BigInt(params.maxSupply || 1000),
        createReferral: address,
        pricePerToken: parseEther(params.pricePerToken || '0'),
        currency: '0x0000000000000000000000000000000000000000' as Address, // ETH
        presaleStart: BigInt(0),
        presaleEnd: BigInt(0),
        saleStart: BigInt(Math.floor(Date.now() / 1000)),
        saleEnd: BigInt(Math.floor(Date.now() / 1000) + 86400 * 30), // 30 days
      };

      // Step 5: Create NFT using Zora Protocol SDK
      // For now, we'll simulate this process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock response
      const result = {
        tokenId: Math.floor(Math.random() * 10000).toString(),
        contractAddress: `0x${Math.random().toString(16).substr(2, 40)}` as Address,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        name: params.name,
        metadataUri,
        tokenParams,
      };

      toast.success('NFT created successfully on Zora Protocol!', { 
        id: 'create-nft',
        duration: 5000 
      });

      return result;
    } catch (error) {
      console.error('Error creating NFT:', error);
      toast.error(`Failed to create NFT: ${error instanceof Error ? error.message : 'Unknown error'}`, {
        id: 'create-nft'
      });
      throw error;
    }
  };

  const mintNFT = async (contractAddress: Address, tokenId: string, quantity: number = 1) => {
    if (!isConnected || !address || !walletClient) {
      throw new Error('Wallet not connected');
    }

    try {
      toast.loading('Minting NFT...', { id: 'mint-nft' });

      const zoraClient = createZoraClient(chainId);

      // In production, use the SDK to mint
      // const result = await zoraClient.mint({
      //   contractAddress,
      //   tokenId,
      //   quantity,
      //   to: address,
      // });

      // Mock minting process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const result = {
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        tokenId,
        contractAddress,
        quantity,
        to: address,
      };

      toast.success(`Successfully minted ${quantity} NFT${quantity > 1 ? 's' : ''}!`, { 
        id: 'mint-nft',
        duration: 5000 
      });

      return result;
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Failed to mint NFT', { id: 'mint-nft' });
      throw error;
    }
  };

  return {
    createNFT,
    mintNFT,
    isConnected,
    address,
  };
}