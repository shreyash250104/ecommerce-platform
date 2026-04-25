'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useCartStore } from '@/stores/cartStore';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6">Save your favorite items here!</p>
        <Link href="/products"><Button>Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <span className="text-gray-500">{items.length} items</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover hover:scale-105 transition-transform" />
              </div>
            </Link>
            <Link href={`/product/${product.id}`}><h3 className="font-semibold text-gray-900 hover:text-blue-600">{product.name}</h3></Link>
            <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
              <div className="flex gap-2">
                <button onClick={() => addToCart(product)} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><ShoppingCart className="w-4 h-4" /></button>
                <button onClick={() => removeItem(product.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}