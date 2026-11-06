'use client';

import { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Search,
  Sparkles,
  Truck,
  Gift,
  ArrowUpRight,
  Menu,
  X,
  Heart,
  PackageCheck,
  Star
} from 'lucide-react';
import Link from 'next/link';

const PRODUCT_PRICE = 24.99;

interface Product {
  id: number;
  name: string;
  image: string;
  alt: string;
  badge: string;
  sectionId?: string;
  sectionTitle?: string;
}

interface Section {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  products: Product[];
}

const SECTIONS: Section[] = [
  {
    id: 'dogs',
    title: 'Dog Lovers',
    emoji: '🐕',
    subtitle: 'For the people whose Christmas wish list starts with their furry best friend.',
    products: [
      { id: 1, name: 'Festive Paws Holiday Hoodie', image: '/fd1.jpeg', alt: 'Festive dog Christmas artwork hoodie', badge: 'Dog Lover Favorite' },
      { id: 2, name: 'Santa Paws Cozy Crewneck', image: '/fd2.jpeg', alt: 'Santa Paws Christmas crewneck sweatshirt', badge: 'Holiday Pick' },
      { id: 3, name: 'Reindeer Pup Christmas Pullover', image: '/fd3.jpeg', alt: 'Reindeer puppy Christmas pullover', badge: 'Festive Favorite' },
      { id: 4, name: 'Winter Puppies Sweatshirt', image: '/fd4.jpeg', alt: 'Winter puppies Christmas sweatshirt', badge: 'Cute & Cozy' },
      { id: 5, name: 'Golden Retriever Christmas Hoodie', image: '/fd5.jpeg', alt: 'Golden retriever Christmas hoodie', badge: 'Dog Lover Favorite' },
    ]
  },
  {
    id: 'cats',
    title: 'Cat Lovers',
    emoji: '🐈',
    subtitle: 'A little Christmas magic, a lot of attitude, and plenty of purr-sonality.',
    products: [
      { id: 6, name: 'Festive Whiskers Cat Hoodie', image: '/fc1.jpeg', alt: 'Festive cat Christmas hoodie', badge: 'Cat Lover Favorite' },
      { id: 7, name: 'Santa Kitty Cozy Crewneck', image: '/fc2.jpeg', alt: 'Santa kitty Christmas crewneck', badge: 'Holiday Pick' },
      { id: 8, name: 'Meowy Christmas Pullover', image: '/fc3.jpeg', alt: 'Meowy Christmas cat sweatshirt', badge: 'Festive Favorite' },
      { id: 9, name: 'Winter Kitten Sweatshirt', image: '/fc4.jpeg', alt: 'Winter kitten Christmas sweatshirt', badge: 'Cute & Cozy' },
      { id: 10, name: 'Purrfect Holiday Hoodie', image: '/fc5.jpeg', alt: 'Purrfect holiday cat hoodie', badge: 'Cat Lover Favorite' },
    ]
  },
  {
    id: 'santa',
    title: "Santa's Workshop",
    emoji: '🎅',
    subtitle: 'For those who believe Santa deserves a wardrobe upgrade.',
    products: [
      { id: 11, name: 'Classic Santa Christmas Hoodie', image: '/fs1.jpeg', alt: 'Classic Santa Christmas hoodie', badge: 'Santa Favorite' },
      { id: 12, name: 'Vintage Santa Crewneck', image: '/fs2.jpeg', alt: 'Vintage Santa Claus crewneck', badge: 'Holiday Pick' },
      { id: 13, name: 'North Pole Headmaster Pullover', image: '/fs3.jpeg', alt: 'North Pole Santa holiday pullover', badge: 'Festive Favorite' },
      { id: 14, name: 'Jolly Saint Nick Hoodie', image: '/fs4.jpeg', alt: 'Jolly Saint Nick Christmas hoodie', badge: 'Santa Favorite' },
      { id: 15, name: 'Midnight Santa Sweatshirt', image: '/fs5.jpeg', alt: 'Midnight Santa Christmas sweatshirt', badge: 'Holiday Pick' },
    ]
  },
  {
    id: 'christmas',
    title: 'Christmas Classics',
    emoji: '🎄',
    subtitle: 'Snowflakes, winter magic, and everything that makes December special.',
    products: [
      { id: 16, name: 'Midnight Evergreen Hoodie', image: '/fr1.jpeg', alt: 'Evergreen Christmas hoodie', badge: 'Holiday Favorite' },
      { id: 17, name: 'Golden Snowflake Crewneck', image: '/fr2.jpeg', alt: 'Golden snowflake Christmas crewneck', badge: 'Holiday Pick' },
      { id: 18, name: 'Winter Wonderland Pullover', image: '/fr3.jpeg', alt: 'Winter wonderland Christmas pullover', badge: 'Festive Favorite' },
      { id: 19, name: 'Royal Pine Christmas Hoodie', image: '/fr4.jpeg', alt: 'Royal pine Christmas hoodie', badge: 'Holiday Favorite' },
      { id: 20, name: 'Silent Night Sweatshirt', image: '/fr5.jpeg', alt: 'Silent night Christmas sweatshirt', badge: 'Holiday Pick' },
    ]
  }
];

