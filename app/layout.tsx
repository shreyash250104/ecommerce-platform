'use client';

import { Inter, Poppins } from 'next/font/google';
import Link from 'next/link';
import { ShoppingBag, Heart, User, LogOut } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/common/BackToTop';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartItems = useCartStore((state) => state.items);
  const { user, isAuthenticated, logout } = useAuthStore();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <title>ShopHub - Premium E-Commerce Platform</title>
        <meta name="description" content="Discover amazing products at unbeatable prices. Shop the best deals online with free shipping on orders over $50." />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopHub
              </Link>
              
              <div className="hidden md:flex items-center gap-8">
                <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Products
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Contact
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <Link href="/wishlist" className="relative group">
                  <Heart className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
                </Link>
                <Link href="/cart" className="relative group">
                  <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {itemCount}
                    </span>
                  )}
                </Link>
                
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <Link href="/account">
                      <span className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                        Hi, {user?.name}
                      </span>
                    </Link>
                    <button
                      onClick={logout}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <Link href="/auth/login">
                    <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        
        {children}
        
        <Footer />
        
        <BackToTop />
        
      </body>
    </html>
  );
}