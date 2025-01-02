import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Mail, User, MapPin, Phone, CreditCard } from 'lucide-react';

const FormField = ({ 
  icon, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange,
  maxLength 
}) => (
  <div className="relative">
    <div className="absolute left-4 top-3.5 text-gray-400">{icon}</div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
      maxLength={maxLength}
      className="input-search pl-12"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  if (cartItems.length === 0) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
            <div className="space-y-4">
              <FormField
                icon={<Mail size={20} />}
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <FormField
                icon={<User size={20} />}
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
              />
              <FormField
                icon={<MapPin size={20} />}
                type="text"
                name="address"
                placeholder="Shipping address"
                value={formData.address}
                onChange={handleChange}
              />
              <FormField
                icon={<Phone size={20} />}
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
            <div className="space-y-4">
              <FormField
                icon={<CreditCard size={20} />}
                type="text"
                name="cardNumber"
                placeholder="Card number"
                maxLength={19}
                value={formData.cardNumber}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  required
                  maxLength={5}
                  className="input-search"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  required
                  maxLength={3}
                  className="input-search"
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Place Order
          </button>
        </form>
        <div className="card p-6 space-y-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.title} × {item.quantity}
                </span>
                <span className="font-medium text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
