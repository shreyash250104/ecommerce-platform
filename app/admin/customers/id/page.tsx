'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  DollarSign,
  Package,
  CheckCircle,
  Clock,
  Truck,
  Star,
  Eye
} from 'lucide-react';
import { Button } from '@/components/common/Button/Button';

// Mock customer data
const customers = [
  { 
    id: 'CUST-001', 
    name: 'John Doe', 
    email: 'john@example.com', 
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    joinDate: '2024-01-15',
    totalOrders: 5,
    totalSpent: 2348,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
  },
  { 
    id: 'CUST-002', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    phone: '+1 (555) 234-5678',
    address: '456 Oak Avenue, Los Angeles, CA 90001',
    joinDate: '2024-02-20',
    totalOrders: 3,
    totalSpent: 899,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  },
  { 
    id: 'CUST-003', 
    name: 'Mike Johnson', 
    email: 'mike@example.com', 
    phone: '+1 (555) 345-6789',
    address: '789 Pine Road, Chicago, IL 60601',
    joinDate: '2023-12-10',
    totalOrders: 7,
    totalSpent: 2450,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
  },
  { 
    id: 'CUST-004', 
    name: 'Sarah Williams', 
    email: 'sarah@example.com', 
    phone: '+1 (555) 456-7890',
    address: '321 Elm Street, Houston, TX 77001',
    joinDate: '2024-03-05',
    totalOrders: 2,
    totalSpent: 1598,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
  },
  { 
    id: 'CUST-005', 
    name: 'David Brown', 
    email: 'david@example.com', 
    phone: '+1 (555) 567-8901',
    address: '654 Maple Drive, Phoenix, AZ 85001',
    joinDate: '2024-01-28',
    totalOrders: 4,
    totalSpent: 1249,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  },
  { 
    id: 'CUST-006', 
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    phone: '+1 (555) 678-9012',
    address: '987 Cedar Lane, Seattle, WA 98101',
    joinDate: '2024-04-01',
    totalOrders: 1,
    totalSpent: 199,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
  },
];

// Mock orders for customer
const getCustomerOrders = (customerId: string) => {
  const ordersMap: Record<string, any[]> = {
    'CUST-001': [
      { id: 'ORD-001', date: '2024-04-20', amount: 1348, status: 'Delivered', items: 2, payment: 'Credit Card' },
      { id: 'ORD-002', date: '2024-03-15', amount: 299, status: 'Delivered', items: 1, payment: 'PayPal' },
      { id: 'ORD-003', date: '2024-02-10', amount: 701, status: 'Shipped', items: 3, payment: 'Credit Card' },
    ],
    'CUST-002': [
      { id: 'ORD-004', date: '2024-04-18', amount: 599, status: 'Delivered', items: 2, payment: 'Credit Card' },
      { id: 'ORD-005', date: '2024-03-20', amount: 300, status: 'Delivered', items: 1, payment: 'PayPal' },
    ],
    'CUST-003': [
      { id: 'ORD-006', date: '2024-04-10', amount: 899, status: 'Delivered', items: 3, payment: 'Credit Card' },
      { id: 'ORD-007', date: '2024-03-05', amount: 450, status: 'Delivered', items: 2, payment: 'Credit Card' },
      { id: 'ORD-008', date: '2024-02-01', amount: 1101, status: 'Delivered', items: 4, payment: 'PayPal' },
    ],
  };
  return ordersMap[customerId] || [
    { id: 'ORD-009', date: '2024-04-15', amount: 199, status: 'Delivered', items: 1, payment: 'Credit Card' },
  ];
};

export default function CustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const customer = customers.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState('orders');

  if (!customer) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Customer Not Found</h2>
        <Link href="/admin/customers">
          <Button>Back to Customers</Button>
        </Link>
      </div>
    );
  }

  const customerOrders = getCustomerOrders(customer.id);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Delivered: 'bg-green-100 text-green-700',
      Shipped: 'bg-blue-100 text-blue-700',
      Processing: 'bg-yellow-100 text-yellow-700',
      Pending: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Processing': return <Clock className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Customer Details</h1>
          <p className="text-gray-500 mt-1">View and manage customer information</p>
        </div>
      </div>

      {/* Customer Profile Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{customer.name}</h2>
              <p className="opacity-90">Customer ID: {customer.id}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {customer.status}
                </span>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  Verified Customer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-bold">{customer.totalOrders}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-xl font-bold">${customer.totalSpent.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-xl font-bold">{customer.joinDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Star className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Loyalty Points</p>
              <p className="text-xl font-bold">{Math.floor(customer.totalSpent / 10)}</p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:col-span-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Shipping Address</p>
                <p className="font-medium">{customer.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-6 px-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 px-1 font-medium transition-colors relative ${
                activeTab === 'orders'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-3 px-1 font-medium transition-colors relative ${
                activeTab === 'activity'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Recent Activity
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-3 px-1 font-medium transition-colors relative ${
                activeTab === 'notes'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Customer Notes
            </button>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {customerOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3 text-gray-500">{order.date}</td>
                      <td className="px-4 py-3">{order.items} items</td>
                      <td className="px-4 py-3 font-semibold">${order.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-500">{order.payment}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/orders/${order.id}`}>
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            View Details
                          </button>
                        </Link>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="p-6">
            <div className="space-y-4">
              {[
                { action: 'Placed order #ORD-001', date: '2024-04-20 14:30', amount: '$1,348' },
                { action: 'Added items to wishlist', date: '2024-04-18 10:15', items: 'iPhone 15 Pro' },
                { action: 'Logged in', date: '2024-04-18 09:00' },
                { action: 'Placed order #ORD-002', date: '2024-03-15 16:45', amount: '$299' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <div className="flex gap-4 mt-1">
                      <p className="text-sm text-gray-500">{activity.date}</p>
                      {activity.amount && <p className="text-sm font-medium text-green-600">{activity.amount}</p>}
                      {activity.items && <p className="text-sm text-gray-500">Items: {activity.items}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="p-6">
            <div className="mb-4">
              <textarea
                placeholder="Add a note about this customer..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                rows={4}
              />
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add Note
              </button>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Previous Notes</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">Customer requested premium shipping for future orders.</p>
                  <p className="text-xs text-gray-500 mt-1">Added by Admin on 2024-04-15</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">VIP customer - eligible for 10% discount.</p>
                  <p className="text-xs text-gray-500 mt-1">Added by Admin on 2024-03-20</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 flex gap-3">
          <Button variant="primary">Edit Customer</Button>
          <Button variant="outline">Send Email</Button>
          <Button variant="outline">View Analytics</Button>
        </div>
      </div>
    </div>
  );
}