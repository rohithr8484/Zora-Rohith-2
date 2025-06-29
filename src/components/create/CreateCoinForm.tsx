import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Coins, Upload, Zap, ExternalLink } from 'lucide-react';
import { useZoraCoins, CreateCoinParams } from '../../hooks/useZoraCoins';

const createCoinSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  symbol: z.string().min(1, 'Symbol is required').max(10, 'Symbol must be 10 characters or less'),
  description: z.string().min(1, 'Description is required'),
  initialLiquidity: z.string().min(1, 'Initial liquidity is required'),
  category: z.string().min(1, 'Category is required'),
});

type CreateCoinFormData = z.infer<typeof createCoinSchema>;

interface CreatedCoin {
  address: string;
  version: string;
  transactionHash: string;
  name: string;
  symbol: string;
  metadataUri?: string;
}

export function CreateCoinForm() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createdCoin, setCreatedCoin] = useState<CreatedCoin | null>(null);
  const { createCreatorCoin, isConnected } = useZoraCoins();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCoinFormData>({
    resolver: zodResolver(createCoinSchema),
  });

  const onSubmit = async (data: CreateCoinFormData) => {
    if (!isConnected) {
      return;
    }

    setIsDeploying(true);
    try {
      const params: CreateCoinParams = {
        ...data,
        imageFile: imageFile || undefined,
      };

      const result = await createCreatorCoin(params);
      setCreatedCoin(result);
      reset();
      setImageFile(null);
    } catch (error) {
      console.error('Failed to create coin:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleCreateAnother = () => {
    setCreatedCoin(null);
  };

  if (createdCoin) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coins className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Coin Created Successfully!</h2>
          <p className="text-slate-300 mb-6">Your creator coin has been deployed using Zora Protocol</p>
          
          <div className="bg-slate-900/50 rounded-lg p-6 mb-6 text-left">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm text-slate-400">Coin Name</label>
                <div className="text-white font-medium">{createdCoin.name}</div>
              </div>
              <div>
                <label className="text-sm text-slate-400">Symbol</label>
                <div className="text-white font-medium">{createdCoin.symbol}</div>
              </div>
              <div>
                <label className="text-sm text-slate-400">Contract Address</label>
                <div className="text-white font-mono text-sm break-all">{createdCoin.address}</div>
              </div>
              <div>
                <label className="text-sm text-slate-400">Protocol Version</label>
                <div className="text-white font-medium">Zora Protocol {createdCoin.version.toUpperCase()}</div>
              </div>
              {createdCoin.metadataUri && (
                <div>
                  <label className="text-sm text-slate-400">Metadata URI</label>
                  <div className="text-white font-mono text-xs break-all">{createdCoin.metadataUri}</div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCreateAnother}
              className="flex-1 bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-teal-700 transition-all duration-200"
            >
              Create Another Coin
            </button>
            <a
              href={`https://basescan.org/address/${createdCoin.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on BaseScan</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg flex items-center justify-center">
          <Coins className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-white">Create Your Coin</h2>
      </div>

      {!isConnected && (
        <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-300 text-sm">
            Please connect your wallet to create a coin
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Coin Image */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Coin Image
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Coin"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Upload className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <label className="cursor-pointer bg-slate-700/50 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg text-sm text-slate-300 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              Upload Image
            </label>
          </div>
        </div>

        {/* Coin Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Coin Name
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="e.g., Artist Creator Coin"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Coin Symbol */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Symbol
          </label>
          <input
            {...register('symbol')}
            type="text"
            placeholder="e.g., ARTIST"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
          {errors.symbol && (
            <p className="text-red-400 text-sm mt-1">{errors.symbol.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            placeholder="Describe your coin and what supporters can expect..."
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">Select a category</option>
            <option value="art">Digital Art</option>
            <option value="music">Music</option>
            <option value="writing">Writing</option>
            <option value="photography">Photography</option>
            <option value="gaming">Gaming</option>
            <option value="fitness">Fitness</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Initial Liquidity */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Initial Liquidity (ETH)
          </label>
          <input
            {...register('initialLiquidity')}
            type="text"
            placeholder="0.1"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
          {errors.initialLiquidity && (
            <p className="text-red-400 text-sm mt-1">{errors.initialLiquidity.message}</p>
          )}
          <p className="text-slate-400 text-sm mt-1">
            Minimum 0.1 ETH required for initial liquidity
          </p>
        </div>

        {/* Zora Protocol Features */}
        <div className="p-4 bg-purple-600/10 border border-purple-500/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-purple-300">Zora Protocol Features</span>
          </div>
          <div className="text-sm text-slate-300 space-y-1">
            <div>✓ Decentralized coin creation</div>
            <div>✓ IPFS metadata storage</div>
            <div>✓ Creator royalty system</div>
            <div>✓ Cross-platform compatibility</div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isDeploying || !isConnected}
          className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isDeploying ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Creating...</span>
            </>
          ) : (
            <>
              <Coins className="w-5 h-5" />
              <span>{isConnected ? 'Deploy Coin' : 'Connect Wallet to Deploy'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}