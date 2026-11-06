
'use client';

import { useCart, CartItem } from '../context/CartContext';
import {
  X,
  Trash2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Gift,
} from 'lucide-react';
import Link from 'next/link';

const PRODUCT_PRICE = 24.99;

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const itemCount = cart.length;
  const subtotal = itemCount * PRODUCT_PRICE;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">

      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close shopping cart"
        className="absolute inset-0 w-full h-full bg-[#12372A]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F5EBDD] text-[#12372A] border-l border-[#12372A]/15 shadow-2xl flex flex-col">

          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#12372A]/15 flex items-center justify-between bg-white/70 backdrop-blur">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C62828] flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>

              <div>
                <h2 className="text-sm sm:text-base font-black uppercase tracking-wider">
                  Your Shopping Cart
                </h2>

                <span className="text-[10px] text-[#C62828] font-black uppercase tracking-widest block mt-0.5">
                  {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-2 text-[#12372A]/60 hover:text-[#12372A] rounded-full hover:bg-[#12372A]/5 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Banner */}
          {itemCount > 0 && (
            <div className="px-6 py-3 bg-[#12372A] text-[#F5EBDD] flex items-center justify-center gap-2">
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">
                Free Shipping on Every Order
              </span>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">

            {itemCount === 0 ? (
              <div className="text-center py-20 space-y-4">

                <div className="w-20 h-20 bg-white border border-[#12372A]/10 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <ShoppingBag className="w-8 h-8 text-[#12372A]/50" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-black text-[#12372A]">
                    Your cart is waiting for some Christmas magic.
                  </h3>

                  <p className="text-xs text-[#12372A]/60 max-w-xs mx-auto leading-relaxed">
                    Discover our festive collection and find something worth celebrating.
                  </p>
                </div>

                <Link
                  href="/"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#1B5E3B] text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

              </div>
            ) : (
              <>
                {cart.map((item: CartItem, index: number) => (
                  <div
                    key={`${item.id}-${item.size || ''}-${item.gender || ''}-${index}`}
                    className="flex gap-4 p-4 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm relative group"
                  >

                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 pr-6">

                      <h4 className="font-bold text-[#12372A] text-xs leading-snug line-clamp-2">
                        {item.name}
                      </h4>

                      <p className="text-[10px] text-[#C62828] font-extrabold tracking-wider mt-1.5 uppercase">
                        {item.category === 'shirts'
                          ? `${item.gender || 'Unisex'}'s Cut • Size ${item.size || 'M'}`
                          : item.category}
                      </p>

                      <span className="text-sm font-black text-[#12372A] mt-2 block">
                        ${PRODUCT_PRICE.toFixed(2)}
                      </span>

                    </div>

                    {/* Remove Item */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(index)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="absolute top-3 right-3 text-rose-600 hover:text-rose-700 p-2 rounded-lg bg-rose-50 hover:bg-rose-100 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>
                ))}

                <div className="flex items-center justify-center gap-2 py-3 text-[10px] text-[#12372A]/60 font-bold uppercase tracking-widest">
                  <Gift className="w-4 h-4 text-[#C62828]" />
                  A little something for the holidays
                </div>
              </>
            )}

          </div>

          {/* Footer */}
          {itemCount > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#12372A]/15 bg-white shadow-xl space-y-4">

              {/* Price Summary */}
              <div className="space-y-3 text-xs">

                <div className="flex justify-between text-[#12372A]/70 font-medium">
                  <span>Items ({itemCount})</span>
                  <span className="font-bold text-[#12372A]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-[#12372A]/70 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    Standard Shipping
                  </span>

                  <span className="text-emerald-700 font-extrabold uppercase tracking-wider text-[10px]">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-[#12372A] pt-3 border-t border-gray-100">
                  <span>Subtotal</span>

                  <span className="text-[#C62828]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-gradient-to-r from-[#C62828] to-[#900C3F] hover:from-[#a82020] hover:to-[#C62828] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#C62828]/20 transition transform active:scale-[0.98]"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </Link>

              {/* Trust Message */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#12372A]/60 uppercase tracking-widest font-extrabold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Secure Payment Options
              </div>

              <p className="text-center text-[10px] text-gray-400">
                Free shipping · $24.99 per item
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
