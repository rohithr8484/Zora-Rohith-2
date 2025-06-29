import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Coins, Upload, Zap, ExternalLink, CheckCircle } from 'lucide-react';
import { useZoraCreate } from '../../hooks/useZoraCreate';

const createSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  animationUrl: z.string().url().optional().or(z.literal('')),
  attributes: z.array(z.object({
    trait_type: z.string(),
    value: z.string()
  })).optional(),
});

type CreateFormData = z.infer<typeof createSchema>;

interface CreatedItem {
  tokenId: string;
  contractAddress: string;
  transactionHash: string;
  name: string;
}

export function ZoraCreateForm() {
  const [isCreating, setIsCreating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createdItem, setCreatedItem] = useState<CreatedItem | null>(null);
  const { createNFT, isConnected } = useZoraCreate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateFormData>({
    resolver: zodResolver(createSchema),
  });

  const onSubmit = async (data: CreateFormData) => {
    if (!isConnected || !imageFile) {
      return;
    }

    setIsCreating(true);
    try {
      const result = await createNFT({
        ...data,
        imageFile,
      });
      setCreatedItem(result);
      reset();
      setImageFile(null);
    } catch (error) {
      console.error('Failed to create NFT:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleCreateAnother = () => {
    setCreatedItem(null);
  };

  if (createdItem) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">NFT Created Successfully!</h2>
          <p className="text-slate-300 mb-6">Your NFT has been minted on Zora</p>
          
          <div className="bg-slate-900/50 rounded-lg p-6 mb-6 text-left">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm text-slate-400">Name</label>
                <div className="text-white font-medium">{createdItem.name}</div>
              </div>
              <div>
                <label className="text-sm text-slate-400">Token ID</label>
                <div className="text-white font-medium">{createdItem.tokenId}</div>
              </div>
              <div>
                <label className="text-sm text-slate-400">Contract Address</label>
                <div className="text-white font-mono text-sm break-all">{createdItem.contractAddress}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCreateAnother}
              className="flex-1 bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-teal-700 transition-all duration-200"
            >
              Create Another NFT
            </button>
            <a
              href={`https://zora.co/collect/base:${createdItem.contractAddress}/${createdItem.tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Zora</span>
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
        <h2 className="text-2xl font-semibold text-white">Create NFT on Zora</h2>
      </div>

      {!isConnected && (
        <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-300 text-sm">
            Please connect your wallet to create an NFT
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Image *
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Upload className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <label className="cursor-pointer bg-slate-700/50 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg text-sm text-slate-300 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                required
              />
              {imageFile ? 'Change Image' : 'Upload Image'}
            </label>
          </div>
          {!imageFile && (
            <p className="text-red-400 text-sm mt-1">Image is required</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Name *
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="My Awesome NFT"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            {...register('description')}
            rows={3}
            placeholder="Describe your NFT..."
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Animation URL (Optional) */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Animation URL (Optional)
          </label>
          <input
            {...register('animationUrl')}
            type="url"
            placeholder="https://..."
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
          {errors.animationUrl && (
            <p className="text-red-400 text-sm mt-1">{errors.animationUrl.message}</p>
          )}
        </div>

        {/* Zora Features */}
        <div className="p-4 bg-purple-600/10 border border-purple-500/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-purple-300">Zora Protocol Features</span>
          </div>
          <div className="text-sm text-slate-300 space-y-1">
            <div>✓ Decentralized minting</div>
            <div>✓ Creator royalties</div>
            <div>✓ Open marketplace</div>
            <div>✓ Cross-platform compatibility</div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isCreating || !isConnected || !imageFile}
          className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isCreating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Creating...</span>
            </>
          ) : (
            <>
              <Coins className="w-5 h-5" />
              <span>{isConnected ? 'Create NFT' : 'Connect Wallet to Create'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}