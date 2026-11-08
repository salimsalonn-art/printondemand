
'use client';

import Footer from '@/components/Footer';
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
    subtitle:
      'For the people whose Christmas wish list starts with their furry best friend.',
    products: [
      { id: 1, name: 'Festive Paws Holiday Hoodie', image: '/fd1.jpeg', alt: 'Festive dog Christmas artwork hoodie', badge: 'Dog Lover Favorite' },
      { id: 2, name: 'Santa Paws Cozy Crewneck', image: '/fd2.jpeg', alt: 'Santa Paws Christmas crewneck sweatshirt', badge: 'Holiday Pick' },
      { id: 3, name: 'Reindeer Pup Christmas Pullover', image: '/fd3.jpeg', alt: 'Reindeer puppy Christmas pullover', badge: 'Festive Favorite' },
      { id: 4, name: 'Winter Puppies Sweatshirt', image: '/fd4.jpeg', alt: 'Winter puppies Christmas sweatshirt', badge: 'Cute & Cozy' },
      { id: 5, name: 'Golden Retriever Christmas Hoodie', image: '/fd5.jpeg', alt: 'Golden retriever Christmas hoodie', badge: 'Dog Lover Favorite' },
    ],
  },
  {
    id: 'cats',
    title: 'Cat Lovers',
    emoji: '🐈',
    subtitle:
      'A little Christmas magic, a lot of attitude, and plenty of purr-sonality.',
    products: [
      { id: 6, name: 'Festive Whiskers Cat Hoodie', image: '/fc1.jpeg', alt: 'Festive cat Christmas hoodie', badge: 'Cat Lover Favorite' },
      { id: 7, name: 'Santa Kitty Cozy Crewneck', image: '/fc2.jpeg', alt: 'Santa kitty Christmas crewneck', badge: 'Holiday Pick' },
      { id: 8, name: 'Meowy Christmas Pullover', image: '/fc3.jpeg', alt: 'Meowy Christmas cat sweatshirt', badge: 'Festive Favorite' },
      { id: 9, name: 'Winter Kitten Sweatshirt', image: '/fc4.jpeg', alt: 'Winter kitten Christmas sweatshirt', badge: 'Cute & Cozy' },
      { id: 10, name: 'Purrfect Holiday Hoodie', image: '/fc5.jpeg', alt: 'Purrfect holiday cat hoodie', badge: 'Cat Lover Favorite' },
    ],
  },
  {
    id: 'santa',
    title: "Santa's Workshop",
    emoji: '🎅',
    subtitle:
      'For those who believe Santa deserves a wardrobe upgrade.',
    products: [
      { id: 11, name: 'Classic Santa Christmas Hoodie', image: '/fs1.jpeg', alt: 'Classic Santa Christmas hoodie', badge: 'Santa Favorite' },
      { id: 12, name: 'Vintage Santa Crewneck', image: '/fs2.jpeg', alt: 'Vintage Santa Claus crewneck', badge: 'Holiday Pick' },
      { id: 13, name: 'North Pole Headmaster Pullover', image: '/fs3.jpeg', alt: 'North Pole Santa holiday pullover', badge: 'Festive Favorite' },
      { id: 14, name: 'Jolly Saint Nick Hoodie', image: '/fs4.jpeg', alt: 'Jolly Saint Nick Christmas hoodie', badge: 'Santa Favorite' },
      { id: 15, name: 'Midnight Santa Sweatshirt', image: '/fs5.jpeg', alt: 'Midnight Santa Christmas sweatshirt', badge: 'Holiday Pick' },
    ],
  },
  {
    id: 'christmas',
    title: 'Christmas Classics',
    emoji: '🎄',
    subtitle:
      'Snowflakes, winter magic, and everything that makes December special.',
    products: [
      { id: 16, name: 'Midnight Evergreen Hoodie', image: '/fr1.jpeg', alt: 'Evergreen Christmas hoodie', badge: 'Holiday Favorite' },
      { id: 17, name: 'Golden Snowflake Crewneck', image: '/fr2.jpeg', alt: 'Golden snowflake Christmas crewneck', badge: 'Holiday Pick' },
      { id: 18, name: 'Winter Wonderland Pullover', image: '/fr3.jpeg', alt: 'Winter wonderland Christmas sweatshirt', badge: 'Festive Favorite' },
      { id: 19, name: 'Royal Pine Christmas Hoodie', image: '/fr4.jpeg', alt: 'Royal pine Christmas hoodie', badge: 'Holiday Favorite' },
      { id: 20, name: 'Silent Night Sweatshirt', image: '/fr5.jpeg', alt: 'Silent night Christmas sweatshirt', badge: 'Holiday Pick' },
    ],
  },
];

