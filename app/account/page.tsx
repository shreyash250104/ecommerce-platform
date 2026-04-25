'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/common/Button/Button';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('orders');

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  const orders = [
    { id: 'ORD-001', date: '2024-04-20', total: 1348, status: 'Delivered', items: 2 },
    { id: 'ORD-002', date: '2024-04-15', total: 89, status: 'Shipped', items: 1 },
  ];

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile Settings', icon: Settings },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"><User className="w-8 h-8" /></div>
          <div><h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1><p className="opacity-90">{user?.email}</p></div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors mb-1 ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}`}>
                  <div className="flex items-center gap-3"><Icon className="w-5 h-5" /><span>{tab.label}</span></div><ChevronRight className="w-4 h-4" />
                </button>
              );
            })}
            <button onClick={logout} className="w-full flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-red-50 text-red-600 mt-4 border-t pt-4">
              <div className="flex items-center gap-3"><LogOut className="w-5 h-5" /><span>Logout</span></div>
            </button>
          </div>
        </div>
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">My Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-12"><Package className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">No orders yet</p><Link href="/products"><Button className="mt-4">Start Shopping</Button></Link></div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3"><div><p className="font-semibold">Order #{order.id}</p><p className="text-sm text-gray-500">{order.date}</p></div><span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{order.status}</span></div>
                      <div className="flex justify-between items-center"><div><p className="text-sm text-gray-600">{order.items} items</p><p className="font-bold text-blue-600">${order.total.toFixed(2)}</p></div></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
              <Link href="/wishlist"><Button>View Wishlist</Button></Link>
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
              <form className="space-y-4">
                <div><label className="block text-sm font-medium mb-1">Full Name</label><input type="text" value={user?.name} className="w-full px-4 py-2 border rounded-lg bg-gray-50" disabled /></div>
                <div><label className="block text-sm font-medium mb-1">Email Address</label><input type="email" value={user?.email} className="w-full px-4 py-2 border rounded-lg bg-gray-50" disabled /></div>
                <p className="text-sm text-gray-500">For security, profile editing is disabled in demo mode.</p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}