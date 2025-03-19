"use client";

import { Search, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";
import { Input } from "./ui/input";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <span className="font-bold">ToyStore</span>
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}