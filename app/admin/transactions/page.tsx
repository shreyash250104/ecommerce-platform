'use client';

import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    { id: 'TXN-001', orderId: 'ORD-001', customer: 'John Doe', amount: 1348, method: 'Credit Card', status: 'Completed', date: '2024-04-20' },
    { id: 'TXN-002', orderId: 'ORD-002', customer: 'Jane Smith', amount: 299, method: 'PayPal', status: 'Completed', date: '2024-04-19' },
    { id: 'TXN-003', orderId: 'ORD-003', customer: 'Mike Johnson', amount: 89, method: 'Credit Card', status: 'Pending', date: '2024-04-19' },
    { id: 'TXN-004', orderId: 'ORD-004', customer: 'Sarah Williams', amount: 1199, method: 'Debit Card', status: 'Completed', date: '2024-04-18' },
    { id: 'TXN-005', orderId: 'ORD-005', customer: 'David Brown', amount: 349, method: 'Credit Card', status: 'Completed', date: '2024-04-18' },
  ];

  const filteredTransactions = transactions.filter(t =>
    t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-500 mt-1">View all payment transactions</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Total Transactions</p>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Total Amount</p>
          <p className="text-2xl font-bold text-green-600">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Completed</p>
          <p className="text-2xl font-bold">
            {transactions.filter(t => t.status === 'Completed').length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by customer, transaction ID, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
               </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{transaction.id}</td>
                  <td className="px-6 py-4 text-blue-600">{transaction.orderId}</td>
                  <td className="px-6 py-4">{transaction.customer}</td>
                  <td className="px-6 py-4 font-semibold">${transaction.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500">{transaction.method}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}