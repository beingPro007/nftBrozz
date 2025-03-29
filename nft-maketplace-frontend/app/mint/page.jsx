'use client'; // Mark this as a Client Component

import { useState } from 'react';
import { ethers } from 'ethers';
import { Loader2, UploadCloud } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import contractABI from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const CONTRACT_ADDRESS = '0x3539e7804AAaf4aB7b2404b34d7fc0465dA8E521';

export default function MINT() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [minting, setMinting] = useState(false);
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');

  const handleUploadSuccess = async (imageUrl) => {
    console.log('Image uploaded successfully:', imageUrl);
    setUploadedImageUrl(imageUrl);
  };

  const mintNFT = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    if (!uploadedImageUrl || !nftName || !nftDescription) {
      alert('Please complete all fields before minting.');
      return;
    }

    try {
      setMinting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const nftContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI.abi,
        signer
      );

      const metadata = {
        name: nftName,
        description: nftDescription,
        image: uploadedImageUrl,
      };

      const tokenURI = JSON.stringify(metadata); // This should be uploaded to IPFS in a real scenario

      const tx = await nftContract.mintNFT(tokenURI);
      await tx.wait();

      alert(`NFT Minted Successfully! 🎉`);
      setUploadedImageUrl(null);
      setNftName('');
      setNftDescription('');
    } catch (error) {
      console.error('Minting failed', error);
      alert('Minting failed. Try again.');
    }

    setMinting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 w-full max-w-lg bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Mint Your NFT
        </h2>

        {/* Image Upload */}
        <ImageUpload onUploadSuccess={handleUploadSuccess} />
        {uploadedImageUrl && (
          <div className="mt-4 text-center">
            <img
              src={uploadedImageUrl}
              alt="Uploaded NFT"
              className="w-full h-48 object-cover rounded-md border border-gray-300"
            />
            <p className="mt-2 text-sm text-gray-500">
              Image uploaded successfully!
            </p>
          </div>
        )}

        {/* NFT Details */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            NFT Name
          </label>
          <Input
            type="text"
            placeholder="Enter NFT name"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Input
            type="text"
            placeholder="Enter NFT description"
            value={nftDescription}
            onChange={(e) => setNftDescription(e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Mint Button */}
        <Button
          onClick={mintNFT}
          disabled={minting}
          className="mt-6 w-full flex items-center justify-center"
        >
          {minting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Minting...
            </>
          ) : (
            <>
              <UploadCloud className="h-5 w-5 mr-2" />
              Mint NFT
            </>
          )}
        </Button>
      </Card>
    </div>
  );
}
