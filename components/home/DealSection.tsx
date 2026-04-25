'use client';

import Link from 'next/link';
import { Clock } from 'lucide-react';
import { ProductCardAmazon } from '@/components/product/ProductCardAmazon';
import { mockProducts } from '@/data/products';

export default function DealSection() {
  const dealProducts = mockProducts.slice(0, 4);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Today's Deals</h2>
          <div className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Ends in 12:34:56</span>
          </div>
        </div>
        <Link href="/products" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
          See all deals →
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {dealProducts.map((product) => (
          <ProductCardAmazon key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}