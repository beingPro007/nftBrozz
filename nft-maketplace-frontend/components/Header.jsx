'use client';

import { useState } from 'react';
import { Menu, Search, Wallet, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-card">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Center Section: Search Bar with Responsive Spacing */}
        <div className="flex-1 flex justify-center md:justify-start mx-4">
          <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search NFTs, collections..."
              className="w-full pl-9"
            />
          </div>
        </div>

        {/* Right Section: Wallet & Profile */}
        <div className="flex items-center space-x-4">
          {/* Connect Wallet Button */}
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>

          {/* Profile Dropdown - Always Visible on Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <User className="h-5 w-5" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="mt-2 w-48 bg-card shadow-lg rounded-md"
            >
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Disconnect</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
