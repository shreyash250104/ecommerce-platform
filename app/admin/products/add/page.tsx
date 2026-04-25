'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Electronics',
    brand: '',
    stock: '',
    colors: '',
    specifications: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Product added successfully!');
      router.push('/admin/products');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500 mt-1">Create a new product listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="Enter product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price *</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Original Price</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                >
                  <option>Electronics</option>
                  <option>Gaming Gear</option>
                  <option>Accessories</option>
                  <option>Smart Home</option>
                  <option>Audio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Brand *</label>
                <input
                  type="text"
                  name="brand"
                  required
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter brand"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                required
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Colors (comma separated)</label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="Black, White, Blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product Images</label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click or drag images here to upload</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Specifications (JSON format)</label>
              <textarea
                name="specifications"
                rows={4}
                value={formData.specifications}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 font-mono text-sm"
                placeholder='{"Processor": "Intel i7", "RAM": "16GB"}'
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t mt-6">
          <Button type="submit" isLoading={loading}>
            Add Product
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}