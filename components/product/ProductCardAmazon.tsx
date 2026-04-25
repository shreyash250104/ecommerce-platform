'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { cn } from '@/utils/cn';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCardAmazon = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const [isLoading, setIsLoading] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
    }, 300);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card group">
      {/* Wishlist Button */}
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <div className="relative h-40 overflow-hidden bg-white">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="product-image"
            />
          </div>
        </Link>
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={cn(
              'w-4 h-4',
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
            )}
          />
        </button>
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
            -{discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-sm text-gray-900 hover:text-orange-500 line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 mt-1">{product.brand}</p>

        {/* Rating - Amazon style */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3 h-3',
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                )}
              />
            ))}
          </div>
          <span className="text-xs text-blue-600">({product.reviews.length})</span>
        </div>

        {/* Price - Amazon style */}
        <div className="mt-2">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-gray-400 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs text-green-600 ml-1">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
            </>
          )}
        </div>

        {/* Free delivery badge */}
        <p className="text-xs text-gray-500 mt-1">FREE delivery {Math.floor(Math.random() * 5) + 1}-{Math.floor(Math.random() * 5) + 4} days</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};