const ALL_PRODUCTS: Product[] = SECTIONS.flatMap((section) =>
  section.products.map((product) => ({
    ...product,
    sectionId: section.id,
    sectionTitle: section.title,
  }))
);

const FEATURED_IDS = [1, 6, 11, 16];

const NAV_LINKS = [
  ['Featured', '#featured'],
  ['Dog Lovers', '#dogs'],
  ['Cat Lovers', '#cats'],
  ["Santa's Workshop", '#santa'],
  ['Christmas Classics', '#christmas'],
];

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E4D9] bg-white transition-all duration-300 hover:border-[#B9C9B9] hover:shadow-lg sm:rounded-2xl">

      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-[#F1EEE7]"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-2 top-2 max-w-[85%] rounded-full bg-white/95 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-[#244536] shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:text-[10px]">
          {product.badge}
        </span>

        <div className="absolute inset-0 hidden items-center justify-center bg-[#173D32]/10 opacity-0 transition-opacity duration-300 group-hover:flex group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#173D32] shadow-lg">
            View Design <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>

      <div className="flex grow flex-col p-2.5 sm:p-4 lg:p-5">
        <div className="grow">
          <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-wider text-[#9A7960] sm:mb-2 sm:text-[10px]">
            {product.sectionTitle}
          </p>

          <Link href={`/product/${product.id}`}>
            <h3 className="line-clamp-2 min-h-[36px] text-[11px] font-bold leading-snug text-[#26372E] transition-colors group-hover:text-[#8B2635] sm:min-h-[42px] sm:text-sm">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-2.5 flex flex-col gap-2 border-t border-[#F0EDE6] pt-2.5 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-3">
          <div>
            <span className="block text-[8px] font-medium text-[#8A8A80] sm:text-[10px]">
              Free shipping
            </span>
            <span className="text-base font-extrabold text-[#173D32] sm:text-xl">
              ${PRODUCT_PRICE.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="inline-flex min-h-[36px] w-full items-center justify-center gap-1 rounded-lg bg-[#173D32] px-2 py-2 text-[10px] font-bold text-white transition-colors hover:bg-[#8B2635] sm:min-h-[40px] sm:w-auto sm:px-3 sm:text-[11px]"
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

    return SECTIONS.map((section) => ({
      ...section,
      products: section.products.filter((product) =>
        `${product.name} ${section.title} ${product.badge}`
          .toLowerCase()
          .includes(query)
      ),
    })).filter((section) => section.products.length > 0);
  }, [searchQuery]);

  const featuredProducts = ALL_PRODUCTS.filter((product) =>
    FEATURED_IDS.includes(product.id)
  );

  const showFeatured = !searchQuery.trim();

  const closeMobilePanels = () => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF7F0] font-sans text-[#252B25] selection:bg-[#8B2635] selection:text-white">

      {/* ANNOUNCEMENT BAR */}

      <div className="bg-[#173D32] px-3 py-2 text-center text-white">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] font-semibold tracking-wide sm:text-xs">
          <Sparkles size={12} className="text-[#D5B77B]" />
          <span>Christmas shopping just got better.</span>
          <span className="font-extrabold text-[#E7C994]">
            $24.99 + FREE SHIPPING
          </span>
          <Sparkles size={12} className="text-[#D5B77B]" />
        </p>
      </div>

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-[#E9E4D9] bg-[#FAF7F0]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

          <div className="flex h-[62px] items-center justify-between gap-2 sm:h-[76px] sm:gap-4">

            {/* LOGO */}

            <Link
              href="/"
              onClick={closeMobilePanels}
              className="flex min-w-0 shrink items-center gap-2 sm:gap-2.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#173D32] shadow-md sm:h-11 sm:w-11">
                <span className="text-xl sm:text-2xl">🎄</span>
              </div>

              <div className="min-w-0">
                <span className="block whitespace-nowrap text-[18px] font-black tracking-tight text-[#173D32] sm:text-2xl">
                  Festive<span className="text-[#8B2635]">Vault</span>
                </span>
                <span className="hidden text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8173] sm:block">
                  Christmas Made Wearable
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}

            <nav className="hidden items-center gap-5 text-[11px] font-bold uppercase tracking-wider text-[#455348] xl:flex">
              {NAV_LINKS.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="whitespace-nowrap transition hover:text-[#8B2635]"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* HEADER ACTIONS */}

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">

              <button
                type="button"
                onClick={() => {
                  setMobileSearchOpen(!mobileSearchOpen);
                  setMobileMenuOpen(false);
                }}
                aria-label={mobileSearchOpen ? 'Close search' : 'Search products'}
                aria-expanded={mobileSearchOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#173D32] transition hover:bg-[#EDE9DF] sm:h-11 sm:w-11"
              >
                {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open shopping cart, ${cart.length} items`}
                className="relative flex h-10 items-center justify-center gap-2 rounded-full bg-[#8B2635] px-3 text-white shadow-sm transition hover:bg-[#72202D] sm:h-11 sm:px-5"
              >
                <ShoppingBag size={17} />
                <span className="hidden text-xs font-bold sm:inline">
                  My Cart
                </span>
                <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-black text-[#8B2635]">
                  {cart.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setMobileSearchOpen(false);
                }}
                aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={mobileMenuOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#173D32] transition hover:bg-[#EDE9DF] xl:hidden"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}

          {mobileSearchOpen && (
            <div className="border-t border-[#E9E4D9] py-3 sm:py-4">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8173]"
                  size={17}
                />
                <input
                  type="search"
                  autoFocus
                  placeholder="Search Christmas designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-[#E2DDD1] bg-white py-3 pl-11 pr-4 text-base text-[#173D32] outline-none focus:border-[#8B2635] focus:ring-2 focus:ring-[#8B2635]/10 sm:text-sm"
                />
              </div>
            </div>
          )}

          {/* MOBILE MENU */}

          {mobileMenuOpen && (
            <nav className="border-t border-[#E9E4D9] py-3 xl:hidden">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {NAV_LINKS.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-[44px] items-center rounded-xl bg-white px-3 py-3 text-xs font-bold text-[#173D32] transition hover:bg-[#EDE9DF] hover:text-[#8B2635]"
                  >
                    {label}
                    <ArrowUpRight size={13} className="ml-auto shrink-0" />
                  </a>
                ))}
              </div>
            </nav>
          )}

          {/* DESKTOP SEARCH */}

          <div className="hidden pb-3 md:block">
            <div className="relative max-w-sm">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8173]"
                size={15}
              />
              <input
                type="search"
                placeholder="Find your favorite Christmas design..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#E9E4D9] bg-white py-2.5 pl-10 pr-4 text-xs text-[#173D32] outline-none transition focus:border-[#8B2635]"
              />
            </div>
          </div>

        </div>
      </header>

      {/* HERO */}

      <section className="relative flex min-h-[590px] items-center overflow-hidden bg-[#173D32] sm:min-h-[570px] lg:min-h-[640px]">

        {/* Mobile background image */}

        <img
          src="/fd1.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover sm:hidden"
        />

        {/* Desktop background video */}

        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/fd1.jpeg"
          className="absolute inset-0 hidden h-full w-full object-cover opacity-50 sm:block"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-[#10291F]/85 via-[#173D32]/80 to-[#10291F]/95 sm:bg-gradient-to-r sm:from-[#10291F]/95 sm:via-[#173D32]/75 sm:to-[#173D32]/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#10291F]/40 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">

          <div className="mx-auto max-w-3xl text-center sm:mx-0 sm:text-left">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D5B77B]/40 bg-white/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#F0D9AA] backdrop-blur-sm sm:mb-7 sm:px-4 sm:text-xs">
              <Sparkles size={13} />
              Your Christmas, Your Style
            </div>

            <h1 className="text-[38px] font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Christmas Looks
              <br />
              <span className="text-[#E7C994]">
                Good on You.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[13px] leading-relaxed text-white/85 sm:mx-0 sm:mt-7 sm:text-lg">
              A little festive, a little funny, and a whole lot of Christmas
              spirit. Discover original holiday designs made for dog lovers,
              cat people, Santa fans, and everyone who loves the season.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row sm:justify-start">

              <a
                href="#collections"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#8B2635] px-7 py-3.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xl transition hover:bg-[#A33343] sm:px-8 sm:py-4"
              >
                Shop Christmas Collection
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#featured"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/20 sm:px-8 sm:py-4"
              >
                Explore Featured Designs
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[10px] font-semibold text-white/90 sm:mt-9 sm:justify-start sm:gap-x-6 sm:text-xs">
              <span className="flex items-center gap-1.5">
                <Truck size={15} className="text-[#E7C994]" />
                Free Shipping
              </span>
              <span className="flex items-center gap-1.5">
                <Gift size={15} className="text-[#E7C994]" />
                Perfect for Gifting
              </span>
              <span className="flex items-center gap-1.5">
                <Heart size={15} className="text-[#E7C994]" />
                Made for Christmas Lovers
              </span>
            </div>

          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#D5B77B]/10 blur-3xl" />
      </section>

      {/* PRICE PROMOTION STRIP */}

      <section className="border-b border-[#E3D9C8] bg-[#F0E9DB]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-5 text-center sm:flex-row sm:gap-8 sm:px-6 sm:py-6">

          <div className="flex items-center gap-3 text-left">
            <span className="text-3xl">🎁</span>
            <div>
              <p className="text-sm font-extrabold text-[#173D32]">
                One price. No shipping surprises.
              </p>
              <p className="text-[11px] text-[#82796B] sm:text-xs">
                Your favorite Christmas designs, delivered with free shipping.
              </p>
            </div>
          </div>

          <div className="hidden h-10 w-px bg-[#D8CCB8] sm:block" />

          <div className="text-2xl font-black text-[#8B2635]">
            $24.99
            <span className="block text-center text-[9px] uppercase tracking-widest text-[#173D32] sm:text-[10px]">
              Every design
            </span>
          </div>
        </div>
      </section>

      {/* FEATURED DESIGNS */}

      {showFeatured && (
        <section
          id="featured"
          className="scroll-mt-28 bg-[#FAF7F0] py-12 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

            <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#8B2635] sm:text-[10px]">
                A Few Festive Favorites
              </span>

              <h2 className="mt-2 text-2xl font-black text-[#173D32] sm:mt-3 sm:text-4xl">
                Find Your Christmas Look
              </h2>

              <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#77786F] sm:mt-3 sm:text-sm">
                From adorable animals to unforgettable Santa designs,
                find something that makes you smile.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 text-center sm:mt-10">
              <a
                href="#collections"
                className="inline-flex min-h-[40px] items-center gap-2 border-b border-[#173D32] pb-1 text-[10px] font-bold uppercase tracking-widest text-[#173D32] transition hover:border-[#8B2635] hover:text-[#8B2635] sm:text-xs"
              >
                Explore All Collections
                <ArrowUpRight size={15} />
              </a>
            </div>

          </div>
        </section>
      )}

      {/* COLLECTIONS */}

      <main
        id="collections"
        className="scroll-mt-20 bg-[#F2EFE7] py-12 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#8B2635] sm:text-[10px]">
              Explore Our Collections
            </span>

            <h2 className="mt-2 text-2xl font-black text-[#173D32] sm:mt-3 sm:text-4xl">
              Something for Every Christmas Lover
            </h2>

            <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-[#77786F] sm:mt-4 sm:text-sm">
              Twenty festive designs across four collections.
              Find your favorite and make the season a little more memorable.
            </p>
          </div>

          {filteredSections.length > 0 ? (
            <div className="space-y-12 sm:space-y-20">

              {filteredSections.map((section) => (
                <section
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-24"
                >

                  <div className="mb-5 flex flex-col gap-2 border-b border-[#DCD7CA] pb-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pb-5">

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">
                          {section.emoji}
                        </span>
                        <h3 className="text-xl font-black text-[#173D32] sm:text-3xl">
                          {section.title}
                        </h3>
                      </div>

                      <p className="mt-1.5 max-w-xl text-[11px] leading-relaxed text-[#77786F] sm:mt-2 sm:text-sm">
                        {section.subtitle}
                      </p>
                    </div>

                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#8B2635] sm:text-[10px]">
                      {section.products.length} Designs
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
                    {section.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                </section>
              ))}

            </div>
          ) : (
            <div className="py-16 text-center sm:py-20">
              <div className="mb-5 text-5xl">🎄</div>

              <h3 className="text-xl font-black text-[#173D32]">
                No designs found
              </h3>

              <p className="mt-2 text-sm text-[#77786F]">
                Try searching for something else.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setMobileSearchOpen(false);
                }}
                className="mt-6 min-h-[44px] rounded-full bg-[#173D32] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#8B2635]"
              >
                Clear Search
              </button>
            </div>
          )}

        </div>
      </main>

      {/* BRAND VALUE SECTION */}

      <section className="bg-[#173D32] py-12 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-8 text-center sm:mb-12">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E7C994] sm:text-[10px]">
              The FestiveVault Experience
            </span>

            <h2 className="mt-2 text-2xl font-black sm:mt-3 sm:text-4xl">
              A Little More Christmas in Every Day.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-xs text-white/65 sm:mt-4 sm:text-sm">
              We believe holiday clothing should be fun, expressive,
              and easy to shop for.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 text-center transition hover:bg-white/10 sm:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E7C994]/15 text-[#E7C994] sm:h-14 sm:w-14">
                <Truck size={24} />
              </div>

              <h3 className="mt-4 text-base font-bold sm:mt-5 sm:text-lg">
                Free Shipping
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-white/65 sm:text-sm">
                Enjoy free shipping on every order. No extra shipping charge at checkout.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 text-center transition hover:bg-white/10 sm:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E7C994]/15 text-[#E7C994] sm:h-14 sm:w-14">
                <Heart size={24} />
              </div>

              <h3 className="mt-4 text-base font-bold sm:mt-5 sm:text-lg">
                Designs Worth Smiling For
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-white/65 sm:text-sm">
                Discover festive artwork inspired by the things we love most about Christmas.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 text-center transition hover:bg-white/10 sm:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E7C994]/15 text-[#E7C994] sm:h-14 sm:w-14">
                <Gift size={24} />
              </div>

              <h3 className="mt-4 text-base font-bold sm:mt-5 sm:text-lg">
                Made for Gifting
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-white/65 sm:text-sm">
                Find something fun for friends, family, pet lovers, and Christmas enthusiasts.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}

      <section className="bg-[#F0E9DB] px-4 py-12 text-center sm:py-16">
        <span className="text-4xl">🎅</span>

        <h2 className="mt-3 text-2xl font-black text-[#173D32] sm:mt-4 sm:text-3xl">
          Ready to Get Festive?
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-[#77786F] sm:text-sm">
          Your next favorite Christmas sweatshirt is waiting.
          Explore the collections and find your festive look.
        </p>

        <a
          href="#collections"
          className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#8B2635] px-8 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#72202D] sm:mt-7 sm:py-4 sm:text-xs"
        >
          Shop All Designs
          <ArrowUpRight size={16} />
        </a>

        <p className="mt-4 text-xs font-semibold text-[#173D32]">
          $24.99 · Free Shipping
        </p>
      </section>

      {/* FOOTER */}

      <Footer />

    </div>
  );
}
