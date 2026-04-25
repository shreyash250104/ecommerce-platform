'use client';

import { Users, Award, Clock, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About ShopHub</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your trusted destination for quality products since 2020
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            ShopHub was founded in 2020 with a simple mission: to provide customers with 
            high-quality products at affordable prices, backed by exceptional customer service.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            What started as a small online store has grown into a trusted e-commerce platform 
            serving thousands of happy customers across the country.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe that everyone deserves access to premium products without breaking the bank. 
            That's why we carefully curate our collection, negotiate the best prices, and pass the 
            savings directly to you.
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p className="mb-4">
            To revolutionize online shopping by offering the perfect blend of quality, 
            affordability, and convenience.
          </p>
          <h3 className="text-xl font-bold mb-4 mt-6">Our Vision</h3>
          <p>
            To become the most customer-centric e-commerce platform, where shopping is not just 
            a transaction, but an experience.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <div className="text-3xl font-bold">10K+</div>
          <div className="text-gray-600">Happy Customers</div>
        </div>
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <div className="text-3xl font-bold">500+</div>
          <div className="text-gray-600">Products</div>
        </div>
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <div className="text-3xl font-bold">24/7</div>
          <div className="text-gray-600">Support</div>
        </div>
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <div className="text-3xl font-bold">50+</div>
          <div className="text-gray-600">Countries</div>
        </div>
      </div>

      {/* Values Section */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="font-bold mb-2">Quality First</h3>
            <p className="text-gray-600">We never compromise on quality, ensuring every product meets our high standards.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💚</span>
            </div>
            <h3 className="font-bold mb-2">Customer Focus</h3>
            <p className="text-gray-600">Your satisfaction is our top priority. We're here to help 24/7.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="font-bold mb-2">Sustainability</h3>
            <p className="text-gray-600">Committed to eco-friendly practices and sustainable packaging.</p>
          </div>
        </div>
      </div>
    </div>
  );
}