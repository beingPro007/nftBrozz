'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import contractABI from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import { ethers } from 'ethers';

export default function Dashboard() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nfts.length != 0) {
      console.log('All NfTs data', nfts);
    }
  }, [nfts]);
  useEffect(() => {
    let isMounted = true;

    async function loadNFTs() {
      setLoading(true);
      const contractAddress = '0x3539e7804AAaf4aB7b2404b34d7fc0465dA8E521';
      const abi = contractABI.abi;
      const provider = new ethers.JsonRpcProvider(
        `https://eth-sepolia.g.alchemy.com/v2/KMHcDxjy115a3qGI3yJsKNz5pGVbTVQa`
      );

      const contract = new ethers.Contract(contractAddress, abi, provider);

      try {
        const tokenIds = await contract.getAllMintedNFTs();
        const promises = tokenIds.map(async (tokenId) => {
          try {
            let uri = await contract.tokenURI(tokenId);

            // 🛠️ Parse the URI if it's a JSON string
            let metadata;
            if (uri.startsWith('{')) {
              metadata = JSON.parse(uri);
            } else {
              const response = await fetch(uri);
              if (!response.ok) throw new Error('Invalid metadata URL');
              metadata = await response.json();
            }
            console.log('Metadata is', metadata);

            return {
              tokenId: tokenId.toString(),
              owner: await contract.ownerOf(tokenId),
              name: metadata.name || `NFT #${tokenId}`,
              image: metadata.image,
              description: metadata.description || 'No description available',
              attributes: metadata.attributes || [],
            };
          } catch (error) {
            console.error(
              `Error fetching metadata for Token ID ${tokenId}:`,
              error
            );
            return null;
          }
        });

        const nftDataArray = (await Promise.all(promises)).filter(
          (nfts) => nfts !== null
        );

        if (isMounted) {
          setNfts(nftDataArray);
        }
      } catch (error) {
        console.error('Error loading NFTs:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNFTs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1">
        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">NFT Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, John Doe</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.45 ETH</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +2.5% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  NFTs Owned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +3 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Collections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across 3 blockchains
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.32 ETH</div>
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ $15,240.65 USD
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Featured NFTs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Featured NFTs</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-gray-500">Loading NFTs...</p>
              </div>
            ) : nfts.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {nfts.map((nft, index) => {
                  let imageUrl = nft.image;

                  // Convert ipfs:// URL to a valid HTTP link
                  if (imageUrl && imageUrl.startsWith('ipfs://')) {
                    imageUrl = imageUrl.replace(
                      'ipfs://',
                      'https://ipfs.io/ipfs/'
                    );
                  }

                  // Fix Cloudinary URLs missing protocol
                  if (imageUrl && imageUrl.startsWith('http:/')) {
                    imageUrl = imageUrl.replace('http:/', 'https://');
                  }

                  console.log(`NFT ${nft.tokenId} Image URL:`, imageUrl); // Debugging

                  return (
                    <Card key={nft.tokenId} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={imageUrl} // Fallback image
                          alt={`NFT ${nft.tokenId}`}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.src = '';
                          }} // Handle broken images
                        />
                        <Badge className="absolute top-2 right-2">
                          {index % 4 === 0
                            ? 'New'
                            : index % 4 === 1
                            ? 'Hot'
                            : index % 4 === 2
                            ? 'Rare'
                            : 'Featured'}
                        </Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          {nft.name || `NFT #${nft.tokenId}`}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Current Bid
                            </p>
                            <p className="font-medium">
                              {(Math.random() * 2 + 0.1).toFixed(2)} ETH
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              Ending In
                            </p>
                            <p className="font-medium">
                              {Math.floor(Math.random() * 24)}h{' '}
                              {Math.floor(Math.random() * 60)}m
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">List Item</Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500">No NFTs found.</div>
            )}
          </div>

          {/* Collections & Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Collections */}
            <Card>
              <CardHeader>
                <CardTitle>Top Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {item}
                        </div>
                        <div>
                          <p className="font-medium">Bored Ape Yacht Club</p>
                          <p className="text-xs text-muted-foreground">
                            Floor: {(Math.random() * 10 + 5).toFixed(2)} ETH
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm ${
                            Math.random() > 0.5
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {Math.random() > 0.5 ? '+' : '-'}
                          {(Math.random() * 15).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="purchases">Purchases</TabsTrigger>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                    <TabsTrigger value="transfers">Transfers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-muted flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {item % 2 === 0 ? 'You purchased' : 'You sold'}{' '}
                            Cosmic Voyager #
                            {item * 100 + Math.floor(Math.random() * 100)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Math.floor(Math.random() * 12) + 1} hours ago
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {(Math.random() * 2 + 0.1).toFixed(2)} ETH
                          </p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="purchases">
                    <div className="py-8 text-center text-muted-foreground">
                      Filter by purchases
                    </div>
                  </TabsContent>
                  <TabsContent value="sales">
                    <div className="py-8 text-center text-muted-foreground">
                      Filter by sales
                    </div>
                  </TabsContent>
                  <TabsContent value="transfers">
                    <div className="py-8 text-center text-muted-foreground">
                      Filter by transfers
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
