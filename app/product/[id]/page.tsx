'use client';

import { useState, use } from 'react';
import { useCart } from '../../../context/CartContext';
import { Star, Truck, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

const PRODUCTS = [
  {
    id: 1,
    name: "Neon Cyber-Santa Premium Cotton Tee",
    category: "shirts",
    price: 29.99,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    description: "Ultra-soft 100% ring-spun combed cotton tee engineered with a high-definition Cyber-Santa neon holiday graphic."
  },
  {
    id: 2,
    name: "Magical RGB Snowfall Smart LED Lamp",
    category: "gadgets",
    price: 49.99,
    rating: 4.8,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    description: "Smart desk ambient lighting fixture featuring customizable color spectrums and soothing snow-fall visual effects."
  },
  {
    id: 3,
    name: "Ugly Sweater Tech Hoodie (RGB Edition)",
    category: "shirts",
    price: 59.99,
    rating: 5.0,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    description: "Plush fleece-lined luxury winter hoodie featuring intricate tech-themed holiday pixel patterns and premium hardware."
  },
  {
    id: 4,
    name: "Wireless MagSafe Festive Power Bank 10,000mAh",
    category: "gadgets",
    price: 39.99,
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80",
    description: "Ultra-slim fast-charging magnetic power bank decorated with gold-embossed winter holiday artwork."
  }
];

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [selectedGender, setSelectedGender] = useState<'Men' | 'Women'>('Men');

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.category === 'shirts' ? selectedSize : undefined,
      gender: product.category === 'shirts' ? selectedGender : undefined,
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EBDD] via-[#FAF5EE] to-[#EFE2CF] text-[#12372A] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between selection:bg-[#C62828] selection:text-white font-sans">
      <div className="max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#12372A]/70 hover:text-[#C62828] mb-8 transition text-xs font-bold tracking-widest uppercase">
          <ArrowLeft className="w-4 h-4" /> Return to Boutique
        </Link>

        {/* Main Product Card Container using #F5EBDD / White contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 sm:p-12 rounded-3xl border border-[#12372A]/15 shadow-2xl">
          {/* Image Box */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-[#12372A]/10 relative shadow-inner">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-[#12372A] text-[#F5EBDD] text-[10px] font-black uppercase px-3.5 py-1.5 rounded-full tracking-widest shadow-md">
              Verified Collection
            </div>
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

              {product.category === 'shirts' && (
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
              )}
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

      <footer className="bg-[#12372A] border-t border-[#12372A]/20 py-12 text-center text-[#F5EBDD]/60 text-xs tracking-wider">
        <p>&copy; 2026 FestiveVault Store. All rights reserved. High-Performance Boutique Experience.</p>
      </footer>
    </div>
  );
}