'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  Eye,
  ChevronRight,
  Mail,
  Phone,
  Star
} from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { mockProducts } from '@/data/products';

export default function AdminDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const [stats] = useState({
    totalRevenue: 45230,
    totalOrders: 342,
    totalCustomers: 1289,
    totalProducts: mockProducts.length,
  });

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: 1348, status: 'Delivered', date: '2024-04-20' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 299, status: 'Shipped', date: '2024-04-19' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: 89, status: 'Processing', date: '2024-04-19' },
    { id: 'ORD-004', customer: 'Sarah Williams', amount: 1199, status: 'Pending', date: '2024-04-18' },
    { id: 'ORD-005', customer: 'David Brown', amount: 349, status: 'Delivered', date: '2024-04-18' },
  ];

  // Customer data for display
  const topCustomers = [
    { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', phone: '+1 555-123-4567', orders: 5, totalSpent: 2348, status: 'Active', joinDate: '2024-01-15' },
    { id: 'CUST-002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-234-5678', orders: 3, totalSpent: 899, status: 'Active', joinDate: '2024-02-20' },
    { id: 'CUST-003', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 555-345-6789', orders: 7, totalSpent: 2450, status: 'Active', joinDate: '2023-12-10' },
    { id: 'CUST-004', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 555-456-7890', orders: 2, totalSpent: 1598, status: 'Active', joinDate: '2024-03-05' },
    { id: 'CUST-005', name: 'David Brown', email: 'david@example.com', phone: '+1 555-567-8901', orders: 4, totalSpent: 1249, status: 'Active', joinDate: '2024-01-28' },
  ];

  const statCards = [
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', growth: '+12.5%' },
    { title: 'Total Orders', value: stats.totalOrders.toLocaleString(), icon: ShoppingBag, color: 'bg-blue-500', growth: '+8.2%' },
    { title: 'Total Customers', value: stats.totalCustomers.toLocaleString(), icon: Users, color: 'bg-purple-500', growth: '+15.3%' },
    { title: 'Total Products', value: stats.totalProducts.toLocaleString(), icon: Package, color: 'bg-orange-500', growth: '+5.0%' },
  ];

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.growth}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link href="/admin/orders">
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">View All →</span>
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.amount.toLocaleString()}</p>
                  <p className={`text-xs ${
                    order.status === 'Delivered' ? 'text-green-600' :
                    order.status === 'Shipped' ? 'text-blue-600' : 'text-yellow-600'
                  }`}>{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Customers</h2>
            <Link href="/admin/customers">
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">View All →</span>
            </Link>
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{customer.name}</p>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{customer.orders} orders</span>
                    <span className="text-xs font-medium text-blue-600">${customer.totalSpent.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewCustomer(customer)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue Overview (Last 12 Months)</h2>
        <div className="h-64 flex items-end gap-2">
          {[65, 45, 75, 55, 85, 70, 90, 80, 95, 85, 75, 88].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-700 cursor-pointer"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-500">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Detail Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 sticky top-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Customer Details</h3>
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Customer Basic Info */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold">{selectedCustomer.name}</h4>
                  <p className="text-gray-500">Customer ID: {selectedCustomer.id}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Active</span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">Verified</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h5 className="font-semibold mb-3">Contact Information</h5>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Customer Statistics */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedCustomer.orders}</p>
                  <p className="text-xs text-gray-500">Total Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">${selectedCustomer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedCustomer.joinDate}</p>
                  <p className="text-xs text-gray-500">Member Since</p>
                </div>
              </div>

              {/* Recent Orders for this customer */}
              <div className="mb-6">
                <h5 className="font-semibold mb-3">Recent Orders</h5>
                <div className="space-y-2">
                  {recentOrders.filter(o => o.customer === selectedCustomer.name).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">${order.amount.toLocaleString()}</p>
                        <p className={`text-xs ${
                          order.status === 'Delivered' ? 'text-green-600' :
                          order.status === 'Shipped' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Link href={`/admin/customers/${selectedCustomer.id}`}>
                  <Button variant="primary" size="sm">
                    View Full Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm">Send Email</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}