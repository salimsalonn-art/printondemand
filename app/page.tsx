'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Sparkles, ShieldCheck, Truck, Star, ShieldAlert, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const SECTIONS = [
  {
    id: 'dogs',
    title: "🐕 Dog's Lover Collection",
    subtitle: "Cozy holiday sweatshirts & hoodies crafted for canine enthusiasts",
    products: [
      { id: 1, name: "Festive Paws Premium Holiday Hoodie", price: 54.99, rating: 4.9, reviews: 142, badge: "Dog's Lover", image: "/fd1.jpeg", alt: "Festive dog winter artwork hoodie" },
      { id: 2, name: "Santa Paws Cozy Crewneck Sweatshirt", price: 49.99, rating: 4.8, reviews: 98, badge: "Dog's Lover", image: "/fd2.jpeg", alt: "Santa Paws crewneck sweatshirt" },
      { id: 3, name: "Reindeer Pup Luxury Fleece Pullover", price: 59.99, rating: 5.0, reviews: 215, badge: "Dog's Lover", image: "/fd3.jpeg", alt: "Reindeer puppy fleece pullover" },
      { id: 4, name: "Winter Puppy Knit Pattern Sweatshirt", price: 49.99, rating: 4.7, reviews: 83, badge: "Dog's Lover", image: "/fd4.jpeg", alt: "Winter knit holiday puppies sweatshirt" },
      { id: 5, name: "Golden Retriever Festive Heritage Hoodie", price: 54.99, rating: 4.9, reviews: 120, badge: "Dog's Lover", image: "/fd5.jpeg", alt: "Golden retriever heritage hoodie" },
    ]
  },
  {
    id: 'cats',
    title: "🐈 Cat's Lover Collection",
    subtitle: "Purrfect festive apparel designed for feline lovers",
    products: [
      { id: 6, name: "Festive Whiskers Holiday Cat Hoodie", price: 54.99, rating: 4.9, reviews: 164, badge: "Cat's Lover", image: "/fc1.jpeg", alt: "Festive cat winter hoodie" },
      { id: 7, name: "Santa Kitty Cozy Crewneck Sweatshirt", price: 49.99, rating: 4.8, reviews: 112, badge: "Cat's Lover", image: "/fc2.jpeg", alt: "Santa kitty crewneck sweatshirt" },
      { id: 8, name: "Meowy Christmas Luxury Fleece Pullover", price: 59.99, rating: 5.0, reviews: 240, badge: "Cat's Lover", image: "/fc3.jpeg", alt: "Meowy Christmas fleece pullover" },
      { id: 9, name: "Winter Kitten Knit Pattern Sweatshirt", price: 49.99, rating: 4.7, reviews: 95, badge: "Cat's Lover", image: "/fc4.jpeg", alt: "Winter kitten holiday sweatshirt" },
      { id: 10, name: "Purrfect Holiday Heritage Hoodie", price: 54.99, rating: 4.9, reviews: 138, badge: "Cat's Lover", image: "/fc5.jpeg", alt: "Purrfect holiday cat hoodie" },
    ]
  },
  {
    id: 'santa',
    title: "🎅 Santa's Lovers Collection",
    subtitle: "Timeless St. Nick statements and crimson holiday streetwear",
    products: [
      { id: 11, name: "Classic St. Nick Luxury Velvet Hoodie", price: 64.99, rating: 5.0, reviews: 189, badge: "Santa's Lover", image: "/fs1.jpeg", alt: "Classic St Nick luxury holiday hoodie" },
      { id: 12, name: "Vintage Santa Claus Crewneck Sweatshirt", price: 54.99, rating: 4.8, reviews: 145, badge: "Santa's Lover", image: "/fs2.jpeg", alt: "Vintage Santa Claus crewneck" },
      { id: 13, name: "North Pole Headmaster Festive Pullover", price: 59.99, rating: 4.9, reviews: 177, badge: "Santa's Lover", image: "/fs3.jpeg", alt: "North Pole headmaster holiday pullover" },
      { id: 14, name: "Jolly Saint Nick Signature Hoodie", price: 64.99, rating: 4.9, reviews: 156, badge: "Santa's Lover", image: "/fs4.jpeg", alt: "Jolly Saint Nick Christmas hoodie" },
      { id: 15, name: "Midnight Santa Holiday Sweatshirt", price: 54.99, rating: 4.7, reviews: 91, badge: "Santa's Lover", image: "/fs5.jpeg", alt: "Midnight Santa holiday sweatshirt" },
    ]
  },
  {
    id: 'christmas',
    title: "🎄 Christmas's Lover Collection",
    subtitle: "Pure winter wonderland aesthetics and pine-accented luxury gear",
    products: [
      { id: 16, name: "Midnight Evergreen Holiday Luxury Hoodie", price: 59.99, rating: 4.9, reviews: 210, badge: "Christmas's Lover", image: "/fr1.jpeg", alt: "Midnight evergreen holiday hoodie" },
      { id: 17, name: "Golden Snowflake Heritage Crewneck", price: 54.99, rating: 4.8, reviews: 165, badge: "Christmas's Lover", image: "/fr2.jpeg", alt: "Golden snowflake crewneck" },
      { id: 18, name: "Winter Wonderland Festive Pullover", price: 59.99, rating: 5.0, reviews: 230, badge: "Christmas's Lover", image: "/fr3.jpeg", alt: "Winter wonderland Christmas pullover" },
      { id: 19, name: "Royal Pine Christmas Cashmere-Blend Hoodie", price: 69.99, rating: 5.0, reviews: 310, badge: "Christmas's Lover", image: "/fr4.jpeg", alt: "Royal pine Christmas cashmere hoodie" },
      { id: 20, name: "Silent Night Velvet Holiday Sweatshirt", price: 54.99, rating: 4.8, reviews: 142, badge: "Christmas's Lover", image: "/fr5.jpeg", alt: "Silent night velvet sweatshirt" },
    ]
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, setIsCartOpen } = useCart();

  const filteredSections = SECTIONS.map(section => ({
    ...section,
    products: section.products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.products.length > 0);

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
              <span className="block text-[9px] tracking-[0.2em] uppercase text-[#F5EBDD]/70 font-semibold">Luxury Holiday Apparel</span>
            </div>
          </div>

          <div className="hidden md:flex items-center relative w-80">
            <Search className="w-4 h-4 absolute left-3.5 text-[#12372A]/70" />
            <input
              type="text"
              placeholder="Search dog, cat, santa hoodies..."
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
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#12372A] border-b border-[#D4AF37]/20">
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

        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A]/60 via-[#12372A]/30 to-[#12372A] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] drop-shadow-2xl">
            Unwrap Elegance With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5EBDD] via-[#D4AF37] to-[#F5EBDD]">Holiday Sweatshirts & Hoodies</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-[#F5EBDD]/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
            Curated winter garments crafted from high-density organic cotton for dog lovers, cat enthusiasts, and Christmas aficionados.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-ping shrink-0" />
            <a 
              href="#collections"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5EBDD] hover:text-[#D4AF37] transition flex items-center gap-1.5 drop-shadow"
            >
              <span>Final Deadline: Order by <strong className="text-[#C62828] bg-white px-2 py-0.5 rounded-full font-black text-xs">DEC 14</strong> — Orders close after Dec 14 for Christmas delivery!</span>
              <span className="text-[#D4AF37]">&rarr;</span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="#collections" className="bg-gradient-to-r from-[#C62828] to-[#900C3F] hover:from-[#a82020] hover:to-[#C62828] text-white px-9 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl shadow-[#C62828]/40 border border-[#D4AF37]/40 transition duration-300 transform hover:-translate-y-0.5">
              Explore Collections
            </a>
            <a href="#features" className="bg-[#12372A]/80 hover:bg-[#1B5E3B] text-[#F5EBDD] px-9 py-4 rounded-full font-bold text-xs uppercase tracking-widest border border-[#F5EBDD]/30 shadow-xl backdrop-blur-md transition duration-300 transform hover:-translate-y-0.5">
              Our Commitment
            </a>
          </div>
        </div>
      </section>

      {/* Main Collections Sections */}
      <div id="collections" className="bg-gradient-to-b from-[#F5EBDD] via-[#FAF5EE] to-[#EFE2CF] text-[#12372A] w-full py-20 flex-grow relative space-y-24">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {filteredSections.map((section) => (
            <section key={section.id} className="space-y-8">
              {/* Section Header */}
              <div className="border-b border-[#12372A]/15 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#12372A] tracking-tight">{section.title}</h2>
                  <p className="text-xs sm:text-sm text-[#12372A]/70 font-medium mt-1">{section.subtitle}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C62828]">5 Exclusive Designs</span>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {section.products.map((product) => (
                  <article key={product.id} className="bg-white rounded-3xl overflow-hidden flex flex-col group hover:shadow-2xl transition duration-500 border border-[#12372A]/10 relative transform hover:-translate-y-1">
                    <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-[#12372A]/5">
                      <img src={product.image} alt={product.alt} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" />
                      
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-[#C62828] to-[#900C3F] text-white text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md border border-white/20">
                        {product.badge}
                      </span>

                      <div className="absolute inset-0 bg-[#12372A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/90 text-[#12372A] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition">
                          View & Zoom <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>

                    <div className="p-5 flex flex-col flex-grow text-gray-900 justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-amber-500 text-[11px] mb-2">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-extrabold text-[#12372A]">{product.rating}</span>
                          <span className="text-slate-400">({product.reviews})</span>
                        </div>
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-bold text-[#12372A] text-sm leading-snug group-hover:text-[#C62828] transition-colors line-clamp-2">{product.name}</h3>
                        </Link>
                      </div>

                      <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100">
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-slate-400">Price</span>
                          <span className="text-xl font-black text-[#12372A]">${product.price}</span>
                        </div>
                        <Link 
                          href={`/product/${product.id}`}
                          className="bg-[#12372A] hover:bg-[#1B5E3B] text-[#F5EBDD] text-[11px] font-bold px-3 py-2 rounded-xl transition shadow-md"
                        >
                          Select Fit
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
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
        <p>&copy; 2026 FestiveVault Store. All rights reserved. Luxury Holiday Sweatshirts & Hoodies.</p>
      </footer>
    </div>
  );
}