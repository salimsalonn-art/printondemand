'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShieldCheck, ArrowLeft, Lock, CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5EBDD] via-[#FAF5EE] to-[#EFE2CF] text-[#12372A] flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-white p-10 sm:p-12 rounded-3xl border border-[#12372A]/15 shadow-2xl max-w-md w-full text-center space-y-6 relative overflow-hidden">
          <div className="w-20 h-20 bg-[#12372A] rounded-full flex items-center justify-center mx-auto text-3xl text-[#F5EBDD] shadow-xl border border-[#D4AF37]/40">
            ✓
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#C62828]">Order Confirmed</span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#12372A]">Thank You for Your Order!</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              We've received your request and sent a receipt confirmation to your email address.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F5EBDD]/60 border border-[#12372A]/10 text-xs text-[#12372A]/80 font-medium">
            Order Reference: <strong className="text-[#12372A] font-extrabold">#FV-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
          </div>
          <Link
            href="/"
            className="block w-full bg-[#12372A] hover:bg-[#1B5E3B] text-[#F5EBDD] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition shadow-lg"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EBDD] via-[#FAF5EE] to-[#EFE2CF] text-[#12372A] py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#C62828] selection:text-white">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#12372A]/70 hover:text-[#C62828] mb-8 transition text-xs font-bold tracking-widest uppercase">
          <ArrowLeft className="w-4 h-4" /> Return to Boutique
        </Link>

        <div className="mb-8">
          <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C62828]">Fast & Encrypted</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#12372A] tracking-tight mt-1">Complete Your Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form Area */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Shipping Address */}
            <div className="bg-white p-8 rounded-3xl border border-[#12372A]/15 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-base font-black text-[#12372A] uppercase tracking-wider flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#12372A] text-white flex items-center justify-center text-xs font-extrabold">1</span>
                  Shipping Information
                </h2>
                <span className="text-[11px] text-gray-400 font-semibold">Step 1 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">First Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John"
                    className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">Last Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">Email Address (For Order Tracking)</label>
                <input
                  required
                  type="email"
                  placeholder="john.doe@example.com"
                  className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">Street Address</label>
                <input
                  required
                  type="text"
                  placeholder="123 Holiday Lane"
                  className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">City</label>
                  <input
                    required
                    type="text"
                    placeholder="Arlington"
                    className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">State</label>
                  <input
                    required
                    type="text"
                    placeholder="VA"
                    className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">ZIP Code</label>
                  <input
                    required
                    type="text"
                    placeholder="22201"
                    className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white p-8 rounded-3xl border border-[#12372A]/15 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-base font-black text-[#12372A] uppercase tracking-wider flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#12372A] text-white flex items-center justify-center text-xs font-extrabold">2</span>
                  Payment Method
                </h2>
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-extrabold uppercase tracking-wider">
                  <Lock className="w-3 h-3" /> SSL Encrypted
                </span>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                    paymentMethod === 'card'
                      ? 'bg-[#12372A] border-[#12372A] text-white shadow-md'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5" />
                    <div>
                      <span className="block text-xs font-extrabold uppercase tracking-wider">Credit Card</span>
                      <span className="text-[10px] opacity-75">Visa, Mastercard, Amex</span>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#12372A] border-[#12372A] text-white shadow-md'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black italic">P</span>
                    <div>
                      <span className="block text-xs font-extrabold uppercase tracking-wider">PayPal Express</span>
                      <span className="text-[10px] opacity-75">One-click checkout</span>
                    </div>
                  </div>
                  {paymentMethod === 'paypal' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">Card Number</label>
                    <input
                      required
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">Expiration (MM/YY)</label>
                      <input
                        required
                        type="text"
                        placeholder="12/28"
                        className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">CVC Code</label>
                      <input
                        required
                        type="text"
                        placeholder="123"
                        className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#12372A] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
                  Clicking <strong>Place Order</strong> below will redirect you to PayPal to authorize your transaction securely.
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#C62828] to-[#900C3F] hover:from-[#a82020] hover:to-[#C62828] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C62828]/25 transition transform active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Complete Purchase • ${totalPrice.toFixed(2)}
              </button>
            </div>
          </form>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-3xl border border-[#12372A]/15 shadow-xl sticky top-28 space-y-6">
              <h3 className="text-base font-black text-[#12372A] uppercase tracking-wider border-b border-gray-100 pb-4">
                Order Summary ({cart.length})
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-xs text-gray-400 font-medium">No items in your cart.</p>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3.5 pb-3 border-b border-gray-50">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-gray-50 shrink-0" />
                      <div className="flex-1 pr-2">
                        <h4 className="text-xs font-bold text-[#12372A] line-clamp-1">{item.name}</h4>
                        <span className="text-[10px] text-[#C62828] font-extrabold uppercase">
                          {item.category === 'shirts' ? `${item.gender}'s Cut • ${item.size}` : 'Gadget'}
                        </span>
                      </div>
                      <span className="text-xs font-black text-[#12372A]">${item.price}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-2 pt-2 text-xs text-gray-600 font-medium border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#12372A]">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-extrabold text-emerald-700 uppercase text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#12372A] pt-3 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span className="text-[#C62828] text-base">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5EBDD]/60 border border-[#12372A]/10 text-[11px] text-[#12372A]/80 font-medium space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#12372A]">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" /> 72-Hour Item Guarantee
                </div>
                <p className="text-[10px] text-gray-500 leading-normal">
                  Defective or damaged items during shipping are replaced or refunded immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}