'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Eye, 
  Mail, 
  Phone, 
  DollarSign,
  ShoppingBag,
  Calendar,
  TrendingUp,
  Download
} from 'lucide-react';
import { Button } from '@/components/common/Button/Button';

export default function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const customers = [
    { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', phone: '+1 555-123-4567', orders: 5, totalSpent: 2348, joined: '2024-01-15', status: 'Active', lastOrder: '2024-04-20' },
    { id: 'CUST-002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-234-5678', orders: 3, totalSpent: 899, joined: '2024-02-20', status: 'Active', lastOrder: '2024-04-18' },
    { id: 'CUST-003', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 555-345-6789', orders: 7, totalSpent: 2450, joined: '2023-12-10', status: 'Active', lastOrder: '2024-04-10' },
    { id: 'CUST-004', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 555-456-7890', orders: 2, totalSpent: 1598, joined: '2024-03-05', status: 'Active', lastOrder: '2024-04-15' },
    { id: 'CUST-005', name: 'David Brown', email: 'david@example.com', phone: '+1 555-567-8901', orders: 4, totalSpent: 1249, joined: '2024-01-28', status: 'Active', lastOrder: '2024-04-12' },
    { id: 'CUST-006', name: 'Emily Davis', email: 'emily@example.com', phone: '+1 555-678-9012', orders: 1, totalSpent: 199, joined: '2024-04-01', status: 'New', lastOrder: '2024-04-05' },
  ];

  const totalStats = {
    totalCustomers: customers.length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    totalOrders: customers.reduce((sum, c) => sum + c.orders, 0),
    avgOrderValue: Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.orders, 0)),
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-500 mt-1">Complete customer analytics and management</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">{totalStats.totalCustomers}</p>
              <p className="text-green-600 text-sm mt-1">↑ 15% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${totalStats.totalRevenue.toLocaleString()}</p>
              <p className="text-green-600 text-sm mt-1">↑ 23% from last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{totalStats.totalOrders}</p>
              <p className="text-green-600 text-sm mt-1">↑ 8% from last month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Order Value</p>
              <p className="text-3xl font-bold text-gray-900">${totalStats.avgOrderValue}</p>
              <p className="text-green-600 text-sm mt-1">↑ 5% from last month</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Customers Table with All Details */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Avg Order</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Last Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{customer.phone}</span>
                      </div>
                    </div>
                   </td>
                  <td className="px-6 py-4 text-center">{customer.orders}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">${customer.totalSpent.toLocaleString()}</span>
                   </td>
                  <td className="px-6 py-4">${Math.round(customer.totalSpent / customer.orders)}</td>
                  <td className="px-6 py-4 text-gray-500">{customer.joined}</td>
                  <td className="px-6 py-4 text-gray-500">{customer.lastOrder}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {customer.status}
                    </span>
                   </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/customers/${customer.id}`}>
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </Link>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}