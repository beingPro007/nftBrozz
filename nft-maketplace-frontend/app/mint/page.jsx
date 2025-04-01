'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { Loader2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea.jsx';
import { ImageUpload } from '@/components/ImageUpload.jsx';
import Link from 'next/link';
import contractABI from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const CONTRACT_ADDRESS = '0x3539e7804AAaf4aB7b2404b34d7fc0465dA8E521';

export default function MintNFT() { 
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

      const tokenURI = JSON.stringify(metadata);
      const tx = await nftContract.mintNFT(tokenURI);
      const txRes = await tx.wait();
      console.log('Transictions Responses are: ', tx);

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
    <div className="flex min-h-screen bg-background">

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <Link href="/dashboard" className="md:hidden mr-2">
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Mint New NFT</h1>
            <div className="ml-auto flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                </svg>
                Connected
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <div className="max-w-2xl mx-auto">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle>Create Your NFT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Image</label>
                  <ImageUpload onUploadSuccess={handleUploadSuccess} />

                  {uploadedImageUrl && (
                    <div className="mt-4">
                      <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg border border-border">
                        <img
                          src={uploadedImageUrl}
                          alt="Uploaded NFT"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground text-center">
                        Image uploaded successfully!
                      </p>
                    </div>
                  )}
                </div>

                {/* NFT Details */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">NFT Name</label>
                  <Input
                    type="text"
                    placeholder="Enter a name for your NFT"
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe your NFT"
                    value={nftDescription}
                    onChange={(e) => setNftDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Collection</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Select a collection</option>
                    <option value="collection1">My Collection #1</option>
                    <option value="collection2">Cosmic Voyagers</option>
                    <option value="collection3">Digital Dreams</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Royalty %</label>
                    <Input
                      type="number"
                      placeholder="e.g. 10"
                      min="0"
                      max="50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Properties</label>
                    <Input type="text" placeholder="key:value,key:value" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={mintNFT} disabled={minting} className="w-full">
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
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
