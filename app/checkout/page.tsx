'use client';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  ShieldCheck,
  ArrowLeft,
  Lock,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Truck,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 39.99), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (cart.length === 0) {
      setError('Your cart is empty. Please add an item before checking out.');
      return;
    }

    setIsLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const shippingDetails = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip: formData.get('zip'),
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingDetails,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price || 39.99,
            image: item.image,
            size: item.size,
            gender: item.gender,
            category: item.category,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || 'Unable to start checkout. Please try again.');
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EBDD] via-[#FAF5EE] to-[#EFE2CF] text-[#12372A] py-10 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#C62828] selection:text-white">
      <div className="max-w-6xl mx-auto">

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#12372A]/70 hover:text-[#C62828] transition text-xs font-bold tracking-widest uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <div className="flex items-center gap-2 text-[#12372A]/70">
            <Lock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Secure Checkout
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C62828]">
            Almost There
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
            Complete Your Order
          </h1>

          <p className="text-sm text-[#12372A]/65 mt-2">
            Your favorite Christmas designs are just one step away.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#12372A]/10 shadow-xl p-10 text-center">
            <Sparkles className="w-10 h-10 text-[#C62828] mx-auto mb-4" />

            <h2 className="text-xl font-black mb-2">
              Your cart is empty
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Discover something festive in our collection.
            </p>

            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#12372A] hover:bg-[#1B5E3B] text-white px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* Checkout Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 space-y-7"
            >

              {/* Shipping Information */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#12372A]/10 shadow-xl space-y-6">

                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="text-base font-black uppercase tracking-wider flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#12372A] text-white flex items-center justify-center text-xs">
                      1
                    </span>
                    Shipping Information
                  </h2>

                  <span className="text-[11px] text-gray-400 font-semibold">
                    Delivery Details
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">
                      First Name
                    </label>
                    <input
                      required
                      name="firstName"
                      autoComplete="given-name"
                      type="text"
                      placeholder="John"
                      className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">
                      Last Name
                    </label>
                    <input
                      required
                      name="lastName"
                      autoComplete="family-name"
                      type="text"
                      placeholder="Doe"
                      className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    required
                    name="email"
                    autoComplete="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                  />
                  <p className="text-[10px] text-gray-400 mt-1.5">
                    We'll use this email for your order confirmation and updates.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">
                    Street Address
                  </label>
                  <input
                    required
                    name="address"
                    autoComplete="street-address"
                    type="text"
                    placeholder="123 Holiday Lane"
                    className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">
                      City
                    </label>
                    <input
                      required
                      name="city"
                      autoComplete="address-level2"
                      type="text"
                      placeholder="City"
                      className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-3.5 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">
                      State
                    </label>
                    <input
                      required
                      name="state"
                      autoComplete="address-level1"
                      type="text"
                      placeholder="State"
                      className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-3.5 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1.5">
                      ZIP Code
                    </label>
                    <input
                      required
                      name="zip"
                      autoComplete="postal-code"
                      type="text"
                      placeholder="12345"
                      className="w-full bg-[#F5EBDD]/30 border border-gray-200 rounded-xl px-3.5 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372A] transition"
                    />
                  </div>

                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#12372A]/10 shadow-xl space-y-6">

                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="text-base font-black uppercase tracking-wider flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#12372A] text-white flex items-center justify-center text-xs">
                      2
                    </span>
                    Payment Method
                  </h2>

                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider">
                    <Lock className="w-3 h-3" />
                    Secure Payment
                  </span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  Choose your preferred payment method. You'll complete your payment securely through the provider.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                      paymentMethod === 'card'
                        ? 'bg-[#12372A] border-[#12372A] text-white shadow-md'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#12372A]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <span className="block text-xs font-extrabold uppercase tracking-wider">
                          Credit / Debit Card
                        </span>
                        <span className="text-[10px] opacity-75">
                          Secure card payment
                        </span>
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                      paymentMethod === 'paypal'
                        ? 'bg-[#12372A] border-[#12372A] text-white shadow-md'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#12372A]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black italic">P</span>
                      <div>
                        <span className="block text-xs font-extrabold uppercase tracking-wider">
                          PayPal
                        </span>
                        <span className="text-[10px] opacity-75">
                          Pay with PayPal
                        </span>
                      </div>
                    </div>

                    {paymentMethod === 'paypal' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>

                </div>

                <div className="p-4 rounded-2xl bg-[#F5EBDD]/60 border border-[#12372A]/10 flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#12372A]">
                      Your payment is protected
                    </p>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                      Your card or PayPal payment details are handled by the payment provider. They are not collected by this checkout form.
                    </p>
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || cart.length === 0}
                  className="w-full bg-gradient-to-r from-[#C62828] to-[#900C3F] hover:from-[#a82020] hover:to-[#C62828] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C62828]/20 transition active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Preparing Secure Checkout...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      Continue to Payment · ${total.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-gray-400">
                  By continuing, you agree to our store policies and terms.
                </p>

              </div>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#12372A]/10 shadow-xl lg:sticky lg:top-8 space-y-6">

                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-base font-black uppercase tracking-wider">
                    Your Order
                  </h3>

                  <span className="text-xs font-bold text-gray-400">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">

                  {cart.map((item, idx) => (
                    <div
                      key={`${item.id}-${item.size || ''}-${idx}`}
                      className="flex items-center gap-3.5 pb-4 border-b border-gray-50"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200 bg-gray-50 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#12372A] line-clamp-2">
                          {item.name}
                        </h4>

                        <span className="block text-[10px] text-[#C62828] font-extrabold uppercase mt-1">
                          {item.size ? `Size: ${item.size}` : item.category}
                        </span>

                        <span className="text-[10px] text-gray-400 mt-1 block">
                          Qty: 1
                        </span>
                      </div>

                      <span className="text-xs font-black text-[#12372A] whitespace-nowrap">
                        ${(item.price || 39.99).toFixed(2)}
                      </span>
                    </div>
                  ))}

                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-2 text-xs font-medium text-gray-600">

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#12372A]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      Standard Shipping
                    </span>

                    <span className="font-extrabold text-emerald-700 uppercase text-[10px]">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-100 text-sm font-black text-[#12372A]">
                    <span>Total</span>
                    <span className="text-[#C62828] text-xl">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                </div>

                <div className="p-4 rounded-2xl bg-[#F5EBDD]/60 border border-[#12372A]/10 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#12372A] text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Shopping With Confidence
                  </div>

                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    If your order arrives damaged or defective, contact us for assistance with a replacement or refund.
                  </p>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#12372A]/60">
                    A Little More Christmas, Delivered
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Thank you for shopping with FestiveVault.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        <div className="text-center mt-10 mb-10">
          <p className="text-[10px] text-[#12372A]/50 uppercase tracking-widest font-semibold">
            FestiveVault · Made for the Season
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}