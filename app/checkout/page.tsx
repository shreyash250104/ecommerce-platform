'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/common/Button/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">Please login to complete your purchase</p>
        <Link href="/auth/login"><Button>Login to Checkout</Button></Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully!');
    clearCart();
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <input type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
              <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" name="address" placeholder="Address" required value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
                <input type="text" name="zipCode" placeholder="Zip Code" required value={formData.zipCode} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="space-y-4">
              <input type="text" name="cardNumber" placeholder="Card Number" required value={formData.cardNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="expiryDate" placeholder="MM/YY" required value={formData.expiryDate} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
                <input type="text" name="cvv" placeholder="CVV" required value={formData.cvv} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
              </div>
            </div>
          </div>
          <Button type="submit" fullWidth size="lg">Place Order - ${finalTotal.toFixed(2)}</Button>
        </form>
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {items.map(item => (<div key={item.productId} className="flex justify-between py-2"><span>{item.product.name} x {item.quantity}</span><span>${(item.product.price * item.quantity).toFixed(2)}</span></div>))}
          <div className="border-t mt-4 pt-4"><div className="flex justify-between font-bold text-lg"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div></div>
        </div>
      </div>
    </div>
  );
}