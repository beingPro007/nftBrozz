'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Activity,
  Cloud,
  Grid,
  Home,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  User,
  Wallet,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={`/placeholder.svg?height=400&width=400&text=NFT ${item}`}
                      alt={`NFT ${item}`}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2">
                      {item === 1
                        ? 'New'
                        : item === 2
                        ? 'Hot'
                        : item === 3
                        ? 'Rare'
                        : 'Featured'}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Cosmic Voyager #{item}00
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
                    <Button className="w-full">Place Bid</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
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
