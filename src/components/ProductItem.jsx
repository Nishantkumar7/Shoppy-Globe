import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingCart, Plus } from 'lucide-react';

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }));
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="card overflow-hidden">
        <div className="relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl
                     shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 
                     group-hover:opacity-100 transition-all duration-200 hover:bg-indigo-600 
                     hover:text-white"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
