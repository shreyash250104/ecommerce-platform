'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12"><h1 className="text-4xl font-bold mb-4">Contact Us</h1><p className="text-xl text-gray-600">Have questions? We'd love to hear from you.</p></div>
      <div className="grid md:grid-cols-2 gap-12">
        <div><div className="bg-gray-50 rounded-xl p-6 mb-6"><h2 className="text-2xl font-bold mb-6">Get in Touch</h2><div className="space-y-4"><div className="flex items-start gap-4"><MapPin className="w-6 h-6 text-blue-600 mt-1" /><div><h3 className="font-semibold">Visit Us</h3><p className="text-gray-600">123 Commerce Street, Digital City, DC 12345</p></div></div><div className="flex items-start gap-4"><Phone className="w-6 h-6 text-blue-600 mt-1" /><div><h3 className="font-semibold">Call Us</h3><p className="text-gray-600">+1 (555) 123-4567<br />Mon-Fri, 9am-6pm</p></div></div><div className="flex items-start gap-4"><Mail className="w-6 h-6 text-blue-600 mt-1" /><div><h3 className="font-semibold">Email Us</h3><p className="text-gray-600">support@shophub.com</p></div></div><div className="flex items-start gap-4"><Clock className="w-6 h-6 text-blue-600 mt-1" /><div><h3 className="font-semibold">Working Hours</h3><p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p></div></div></div></div></div>
        <div className="bg-white border rounded-xl p-6 shadow-sm"><h2 className="text-2xl font-bold mb-6">Send us a Message</h2>{submitted && <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">Thank you for your message! We'll get back to you soon.</div>}<form onSubmit={handleSubmit} className="space-y-4"><input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /><input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /><input type="text" name="subject" placeholder="Subject" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /><textarea name="message" rows={5} placeholder="Message" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /><Button type="submit" fullWidth><Send className="w-4 h-4 mr-2" />Send Message</Button></form></div>
      </div>
    </div>
  );
}