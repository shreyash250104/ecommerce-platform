'use client';

import Link from 'next/link';

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200', color: 'bg-blue-100', items: 150 },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200', color: 'bg-pink-100', items: 234 },
  { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200', color: 'bg-green-100', items: 189 },
  { name: 'Toys & Games', image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=200', color: 'bg-yellow-100', items: 67 },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200', color: 'bg-orange-100', items: 45 },
  { name: 'Books', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200', color: 'bg-purple-100', items: 890 },
  { name: 'Automotive', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200', color: 'bg-red-100', items: 34 },
  { name: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200', color: 'bg-teal-100', items: 123 },
];

export default function CategoryGrid() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold mb-4 border-l-4 border-orange-500 pl-3">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/products?category=${category.name}`}
            className="group text-center"
          >
            <div className={`${category.color} rounded-lg p-3 mb-2 transition-transform group-hover:scale-105`}>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-20 object-cover rounded"
              />
            </div>
            <h3 className="font-medium text-sm">{category.name}</h3>
            <p className="text-xs text-gray-500">{category.items} items</p>
          </Link>
        ))}
      </div>
    </div>
  );
}