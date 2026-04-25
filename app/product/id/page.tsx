'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { mockProducts } from '@/data/products';
import { cn } from '@/utils/cn';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = mockProducts.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  
  const wishlistStatus = product ? isInWishlist(product.id) : false;
  
  const toggleWishlist = () => {
    if (product) {
      if (wishlistStatus) {
        removeItem(product.id);
      } else {
        addItem(product);
      }
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex gap-2 mb-3">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">New Arrival</span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Save {discount}%</span>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.brand}</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    'w-5 h-5',
                    i < Math.floor(product.rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  )} 
                />
              ))}
            </div>
            <span className="text-gray-500">({product.reviews.length} customer reviews)</span>
          </div>

          <div className="mb-4">
            <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                <span className="text-green-600 ml-2">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
              </>
            )}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Colors</h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-600 transition-colors"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {Object.keys(product.specifications).length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="w-1/2 text-gray-600">{key}:</span>
                    <span className="w-1/2 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 px-3 hover:bg-gray-100">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2 px-3 hover:bg-gray-100">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-500">{product.stock} items available</span>
          </div>

          <div className="flex gap-4 mb-8">
            <Button onClick={handleAddToCart} size="lg" className="flex-1">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" onClick={toggleWishlist}>
              <Heart className={cn('w-5 h-5', wishlistStatus && 'fill-red-500 text-red-500')} />
            </Button>
          </div>

          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>2-year warranty on all products</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              <span>30-day return policy - easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}