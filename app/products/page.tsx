'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { mockProducts } from '@/data/products';
import { Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }
    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600">Discover our amazing collection</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
          <div className="flex border rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 px-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
              <Grid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 px-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-500">Found {filteredProducts.length} products</div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found</p>
          <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="mt-4 text-blue-600 hover:underline">Clear all filters</button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="flex gap-4 bg-white rounded-xl shadow-sm p-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden relative">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-lg font-bold text-blue-600 mt-1">${product.price}</p>
              </div>
              <div className="flex items-center">
                <Link href={`/product/${product.id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}