
'use client';

import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import {
  Truck,
  ShieldCheck,
  ArrowLeft,
  ZoomIn,
  X,
  ShoppingBag,
  Check,
  Heart,
  Gift,
  Minus,
  Plus
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
}

const PRODUCT_PRICE = 24.99;

export default function ProductClient({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [selectedGender, setSelectedGender] = useState<'Men' | 'Women'>('Men');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: PRODUCT_PRICE,
        image: product.image,
        size: selectedSize,
        gender: selectedGender,
        category: product.category,
      });
    }

    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252B25] font-sans selection:bg-[#8B2635] selection:text-white">

      {/* ANNOUNCEMENT BAR */}

      <div className="bg-[#173D32] text-white py-2.5 px-4 text-center">
        <p className="text-[11px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-2">
          <Gift size={14} className="text-[#E7C994]" />
          <span>Every design just $24.99</span>
          <span className="text-[#E7C994]">·</span>
          <span className="text-[#E7C994]">FREE SHIPPING</span>
        </p>
      </div>

      {/* HEADER */}

      <header className="bg-[#FAF7F0]/95 backdrop-blur-lg border-b border-[#E9E4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[76px] flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#173D32] flex items-center justify-center">
              <span className="text-2xl">🎄</span>
            </div>

            <div>
              <span className="text-xl font-black text-[#173D32]">
                Festive<span className="text-[#8B2635]">Vault</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.2em] font-bold text-[#8A8173]">
                Christmas Made Wearable
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173D32] hover:text-[#8B2635] transition"
          >
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </Link>

        </div>
      </header>

      {/* BREADCRUMB */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex items-center gap-2 text-[11px] font-medium text-[#8A8173]">
          <Link href="/" className="hover:text-[#8B2635] transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/#collections" className="hover:text-[#8B2635] transition">
            Collections
          </Link>
          <span>/</span>
          <span className="text-[#173D32] font-bold line-clamp-1">
            {product.name}
          </span>
        </div>
      </div>

      {/* PRODUCT CONTENT */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-16 items-start">

          {/* PRODUCT IMAGE */}

          <div className="lg:sticky lg:top-8">

            <div
              onClick={() => setIsModalOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Open product image zoom"
              className="relative aspect-square rounded-3xl overflow-hidden bg-[#F0EDE6] border border-[#E9E4D9] cursor-zoom-in group shadow-sm"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              />

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#173D32]">
                  Christmas Collection
                </span>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur text-[#173D32] rounded-full px-4 py-2.5 flex items-center gap-2 text-xs font-bold shadow-lg group-hover:bg-[#173D32] group-hover:text-white transition">
                <ZoomIn size={16} />
                View Larger
              </div>

            </div>

            <p className="mt-4 text-center text-[11px] text-[#8A8173]">
              Tap the image to see the design in more detail.
            </p>

            {/* PRODUCT BENEFITS */}

            <div className="grid grid-cols-2 gap-3 mt-7">

              <div className="flex items-center gap-3 bg-white border border-[#E9E4D9] rounded-xl p-4">
                <div className="w-9 h-9 rounded-full bg-[#EAF0E9] text-[#173D32] flex items-center justify-center shrink-0">
                  <Truck size={18} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#173D32]">
                    Free Shipping
                  </p>
                  <p className="text-[10px] text-[#8A8173] mt-0.5">
                    Every order
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white border border-[#E9E4D9] rounded-xl p-4">
                <div className="w-9 h-9 rounded-full bg-[#F7EBE9] text-[#8B2635] flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#173D32]">
                    Secure Checkout
                  </p>
                  <p className="text-[10px] text-[#8A8173] mt-0.5">
                    Protected payment
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* PRODUCT DETAILS */}

          <div className="flex flex-col">

            <div className="inline-flex items-center gap-2 text-[#8B2635] text-[10px] uppercase tracking-[0.2em] font-extrabold">
              <span className="w-2 h-2 rounded-full bg-[#8B2635]" />
              A FestiveVault Favorite
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[#173D32]">
              {product.name}
            </h1>

            {/* PRICE */}

            <div className="mt-6 flex items-center flex-wrap gap-3">

              <span className="text-4xl font-black text-[#8B2635]">
                ${PRODUCT_PRICE.toFixed(2)}
              </span>

              <span className="bg-[#EAF0E9] text-[#173D32] px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                Free Shipping
              </span>

            </div>

            <p className="mt-5 text-sm leading-7 text-[#686E65]">
              {product.description}
            </p>

            {/* PRICE VALUE */}

            <div className="mt-6 p-4 rounded-2xl bg-[#F0E9DB] border border-[#E5D9C6] flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8B2635] shrink-0">
                <Gift size={20} />
              </div>

              <div>
                <p className="text-sm font-extrabold text-[#173D32]">
                  Just $24.99. Shipping is on us.
                </p>
                <p className="text-xs text-[#77786F] mt-1">
                  No additional shipping charge.
                </p>
              </div>

            </div>

            {/* OPTIONS */}

            <div className="mt-8 space-y-7 pt-7 border-t border-[#E9E4D9]">

              {/* FIT */}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-[#173D32]">
                    Choose Your Style
                  </label>

                  <span className="text-[10px] text-[#8A8173]">
                    Select a fit
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">

                  {(['Men', 'Women'] as const).map(gender => (

                    <button
                      key={gender}
                      type="button"
                      onClick={() => setSelectedGender(gender)}
                      aria-pressed={selectedGender === gender}
                      className={`py-4 rounded-xl border text-xs font-bold transition-all ${
                        selectedGender === gender
                          ? 'bg-[#173D32] border-[#173D32] text-white shadow-md'
                          : 'bg-white border-[#E3DED3] text-[#455348] hover:border-[#173D32]'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {selectedGender === gender && <Check size={15} />}
                        {gender}'s Cut
                      </span>
                    </button>

                  ))}

                </div>
              </div>

              {/* SIZE */}

              <div>

                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-[#173D32]">
                    Choose Your Size
                  </label>

                  <span className="text-[10px] text-[#8A8173]">
                    {selectedSize} selected
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3">

                  {(['S', 'M', 'L', 'XL'] as const).map(size => (

                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`py-4 rounded-xl border text-sm font-extrabold transition-all ${
                        selectedSize === size
                          ? 'bg-[#173D32] border-[#173D32] text-white shadow-md'
                          : 'bg-white border-[#E3DED3] text-[#455348] hover:border-[#173D32]'
                      }`}
                    >
                      {size}
                    </button>

                  ))}

                </div>

              </div>

              {/* QUANTITY */}

              <div>

                <label className="block text-xs font-extrabold uppercase tracking-widest text-[#173D32] mb-3">
                  Quantity
                </label>

                <div className="inline-flex items-center bg-white border border-[#E3DED3] rounded-xl overflow-hidden">

                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-3 text-[#173D32] hover:bg-[#F0EDE6] disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-12 text-center text-sm font-extrabold text-[#173D32]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    aria-label="Increase quantity"
                    className="p-3 text-[#173D32] hover:bg-[#F0EDE6] disabled:opacity-30"
                  >
                    <Plus size={16} />
                  </button>

                </div>

              </div>

            </div>

            {/* ADD TO CART */}

            <div className="mt-9 pt-7 border-t border-[#E9E4D9]">

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#77786F]">
                  Order total
                </span>

                <span className="text-xl font-black text-[#173D32]">
                  ${(PRODUCT_PRICE * quantity).toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-5 rounded-2xl font-extrabold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                  added
                    ? 'bg-[#276B4B] text-white'
                    : 'bg-[#8B2635] hover:bg-[#72202D] text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check size={19} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={19} />
                    Add to Cart — ${(PRODUCT_PRICE * quantity).toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-[#77786F] mt-4">
                Free shipping included · Secure checkout
              </p>

            </div>

            {/* CUSTOMER INFORMATION */}

            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-3">
                <Truck size={18} className="text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#173D32]">
                    Free Shipping on Every Order
                  </p>
                  <p className="text-[11px] text-[#77786F] mt-1 leading-relaxed">
                    Shipping is included in the displayed price. Check the shipping policy for estimated delivery times.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#173D32]">
                    Secure Payment
                  </p>
                  <p className="text-[11px] text-[#77786F] mt-1 leading-relaxed">
                    Complete your purchase through our secure checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart size={18} className="text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#173D32]">
                    A Gift They'll Remember
                  </p>
                  <p className="text-[11px] text-[#77786F] mt-1 leading-relaxed">
                    Find something special for the Christmas lovers in your life.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM CTA */}

        <div className="mt-20 bg-[#173D32] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">

          <div className="relative z-10">
            <span className="text-4xl">🎄</span>

            <h2 className="mt-4 text-2xl sm:text-3xl font-black">
              More Christmas. More Fun.
            </h2>

            <p className="mt-3 text-sm text-white/70">
              Discover more festive designs in our Christmas collections.
            </p>

            <Link
              href="/#collections"
              className="inline-flex items-center gap-2 mt-7 bg-white text-[#173D32] hover:bg-[#E7C994] px-7 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition"
            >
              Explore Collections
              <ArrowLeft size={15} className="rotate-180" />
            </Link>
          </div>

          <div className="absolute -right-20 -bottom-24 w-64 h-64 rounded-full bg-[#E7C994]/10 blur-3xl" />

        </div>

      </main>

      {/* IMAGE ZOOM MODAL */}

      {isModalOpen && (

        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsModalOpen(false)}
        >

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close image zoom"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 bg-white/15 hover:bg-white/25 text-white p-3 rounded-full transition"
          >
            <X size={24} />
          </button>

          <div
            className="max-w-5xl w-full flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            <p className="mt-5 text-white text-sm font-semibold text-center">
              {product.name}
            </p>

            <p className="mt-2 text-white/60 text-xs">
              Click outside the image or press the close button to return.
            </p>

          </div>

        </div>

      )}

      {/* FOOTER */}

      <footer className="bg-[#10291F] text-white/60 py-10 px-4 text-center">

        <Link href="/" className="text-xl font-black text-white">
          Festive<span className="text-[#D5B77B]">Vault</span>
        </Link>

        <p className="mt-3 text-xs">
          Christmas Made Wearable. 🎄
        </p>

        <p className="mt-6 text-[10px]">
          © 2026 FestiveVault. All rights reserved.
        </p>

      </footer>

    </div>
  );
}
