'use client';

import { useCart, CartItem } from '../context/CartContext';
import { X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#12372A]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out drawer panel - Luxury Cream #F5EBDD */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F5EBDD] text-[#12372A] border-l border-[#12372A]/15 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-[#12372A]/15 flex items-center justify-between bg-white/60 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C62828] flex items-center justify-center text-white text-base shadow-md">
                🎅
              </div>
              <div>
                <h2 className="text-base font-black text-[#12372A] uppercase tracking-wider">Your Shopping Cart</h2>
                <span className="text-[10px] text-[#C62828] font-black uppercase tracking-widest block mt-0.5">
                  {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Reserved
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="p-2 text-[#12372A]/60 hover:text-[#12372A] rounded-full hover:bg-[#12372A]/5 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-16 h-16 bg-white border border-[#12372A]/10 rounded-full flex items-center justify-center mx-auto text-2xl shadow-sm">
                  🛍️
                </div>
                <p className="text-sm font-bold text-[#12372A]">Your cart is currently empty.</p>
                <p className="text-xs text-[#12372A]/60 max-w-xs mx-auto">Explore our holiday apparel and tech catalog to add your first item.</p>
              </div>
            ) : (
              cart.map((item: CartItem, index: number) => (
                <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white border border-[#12372A]/10 shadow-md relative group">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 pr-6">
                    <h4 className="font-bold text-[#12372A] text-xs leading-snug line-clamp-2">{item.name}</h4>
                    <p className="text-[10px] text-[#C62828] font-extrabold tracking-wider mt-1 uppercase">
                      {item.category === 'shirts' ? `${item.gender}'s Cut • Size ${item.size}` : 'Smart Gadget'}
                    </p>
                    <span className="text-sm font-black text-[#12372A] mt-1.5 block">${item.price}</span>
                  </div>

                  <button 
                    onClick={() => removeFromCart(index)}
                    className="absolute top-4 right-4 text-rose-600 hover:text-rose-700 p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#12372A]/15 bg-white shadow-xl space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#12372A]/70 font-medium">
                  <span>Shipping Protection</span>
                  <span className="text-emerald-700 font-extrabold uppercase tracking-wider text-[10px]">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#12372A] pt-2 border-t border-gray-100">
                  <span>Subtotal:</span>
                  <span className="text-[#C62828]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-gradient-to-r from-[#C62828] to-[#900C3F] hover:from-[#a82020] hover:to-[#C62828] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#C62828]/20 transition transform active:scale-95"
              >
                Proceed to Secure Checkout <ArrowRight className="w-4 h-4 text-amber-300" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#12372A]/60 uppercase tracking-widest font-extrabold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Encrypted 256-Bit Stripe & PayPal Checkout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}