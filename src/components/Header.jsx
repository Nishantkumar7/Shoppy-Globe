import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Globe } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-xl">
            <Globe size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ShoppyGlobe
          </span>
        </Link>
        
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            Home
          </Link>
          <Link to="/cart" className="relative group">
            <div className="bg-gray-100 group-hover:bg-indigo-100 p-3 rounded-xl transition-colors">
              <ShoppingCart className="text-gray-600 group-hover:text-indigo-600 transition-colors" size={22} />
            </div>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs 
                             rounded-full h-6 w-6 flex items-center justify-center 
                             border-2 border-white font-medium">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
