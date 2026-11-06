'use client';

import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { Star, Truck, ShieldCheck, ArrowLeft, Sparkles, ZoomIn, X } from 'lucide-react';
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

export default function ProductClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [selectedGender, setSelectedGender] = useState<'Men' | 'Women'>('Men');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      gender: selectedGender,
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EBDD] via-[#FAF5EE] to-[#EFE2CF] text-[#12372A] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between selection:bg-[#C62828] selection:text-white font-sans">
      <div className="max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#12372A]/70 hover:text-[#C62828] mb-8 transition text-xs font-bold tracking-widest uppercase">
          <ArrowLeft className="w-4 h-4" /> Return to Collections
        </Link>

        {/* Main Product Card Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 sm:p-12 rounded-3xl border border-[#12372A]/15 shadow-2xl">
          
          {/* Image Box with Click-to-Zoom Trigger */}
          <div className="space-y-3">
            <div 
              onClick={() => setIsModalOpen(true)}
              className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-[#12372A]/10 relative shadow-inner cursor-zoom-in group"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              
              <div className="absolute top-4 left-4 bg-[#12372A] text-[#F5EBDD] text-[10px] font-black uppercase px-3.5 py-1.5 rounded-full tracking-widest shadow-md">
                Verified Collection
              </div>

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-[#12372A] text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur flex items-center gap-1.5">
                  <ZoomIn className="w-4 h-4" /> Click to Zoom
                </span>
              </div>
            </div>
            <p className="text-center text-[11px] text-gray-400 font-medium italic">Click image to open high-resolution zoom view</p>
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-extrabold text-[#12372A]">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">• {product.reviews} Boutique Reviews</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#12372A] leading-tight">{product.name}</h1>
              <p className="text-2xl font-black text-[#C62828] mt-3">${product.price}</p>
              <p className="mt-4 text-gray-600 text-sm font-normal leading-relaxed">{product.description}</p>

              {/* Fit & Size Options */}
              <div className="mt-8 space-y-6 pt-6 border-t border-gray-100">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#12372A]/70 mb-2.5">
                    Select Fit Profile
                  </label>
                  <div className="flex gap-3">
                    {(['Men', 'Women'] as const).map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setSelectedGender(gender)}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition duration-200 ${
                          selectedGender === gender
                            ? 'bg-[#12372A] border-[#12372A] text-white shadow-md'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#12372A]/40'
                        }`}
                      >
                        {gender}'s Cut
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#12372A]/70 mb-2.5">
                    Select Size
                  </label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {(['S', 'M', 'L', 'XL'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition duration-200 ${
                          selectedSize === size
                            ? 'bg-[#12372A] border-[#12372A] text-white shadow-md'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#12372A]/40'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-[#C62828] to-[#900C3F] hover:from-[#a82020] hover:to-[#C62828] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C62828]/25 transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Add to Cart • ${product.price}
              </button>

              <div className="mt-5 flex items-center justify-around text-[11px] text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-[#12372A]" /> Standard Shipping (5-10 Days)</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#12372A]" /> SSL Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN ZOOM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
            aria-label="Close zoom modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[90vh] overflow-auto rounded-2xl p-2 bg-[#12372A] border border-[#D4AF37]/30 shadow-2xl">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-auto h-auto max-h-[80vh] mx-auto rounded-lg object-contain cursor-zoom-out"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="text-center py-3 text-[#F5EBDD] text-xs font-medium tracking-wide">
              {product.name} — Click anywhere or press X to close
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#12372A] border-t border-[#12372A]/20 py-12 text-center text-[#F5EBDD]/60 text-xs tracking-wider mt-20">
        <p>&copy; 2026 FestiveVault Store. All rights reserved. High-Performance Boutique Experience.</p>
      </footer>
    </div>
  );
}