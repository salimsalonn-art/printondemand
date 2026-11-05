'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Sparkles, ShieldCheck, Truck, Star, ShieldAlert, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const PRODUCTS = [
  {
    id: 1,
    name: "Neon Cyber-Santa Premium Cotton Tee",
    category: "shirts",
    price: 29.99,
    rating: 4.9,
    reviews: 128,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    alt: "Black cotton graphic t-shirt with a cyberpunk neon Santa design for Christmas"
  },
  {
    id: 2,
    name: "Magical RGB Snowfall Smart LED Lamp",
    category: "gadgets",
    price: 49.99,
    rating: 4.8,
    reviews: 94,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    alt: "RGB smart LED ambient gadget lamp simulating Christmas snowfall on a desk"
  },
  {
    id: 3,
    name: "Ugly Sweater Tech Hoodie (RGB Edition)",
    category: "shirts",
    price: 59.99,
    rating: 5.0,
    reviews: 210,
    badge: "New Release",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    alt: "Cozy holiday hoodie with tech-themed ugly Christmas sweater pixel patterns"
  },
  {
    id: 4,
    name: "Wireless MagSafe Festive Power Bank 10,000mAh",
    category: "gadgets",
    price: 39.99,
    rating: 4.7,
    reviews: 67,
    badge: "Gift Idea",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80",
    alt: "Portable wireless magnetic power bank gadget decorated with holiday winter motifs"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'shirts' | 'gadgets'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cart, setIsCartOpen } = useCart();

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeTab === 'all' || p.category === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#12372A] text-[#F5EBDD] font-sans selection:bg-[#C62828] selection:text-white">
      {/* Premium Announcement Bar */}
      <div className="bg-[#C62828] text-white text-xs sm:text-sm py-2.5 px-4 text-center font-semibold flex items-center justify-center gap-2 shadow-md">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        <span>
          <strong>Free Shipping On All Orders!</strong> Order by <span className="underline decoration-[#D4AF37] underline-offset-2">Dec 14</span> to guarantee delivery before Christmas.
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
      </div>

      {/* Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#1B5E3B]/80 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C62828] to-[#900C3F] flex items-center justify-center shadow-lg shadow-[#C62828]/20 text-white font-black text-xl border border-[#D4AF37]/30">
              🎅
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                Festive<span className="text-[#D4AF37]">Vault</span>
              </span>
              <span className="block text-[9px] tracking-[0.2em] uppercase text-[#F5EBDD]/70 font-semibold">Boutique Holiday Collection</span>
            </div>
          </div>

          <div className="hidden md:flex items-center relative w-80">
            <Search className="w-4 h-4 absolute left-3.5 text-[#12372A]/70" />
            <input
              type="text"
              placeholder="Search winter apparel, gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5EBDD]/95 backdrop-blur border border-[#D4AF37]/30 rounded-full pl-10 pr-4 py-2 text-xs text-[#12372A] placeholder-[#12372A]/50 focus:outline-none focus:ring-2 focus:ring-[#C62828] focus:bg-white shadow-inner transition"
            />
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#C62828] to-[#a82020] hover:from-[#a82020] hover:to-[#C62828] text-white px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#C62828]/25 border border-[#D4AF37]/30 transition transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-[#D4AF37] text-[#12372A] text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
              {cart.length}
            </span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
     {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#12372A] border-b border-[#D4AF37]/20">
        {/* Video Background with Mobile-Safe Attributes */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-75 pointer-events-none"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Solid & Gradient Overlays to ensure fallback color is always visible */}
        <div className="absolute inset-0 bg-[#12372A]" style={{ zIndex: 1 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A]/60 via-[#12372A]/30 to-[#12372A] pointer-events-none" style={{ zIndex: 2 }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Elegant Holiday Title */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] drop-shadow-2xl">
            Unwrap Elegance With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5EBDD] via-[#D4AF37] to-[#F5EBDD]">Holiday Tech & Apparel</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-[#F5EBDD]/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
            Curated winter garments crafted from high-density cotton and next-generation smart accessories engineered for the festive season.
          </p>

          {/* CLEAN DEADLINE TEXT CALLOUT */}
          <div className="mt-8 flex items-center justify-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-ping shrink-0" />
            <a 
              href="#shop"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5EBDD] hover:text-[#D4AF37] transition flex items-center gap-1.5 drop-shadow"
            >
              <span>Final Deadline: Order by <strong className="text-[#C62828] bg-white px-2 py-0.5 rounded-full font-black text-xs">DEC 14</strong> — Orders close after Dec 14 for Christmas delivery!</span>
              <span className="text-[#D4AF37]">&rarr;</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="#shop" className="bg-gradient-to-r from-[#C62828] to-[#900C3F] hover:from-[#a82020] hover:to-[#C62828] text-white px-9 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl shadow-[#C62828]/40 border border-[#D4AF37]/40 transition duration-300 transform hover:-translate-y-0.5">
              Explore Catalog
            </a>
            <a href="#features" className="bg-[#12372A]/80 hover:bg-[#1B5E3B] text-[#F5EBDD] px-9 py-4 rounded-full font-bold text-xs uppercase tracking-widest border border-[#F5EBDD]/30 shadow-xl backdrop-blur-md transition duration-300 transform hover:-translate-y-0.5">
              Our Commitment
            </a>
          </div>
        </div>
      </section>

      {/* Main Catalog Section - Luxury Cream Gradient Background */}
      <div className="bg-gradient-to-b from-[#F5EBDD] via-[#FAF5EE] to-[#EFE2CF] text-[#12372A] w-full py-20 flex-grow relative">
        <main id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#12372A]/10 pb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C62828]">Exclusive Selections</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#12372A] tracking-tight mt-1">Featured Catalog</h2>
            </div>

            {/* Custom Tab Pills */}
            <div className="flex bg-[#12372A]/5 p-1 rounded-2xl border border-[#12372A]/15 backdrop-blur-sm w-fit shadow-inner">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-200 ${activeTab === 'all' ? 'bg-[#12372A] text-[#F5EBDD] shadow-lg' : 'text-[#12372A]/70 hover:text-[#12372A]'}`}
              >
                All Products
              </button>
              <button
                onClick={() => setActiveTab('shirts')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-200 ${activeTab === 'shirts' ? 'bg-[#12372A] text-[#F5EBDD] shadow-lg' : 'text-[#12372A]/70 hover:text-[#12372A]'}`}
              >
                Apparel
              </button>
              <button
                onClick={() => setActiveTab('gadgets')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-200 ${activeTab === 'gadgets' ? 'bg-[#12372A] text-[#F5EBDD] shadow-lg' : 'text-[#12372A]/70 hover:text-[#12372A]'}`}
              >
                Tech Accessories
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <article key={product.id} className="bg-white rounded-3xl overflow-hidden flex flex-col group hover:shadow-2xl transition duration-500 border border-[#12372A]/10 relative transform hover:-translate-y-1">
                <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-[#12372A]/5">
                  <img src={product.image} alt={product.alt} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-[#C62828] to-[#900C3F] text-white text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md border border-white/20">
                    {product.badge}
                  </span>

                  {/* Hover Quick Action Indicator */}
                  <div className="absolute inset-0 bg-[#12372A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-[#12372A] text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition">
                      View Details <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow text-gray-900 justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-500 text-xs mb-2.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-extrabold text-[#12372A]">{product.rating}</span>
                      <span className="text-slate-400 font-normal">({product.reviews})</span>
                    </div>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-bold text-[#12372A] text-base leading-snug group-hover:text-[#C62828] transition-colors">{product.name}</h3>
                    </Link>
                  </div>

                  <div className="mt-6 pt-4 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Price</span>
                      <span className="text-2xl font-black text-[#12372A]">${product.price}</span>
                    </div>
                    <Link 
                      href={`/product/${product.id}`}
                      className="bg-[#12372A] hover:bg-[#1B5E3B] text-[#F5EBDD] text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1"
                    >
                      Select Fit
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>

      {/* Feature Value Props Section */}
      <section id="features" className="bg-[#12372A] border-t border-[#D4AF37]/20 py-20 text-[#F5EBDD] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="flex items-start gap-5 p-8 rounded-3xl bg-[#1B5E3B]/60 backdrop-blur border border-[#D4AF37]/20 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C62828] to-[#900C3F] text-white flex items-center justify-center shrink-0 shadow-lg border border-[#D4AF37]/30">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">Guaranteed Holiday Delivery</h4>
              <p className="text-sm text-[#F5EBDD]/80 mt-2 leading-relaxed">Direct tracked dispatch to ensure your order arrives on time for Christmas.</p>
            </div>
          </div>
          <div className="flex items-start gap-5 p-8 rounded-3xl bg-[#1B5E3B]/60 backdrop-blur border border-[#D4AF37]/20 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C62828] to-[#900C3F] text-white flex items-center justify-center shrink-0 shadow-lg border border-[#D4AF37]/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">256-Bit SSL Payment Gateways</h4>
              <p className="text-sm text-[#F5EBDD]/80 mt-2 leading-relaxed">Bank-grade end-to-end encryption with instant Stripe & PayPal validation.</p>
            </div>
          </div>
          <div className="flex items-start gap-5 p-8 rounded-3xl bg-[#1B5E3B]/60 backdrop-blur border border-[#D4AF37]/20 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C62828] to-[#900C3F] text-white flex items-center justify-center shrink-0 shadow-md border border-[#D4AF37]/30">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">72-Hour Quality Protection</h4>
              <p className="text-sm text-[#F5EBDD]/80 mt-2 leading-relaxed">Defective or damaged shipments are instantly replaced or refunded with zero hassle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b221a] border-t border-[#12372A] py-14 text-center text-[#F5EBDD]/60 text-xs tracking-wider">
        <p>&copy; 2026 FestiveVault Store. All rights reserved. Built for high-performance e-commerce SEO.</p>
      </footer>
    </div>
  );
}