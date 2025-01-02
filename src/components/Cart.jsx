import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-indigo-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag size={32} className="text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Time to start shopping! Discover our amazing products.</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="card p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="btn-primary w-full"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
