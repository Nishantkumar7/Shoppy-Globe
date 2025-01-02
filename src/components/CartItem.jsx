import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cartSlice';
import { Trash2, Minus, Plus } from 'lucide-react';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="card p-4 flex gap-6">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-32 h-32 object-cover rounded-xl"
      />
      
      <div className="flex-grow space-y-3">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
        
        <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          ${item.price}
        </p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-3 py-2 hover:bg-gray-100 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 font-medium text-gray-700 min-w-[40px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-3 py-2 hover:bg-gray-100 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="text-right text-gray-500">
            Total: <span className="font-semibold text-gray-800">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
