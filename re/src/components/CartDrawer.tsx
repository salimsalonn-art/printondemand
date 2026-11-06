'use client';

import { useCart } from '@/context/CartContext';
import { X, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category?: string;
  size?: string;
  gender?: string;
  [key: string]: any;
}

interface CartContextType {
  cart: CartItem[];
  removeFromCart: (index: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalPrice: number;
}

export default function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, totalPrice } = useCart() as CartContextType;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12372A] text-[#F5EBDD] border-l border-[#F5EBDD]/20 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-[#F5EBDD]/20 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Your Shopping Cart ({cart.length})</h2>
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="p-2 text-[#F5EBDD]/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-[#F5EBDD]/60 py-10">Your cart is currently empty.</p>
            ) : (
              cart.map((item: CartItem, index: number) => (
                <div key={index} className="flex gap-4 p-4 rounded-xl bg-[#1B5E3B] border border-[#F5EBDD]/10">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <p className="text-xs text-[#F5EBDD]/70 mt-1">
                      {item.category === 'shirts' ? `Size: ${item.size} | Fit: ${item.gender}` : 'Standard'}
                    </p>
                    <span className="text-sm font-black text-white mt-1 block">${item.price}</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#F5EBDD]/20 bg-[#12372A]">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Subtotal:</span>
                <span className="text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-[#C62828] hover:bg-[#a82020] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}