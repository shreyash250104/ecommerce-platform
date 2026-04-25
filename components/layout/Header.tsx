'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Heart, Menu, User, MapPin } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useState } from 'react';

export default function Header() {
  const cartItems = useCartStore((state) => state.items);
  const { user, isAuthenticated } = useAuthStore();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header>
      {/* Top Bar - Amazon style */}
      <div className="bg-gray-900 text-white text-xs py-1">
        <div className="container mx-auto px-4 flex justify-between">
          <span>Seller Center</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline">Track Order</Link>
            <Link href="#" className="hover:underline">Returns</Link>
            <Link href="#" className="hover:underline">Customer Support</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-400">
              ShopHub<span className="text-white">.com</span>
            </Link>

            {/* Delivery Location */}
            <div className="hidden lg:flex items-center gap-1 text-sm">
              <MapPin className="w-4 h-4" />
              <div>
                <div className="text-xs text-gray-300">Deliver to</div>
                <div className="font-medium">New York 10001</div>
              </div>
            </div>

            {/* Search Bar - Amazon style */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex">
                <select className="hidden sm:block bg-gray-700 text-white text-sm px-3 py-2 rounded-l-md border-r border-gray-600">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home</option>
                  <option>Toys</option>
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 text-gray-900 outline-none"
                />
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-r-md">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right Navigation */}
            <div className="flex items-center gap-4">
              <Link href="/account" className="text-sm hover:text-orange-400">
                <div className="hidden md:block">
                  <div className="text-xs text-gray-300">Hello, {user?.name?.split(' ')[0] || 'Sign in'}</div>
                  <div className="font-medium">Account & Lists</div>
                </div>
                <User className="md:hidden w-5 h-5" />
              </Link>

              <Link href="/wishlist" className="text-sm hover:text-orange-400 relative">
                <Heart className="w-5 h-5" />
                <div className="hidden md:block text-xs">Wishlist</div>
              </Link>

              <Link href="/cart" className="text-sm hover:text-orange-400 relative">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <div className="hidden md:block text-xs">Cart</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-gray-700 text-white text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-2">
            <Link href="/products" className="hover:text-orange-400 whitespace-nowrap flex items-center gap-1">
              <Menu className="w-4 h-4" />
              All
            </Link>
            <Link href="/products?category=Electronics" className="hover:text-orange-400 whitespace-nowrap">Electronics</Link>
            <Link href="/products?category=Fashion" className="hover:text-orange-400 whitespace-nowrap">Fashion</Link>
            <Link href="/products?category=Home" className="hover:text-orange-400 whitespace-nowrap">Home & Kitchen</Link>
            <Link href="/products?category=Toys" className="hover:text-orange-400 whitespace-nowrap">Toys & Games</Link>
            <Link href="/products?category=Books" className="hover:text-orange-400 whitespace-nowrap">Books</Link>
            <Link href="/products?category=Sports" className="hover:text-orange-400 whitespace-nowrap">Sports</Link>
            <Link href="/products?category=Gaming" className="hover:text-orange-400 whitespace-nowrap">Gaming</Link>
            <Link href="/products?category=Accessories" className="hover:text-orange-400 whitespace-nowrap">Accessories</Link>
            <Link href="/admin/dashboard" className="hover:text-orange-400 whitespace-nowrap ml-auto text-xs">
              Seller Dashboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}