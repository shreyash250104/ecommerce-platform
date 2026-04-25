'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { useCartStore } from '@/stores/cartStore';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
        <Link href="/products"><Button>Continue Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={`/product/${item.product.id}`}><h3 className="font-semibold hover:text-blue-600">{item.product.name}</h3></Link>
                <p className="text-gray-500 text-sm">{item.product.brand}</p>
                <p className="text-blue-600 font-bold mt-1">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1 rounded border hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1 rounded border hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
                <button onClick={() => removeItem(item.productId)} className="p-1 rounded border border-red-200 hover:bg-red-50 ml-2"><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="border-t pt-2 mt-2"><div className="flex justify-between font-bold text-lg"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div></div>
          </div>
          <Link href="/checkout"><Button fullWidth>Proceed to Checkout</Button></Link>
        </div>
      </div>
    </div>
  );
}