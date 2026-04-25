'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    image: 'https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2025/MLP/MLP_TVOD_3000x1200_YT_V1._CB543254613_.jpg',
    title: 'Electronics Sale',
    subtitle: 'Up to 70% off',
  },
  {
    id: 2,
    image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/Clearance/Jan25/Unrec/D24756726_IN_PC_BAU_1500x600._CB543254611_.jpg',
    title: 'Fashion Week',
    subtitle: 'Minimum 50% off',
  },
  {
    id: 3,
    image: 'https://images-eu.ssl-images-amazon.com/images/G/31/2023/Laptops/Feb/1493412_500._CB543254612_.jpg',
    title: 'Home Decor',
    subtitle: 'Great discounts',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative">
      <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute w-full h-full transition-transform duration-500 ${
              index === current ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ transform: `translateX(${(index - current) * 100}%)` }}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
              <div className="ml-8 md:ml-16 text-white">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">{banner.title}</h2>
                <p className="text-sm md:text-lg mt-2">{banner.subtitle}</p>
                <button className="mt-4 bg-orange-500 hover:bg-orange-600 px-4 md:px-6 py-2 rounded text-sm md:text-base">
                  Shop Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-orange-500 w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}