const ALL_PRODUCTS: Product[] = SECTIONS.flatMap((section: Section) =>
  section.products.map((product: Product) => ({
    ...product,
    sectionId: section.id,
    sectionTitle: section.title
  }))
);

const FEATURED_IDS = [1, 6, 11, 16];

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-[#E9E4D9] hover:border-[#B9C9B9] hover:shadow-xl transition-all duration-300 flex flex-col">
      <Link
        href={`/product/${product.id}`}
        className="block relative aspect-square overflow-hidden bg-[#F1EEE7]"
      >
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-[#244536] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
          {product.badge}
        </span>

        <div className="absolute inset-0 bg-[#173D32]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-[#173D32] text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-transform">
            View Design <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>

      <div className="p-4 sm:p-5 flex flex-col grow">
        <div className="grow">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#9A7960] mb-2">
            {product.sectionTitle}
          </p>

          <Link href={`/product/${product.id}`}>
            <h3 className="text-[#26372E] font-bold text-sm leading-snug group-hover:text-[#8B2635] transition-colors line-clamp-2 min-h-10">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F0EDE6] flex items-center justify-between gap-2">
          <div>
            <span className="block text-[10px] text-[#8A8A80] font-medium">
              Free shipping
            </span>
            <span className="text-xl font-extrabold text-[#173D32]">
              ${PRODUCT_PRICE.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="bg-[#173D32] hover:bg-[#8B2635] text-white text-[11px] font-bold px-3 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            Shop Now <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cart, setIsCartOpen } = useCart();

  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return SECTIONS;

    return SECTIONS.map(section => ({
      ...section,
      products: section.products.filter(product =>
        `${product.name} ${section.title} ${product.badge}`
          .toLowerCase()
          .includes(query)
      )
    })).filter(section => section.products.length > 0);
  }, [searchQuery]);

  const featuredProducts = ALL_PRODUCTS.filter(product =>
    FEATURED_IDS.includes(product.id)
  );

  const showFeatured = !searchQuery.trim();

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252B25] font-sans selection:bg-[#8B2635] selection:text-white">

      {/* ANNOUNCEMENT BAR */}

      <div className="bg-[#173D32] text-white py-2.5 px-3 text-center">
        <p className="text-[11px] sm:text-xs font-semibold tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <Sparkles size={13} className="text-[#D5B77B]" />
          <span>Christmas shopping just got better.</span>
          <span className="text-[#E7C994] font-extrabold">
            $24.99 + FREE SHIPPING
          </span>
          <Sparkles size={13} className="text-[#D5B77B]" />
        </p>
      </div>

      {/* HEADER */}

      <header className="sticky top-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-xl border-b border-[#E9E4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-[76px] flex items-center justify-between gap-4">

            {/* LOGO */}

            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-11 h-11 rounded-xl bg-[#173D32] flex items-center justify-center shadow-md">
                <span className="text-2xl">🎄</span>
              </div>

              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#173D32]">
                  Festive<span className="text-[#8B2635]">Vault</span>
                </span>
                <span className="block text-[9px] uppercase tracking-[0.22em] font-bold text-[#8A8173]">
                  Christmas Made Wearable
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}

            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[#455348]">
              <a href="#featured" className="hover:text-[#8B2635] transition">
                Featured
              </a>
              <a href="#dogs" className="hover:text-[#8B2635] transition">
                Dog Lovers
              </a>
              <a href="#cats" className="hover:text-[#8B2635] transition">
                Cat Lovers
              </a>
              <a href="#santa" className="hover:text-[#8B2635] transition">
                Santa
              </a>
              <a href="#christmas" className="hover:text-[#8B2635] transition">
                Christmas
              </a>
            </nav>

            {/* HEADER ACTIONS */}

            <div className="flex items-center gap-2">

              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Search products"
                className="p-2.5 text-[#173D32] hover:bg-[#EDE9DF] rounded-full transition"
              >
                {mobileSearchOpen
                  ? <X size={20} />
                  : <Search size={20} />
                }
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-[#8B2635] hover:bg-[#72202D] text-white px-3.5 sm:px-5 py-2.5 rounded-full text-xs font-bold transition shadow-sm"
              >
                <ShoppingBag size={17} />
                <span className="hidden sm:inline">My Cart</span>
                <span className="bg-white text-[#8B2635] rounded-full min-w-[19px] h-[19px] flex items-center justify-center text-[10px] font-black px-1">
                  {cart.length}
                </span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation"
                className="lg:hidden p-2 text-[#173D32]"
              >
                {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}

          {mobileSearchOpen && (
            <div className="pb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8173]" size={17} />
                <input
                  type="search"
                  autoFocus
                  placeholder="Search Christmas designs..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#E2DDD1] rounded-full pl-11 pr-4 py-3 text-sm text-[#173D32] outline-none focus:border-[#8B2635] focus:ring-2 focus:ring-[#8B2635]/10"
                />
              </div>
            </div>
          )}

          {/* MOBILE NAV */}

          {mobileMenuOpen && (
            <nav className="lg:hidden border-t border-[#E9E4D9] py-4 flex flex-col gap-4 text-sm font-semibold text-[#173D32]">
              {[
                ['Featured', '#featured'],
                ['Dog Lovers', '#dogs'],
                ['Cat Lovers', '#cats'],
                ["Santa's Workshop", '#santa'],
                ['Christmas Classics', '#christmas']
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#8B2635] transition"
                >
                  {label}
                </a>
              ))}
            </nav>
          )}

          {/* DESKTOP SEARCH */}

          <div className="hidden md:block pb-3">
            <div className="relative max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8173]" size={15} />
              <input
                type="search"
                placeholder="Find your favorite Christmas design..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E9E4D9] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#173D32] outline-none focus:border-[#8B2635] transition"
              />
            </div>
          </div>

        </div>
      </header>

      {/* HERO */}

      <section className="relative min-h-[570px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#173D32]">

        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/fd1.jpeg"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-[#10291F]/95 via-[#173D32]/75 to-[#173D32]/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#10291F]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-24">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 border border-[#D5B77B]/40 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-[#F0D9AA] text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] mb-7">
              <Sparkles size={14} />
              Your Christmas, Your Style
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-white">
              Christmas Looks
              <br />
              <span className="text-[#E7C994]">
                Good on You.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm sm:text-lg text-white/85 leading-relaxed">
              A little festive, a little funny, and a whole lot of Christmas spirit.
              Discover original holiday designs made for dog lovers, cat people,
              Santa fans, and everyone who loves the season.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">

              <a
                href="#collections"
                className="inline-flex items-center justify-center gap-2 bg-[#8B2635] hover:bg-[#A33343] text-white px-8 py-4 rounded-full text-xs font-extrabold uppercase tracking-wider transition shadow-xl"
              >
                Shop Christmas Collection
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#featured"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition"
              >
                Explore Featured Designs
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/90 text-xs font-semibold">
              <span className="flex items-center gap-2">
                <Truck size={16} className="text-[#E7C994]" />
                Free Shipping
              </span>
              <span className="flex items-center gap-2">
                <Gift size={16} className="text-[#E7C994]" />
                Perfect for Gifting
              </span>
              <span className="flex items-center gap-2">
                <Heart size={16} className="text-[#E7C994]" />
                Made for Christmas Lovers
              </span>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#D5B77B]/10 blur-3xl pointer-events-none" />
      </section>

      {/* PRICE PROMOTION STRIP */}

      <section className="bg-[#F0E9DB] border-b border-[#E3D9C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">

          <div className="flex items-center gap-3">
            <span className="text-3xl">🎁</span>
            <div className="text-left">
              <p className="text-[#173D32] font-extrabold text-sm">
                One price. No shipping surprises.
              </p>
              <p className="text-[#82796B] text-xs">
                Your favorite Christmas designs, delivered with free shipping.
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-[#D8CCB8]" />

          <div className="text-[#8B2635] font-black text-2xl">
            $24.99
            <span className="block text-[10px] text-[#173D32] uppercase tracking-widest text-center">
              Every design
            </span>
          </div>

        </div>
      </section>

      {/* FEATURED DESIGNS */}

      {showFeatured && (
        <section id="featured" className="py-20 sm:py-24 bg-[#FAF7F0]">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-2xl mx-auto mb-12">

              <span className="text-[#8B2635] text-[10px] uppercase tracking-[0.22em] font-extrabold">
                A Few Festive Favorites
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#173D32]">
                Find Your Christmas Look
              </h2>

              <p className="mt-3 text-sm text-[#77786F] leading-relaxed">
                From adorable animals to unforgettable Santa designs,
                find something that makes you smile.
              </p>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} featured />
              ))}

            </div>

            <div className="text-center mt-10">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 text-[#173D32] hover:text-[#8B2635] font-bold text-xs uppercase tracking-widest border-b border-[#173D32] hover:border-[#8B2635] pb-1 transition"
              >
                Explore All Collections
                <ArrowUpRight size={15} />
              </a>
            </div>

          </div>
        </section>
      )}

      {/* COLLECTIONS */}

      <main id="collections" className="bg-[#F2EFE7] py-20 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">

            <span className="text-[#8B2635] text-[10px] uppercase tracking-[0.22em] font-extrabold">
              Explore Our Collections
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#173D32]">
              Something for Every Christmas Lover
            </h2>

            <p className="mt-4 text-sm text-[#77786F] leading-relaxed">
              Twenty festive designs across four collections.
              Find your favorite and make the season a little more memorable.
            </p>

          </div>

          {filteredSections.length > 0 ? (

            <div className="space-y-20">

              {filteredSections.map(section => (

                <section
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-36"
                >

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7 pb-5 border-b border-[#DCD7CA]">

                    <div>

                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{section.emoji}</span>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#173D32]">
                          {section.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-[#77786F] mt-2 max-w-xl">
                        {section.subtitle}
                      </p>

                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B2635]">
                      {section.products.length} Designs
                    </span>

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">

                    {section.products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}

                  </div>

                </section>

              ))}

            </div>

          ) : (

            <div className="py-20 text-center">

              <div className="text-5xl mb-5">🎄</div>

              <h3 className="text-xl font-black text-[#173D32]">
                No designs found
              </h3>

              <p className="text-sm text-[#77786F] mt-2">
                Try searching for something else.
              </p>

              <button
                onClick={() => setSearchQuery('')}
                className="mt-6 bg-[#173D32] hover:bg-[#8B2635] text-white px-6 py-3 rounded-full text-xs font-bold transition"
              >
                Clear Search
              </button>

            </div>

          )}

        </div>
      </main>

      {/* BRAND VALUE SECTION */}

      <section className="bg-[#173D32] text-white py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <span className="text-[#E7C994] uppercase tracking-[0.2em] text-[10px] font-bold">
              The FestiveVault Experience
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-black">
              A Little More Christmas in Every Day.
            </h2>

            <p className="mt-4 text-sm text-white/65 max-w-xl mx-auto">
              We believe holiday clothing should be fun, expressive,
              and easy to shop for.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-8 text-center hover:bg-white/10 transition">

              <div className="w-14 h-14 rounded-full bg-[#E7C994]/15 text-[#E7C994] flex items-center justify-center mx-auto">
                <Truck size={25} />
              </div>

              <h3 className="font-bold text-lg mt-5">
                Free Shipping
              </h3>

              <p className="text-white/65 text-sm leading-relaxed mt-2">
                Enjoy free shipping on every order. No extra shipping charge at checkout.
              </p>

            </div>

            <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-8 text-center hover:bg-white/10 transition">

              <div className="w-14 h-14 rounded-full bg-[#E7C994]/15 text-[#E7C994] flex items-center justify-center mx-auto">
                <Heart size={25} />
              </div>

              <h3 className="font-bold text-lg mt-5">
                Designs Worth Smiling For
              </h3>

              <p className="text-white/65 text-sm leading-relaxed mt-2">
                Discover festive artwork inspired by the things we love most about Christmas.
              </p>

            </div>

            <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-8 text-center hover:bg-white/10 transition">

              <div className="w-14 h-14 rounded-full bg-[#E7C994]/15 text-[#E7C994] flex items-center justify-center mx-auto">
                <Gift size={25} />
              </div>

              <h3 className="font-bold text-lg mt-5">
                Made for Gifting
              </h3>

              <p className="text-white/65 text-sm leading-relaxed mt-2">
                Find something fun for friends, family, pet lovers, and Christmas enthusiasts.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}

      <section className="bg-[#F0E9DB] py-16 px-4 text-center">

        <span className="text-4xl">🎅</span>

        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-[#173D32]">
          Ready to Get Festive?
        </h2>

        <p className="mt-3 text-sm text-[#77786F] max-w-lg mx-auto">
          Your next favorite Christmas sweatshirt is waiting.
          Explore the collections and find your festive look.
        </p>

        <a
          href="#collections"
          className="inline-flex items-center gap-2 mt-7 bg-[#8B2635] hover:bg-[#72202D] text-white px-8 py-4 rounded-full text-xs font-extrabold uppercase tracking-widest transition shadow-lg"
        >
          Shop All Designs
          <ArrowUpRight size={16} />
        </a>

        <p className="mt-4 text-xs font-semibold text-[#173D32]">
          $24.99 · Free Shipping
        </p>

      </section>

      {/* FOOTER */}

      <footer className="bg-[#10291F] text-white/75 pt-14 pb-8">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

            <div className="lg:col-span-2">

              <Link href="/" className="inline-flex items-center gap-2">
                <span className="text-3xl">🎄</span>
                <span className="text-2xl font-black text-white">
                  Festive<span className="text-[#D5B77B]">Vault</span>
                </span>
              </Link>

              <p className="mt-4 text-sm leading-relaxed max-w-sm text-white/60">
                Bringing a little more fun, warmth, and Christmas spirit
                to your wardrobe. Discover festive designs made for
                the most wonderful time of the year.
              </p>

            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-5">
                Shop Collections
              </h4>

              <div className="flex flex-col gap-3 text-sm">
                <a href="#dogs" className="hover:text-[#E7C994] transition">Dog Lovers</a>
                <a href="#cats" className="hover:text-[#E7C994] transition">Cat Lovers</a>
                <a href="#santa" className="hover:text-[#E7C994] transition">Santa's Workshop</a>
                <a href="#christmas" className="hover:text-[#E7C994] transition">Christmas Classics</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-5">
                Our Store
              </h4>

              <div className="flex flex-col gap-3 text-sm">
                <a href="#featured" className="hover:text-[#E7C994] transition">Featured Designs</a>
                <a href="#collections" className="hover:text-[#E7C994] transition">Shop All</a>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="text-left hover:text-[#E7C994] transition"
                >
                  Shopping Cart
                </button>
              </div>
            </div>

          </div>

          <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/45">

            <p>
              © {new Date().getFullYear()} FestiveVault. All rights reserved.
            </p>

            <p className="tracking-wide">
              Christmas Made Wearable. 🎄
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}