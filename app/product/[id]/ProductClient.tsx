
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import {
  Truck,
  ShieldCheck,
  ArrowLeft,
  ZoomIn,
  X,
  ShoppingBag,
  ShoppingCart,
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
 
  image: string;
  description: string;
}


const QUALITY_IMAGES = [
  { image: '/l1.jpeg', title: 'Premium Fabric' },
  { image: '/l2.jpeg', title: 'Quality Details' },
  { image: '/l3.jpeg', title: 'Comfortable Feel' },
  { image: '/l4.jpeg', title: 'Made to Last' },
];

function addBusinessDays(startDate: Date, days: number) {
  const date = new Date(startDate);
  let addedDays = 0;

  while (addedDays < days) {
    date.setDate(date.getDate() + 1);

    if (date.getDay() !== 0 && date.getDay() !== 6) {
      addedDays++;
    }
  }

  return date;
}

function formatDeliveryDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
}


export default function ProductClient({ product }: { product: Product }) {
  const { cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen, totalPrice } = useCart();
  const PRODUCT_PRICE = 25.99;
 const [earliestDelivery, setEarliestDelivery] = useState<Date | null>(null);
const [latestDelivery, setLatestDelivery] = useState<Date | null>(null);

useEffect(() => {
  const today = new Date();

  setEarliestDelivery(addBusinessDays(today, 5));
  setLatestDelivery(addBusinessDays(today, 10));
}, []);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [selectedGender, setSelectedGender] = useState<'Men' | 'Women'>('Men');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [sizeChartGender, setSizeChartGender] = useState<'Men' | 'Women'>('Men');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const [enlargedImage, setEnlargedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

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
          <span>Festive styles for every Christmas lover</span>
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

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173D32] hover:text-[#8B2635] transition"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Continue Shopping</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-[#173D32] px-4 py-3 text-white transition hover:bg-[#245443]"
              aria-label={`Open shopping cart, ${cart.length} items`}
            >
              <ShoppingCart size={18} />
              <span className="text-xs font-bold">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8B2635] px-1 text-[10px] font-black text-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

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

            {/* HOODIE QUALITY */}

            <div className="mt-10">

              <div className="text-center mb-5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#8B2635]">
                  The Details Matter
                </span>

                <h2 className="mt-2 text-xl font-black text-[#173D32]">
                  Made for Comfort & Quality
                </h2>

                <p className="mt-2 text-xs text-[#77786F] leading-relaxed">
                  Take a closer look at the details behind every hoodie.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">

                {QUALITY_IMAGES.map((item) => (

                  <div
                    key={item.image}
                    className="bg-white border border-[#E9E4D9] rounded-2xl overflow-hidden"
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setEnlargedImage({
                          src: item.image,
                          alt: item.title,
                        })
                      }
                      aria-label={`Enlarge ${item.title}`}
                      className="w-full aspect-square bg-[#F0EDE6] overflow-hidden cursor-zoom-in group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </button>

                    <p className="text-center text-[11px] font-bold text-[#173D32] py-3 px-2">
                      {item.title}
                    </p>

                  </div>

                ))}

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
                  {`Just $${PRODUCT_PRICE.toFixed(2)}. Shipping is on us.`}
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

                  <button
                    type="button"
                    onClick={() => {
                      setSizeChartGender(selectedGender);
                      setIsSizeChartOpen(true);
                    }}
                    className="text-[11px] font-bold text-[#8B2635] underline underline-offset-4 hover:text-[#173D32] transition"
                  >
                    Size Guide
                  </button>
                </div>

                <p className="text-[10px] text-[#8A8173] mb-3">
                  {selectedSize} selected
                </p>

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

<div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
  <div className="flex items-center gap-3">
    <Truck className="h-6 w-6 text-green-700" />

    <div>
      <p className="font-bold text-green-900">
        FREE SHIPPING ON EVERY ORDER
      </p>
      <p className="text-sm text-green-800">
        No shipping fees at checkout.
      </p>
    </div>
  </div>

  <div className="mt-4 flex items-start gap-3 border-t border-green-200 pt-4">
    <Check className="mt-1 h-5 w-5 text-green-700" />

   <div>
  <p className="font-semibold text-gray-900">
    Estimated delivery: 5–10 business days
  </p>

  <p className="mt-1 text-sm text-gray-700">
    {earliestDelivery && latestDelivery ? (
      <>
        Expected between {formatDeliveryDate(earliestDelivery)} and{' '}
        {formatDeliveryDate(latestDelivery)}
      </>
    ) : (
      'Calculating delivery dates...'
    )}
  </p>
</div>
  </div>
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

      {/* SIZE GUIDE MODAL */}

      {isSizeChartOpen && (

        <div
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsSizeChartOpen(false)}
        >

          <div
            className="bg-[#FAF7F0] w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="text-xl font-black text-[#173D32]">
                  Size Guide
                </h2>

                <p className="text-xs text-[#8A8173] mt-1">
                  Find the right fit before ordering.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSizeChartOpen(false)}
                aria-label="Close size guide"
                className="p-2 rounded-full bg-[#E9E4D9] text-[#173D32] hover:bg-[#DCD4C5] transition"
              >
                <X size={20} />
              </button>

            </div>

            {/* MEN / WOMEN SELECTOR */}

            <div className="grid grid-cols-2 gap-3 mb-7">

              {(['Men', 'Women'] as const).map((gender) => (

                <button
                  key={gender}
                  type="button"
                  onClick={() => setSizeChartGender(gender)}
                  aria-pressed={sizeChartGender === gender}
                  className={`py-3.5 rounded-xl text-xs font-extrabold transition-all border ${
                    sizeChartGender === gender
                      ? 'bg-[#173D32] border-[#173D32] text-white shadow-md'
                      : 'bg-white border-[#E3DED3] text-[#173D32] hover:border-[#173D32]'
                  }`}
                >
                  {gender}'s Size Chart
                </button>

              ))}

            </div>

            {/* BODY CHART */}

            <div className="space-y-7">

              <div>

                <h3 className="text-sm font-extrabold text-[#173D32] mb-3">
                  Body Chart
                </h3>

                <div className="bg-white border border-[#E9E4D9] rounded-2xl overflow-hidden">

                  <button
                    type="button"
                    onClick={() =>
                      setEnlargedImage({
                        src: sizeChartGender === 'Men' ? '/sizem1.jpeg' : '/sizew1.jpeg',
                        alt: `${sizeChartGender} Body Chart`,
                      })
                    }
                    className="w-full cursor-zoom-in"
                    aria-label="Enlarge body chart"
                  >
                    <img
                      src={sizeChartGender === 'Men' ? '/sizem1.jpeg' : '/sizew1.jpeg'}
                      alt={`${sizeChartGender} body size chart`}
                      className="w-full h-auto object-contain hover:opacity-90 transition"
                    />
                  </button>

                </div>

                <p className="text-center text-[10px] text-[#8A8173] mt-2">
                  Click image to enlarge
                </p>

              </div>

              {/* PRODUCT CHART */}

              <div>

                <h3 className="text-sm font-extrabold text-[#173D32] mb-3">
                  Product Chart
                </h3>

                <div className="bg-white border border-[#E9E4D9] rounded-2xl overflow-hidden">

                  <button
                    type="button"
                    onClick={() =>
                      setEnlargedImage({
                        src: sizeChartGender === 'Men' ? '/sizem2.jpeg' : '/sizew2.jpeg',
                        alt: `${sizeChartGender} Product Chart`,
                      })
                    }
                    className="w-full cursor-zoom-in"
                    aria-label="Enlarge product chart"
                  >
                    <img
                      src={sizeChartGender === 'Men' ? '/sizem2.jpeg' : '/sizew2.jpeg'}
                      alt={`${sizeChartGender} product size chart`}
                      className="w-full h-auto object-contain hover:opacity-90 transition"
                    />
                  </button>

                </div>

                <p className="text-center text-[10px] text-[#8A8173] mt-2">
                  Click image to enlarge
                </p>

              </div>

            </div>

            {/* FOOTER */}

            <button
              type="button"
              onClick={() => setIsSizeChartOpen(false)}
              className="w-full mt-7 py-4 rounded-xl bg-[#173D32] text-white text-xs font-extrabold uppercase tracking-widest hover:bg-[#245443] transition"
            >
              Done
            </button>

          </div>

        </div>

      )}

      {/* UNIVERSAL IMAGE ENLARGEMENT */}

      {enlargedImage && (

        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setEnlargedImage(null)}
        >

          <button
            type="button"
            onClick={() => setEnlargedImage(null)}
            aria-label="Close enlarged image"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 bg-white/15 hover:bg-white/25 text-white p-3 rounded-full transition z-10"
          >
            <X size={24} />
          </button>

          <div
            className="max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={enlargedImage.src}
              alt={enlargedImage.alt}
              className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            <p className="mt-4 text-white text-sm font-semibold text-center">
              {enlargedImage.alt}
            </p>

            <p className="mt-2 text-white/60 text-xs">
              Click outside the image to close.
            </p>

          </div>

        </div>

      )}

      {/* PRODUCT IMAGE ZOOM MODAL */}

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

      {/* SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#FAF7F0] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E9E4D9] p-6">
              <div>
                <h2 className="text-xl font-black text-[#173D32]">Your Shopping Cart</h2>
                <p className="mt-1 text-xs text-[#8A8173]">
                  {cart.length} item{cart.length === 1 ? '' : 's'} in your cart
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-2 text-[#173D32] transition hover:bg-[#E9E4D9]"
                aria-label="Close shopping cart"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag size={42} className="mx-auto text-[#8A8173]" />
                  <h3 className="mt-4 font-bold text-[#173D32]">Your cart is empty</h3>
                  <p className="mt-2 text-sm text-[#8A8173]">Discover something festive!</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size ?? 'no-size'}-${item.gender ?? 'no-gender'}-${index}`}
                      className="flex gap-4 border-b border-[#E9E4D9] pb-5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl bg-white object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-[#173D32]">{item.name}</h3>
                        <p className="mt-1 text-xs text-[#8A8173]">
                          {item.gender ? `${item.gender}'s Cut` : 'Standard'}
                          {item.size ? ` · Size ${item.size}` : ''}
                        </p>
                        <p className="mt-2 text-sm font-black text-[#8B2635]">
                          ${item.price.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(index)}
                          className="mt-2 text-xs text-[#8B2635] underline underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#E9E4D9] bg-white p-6">
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-[#686E65]">Subtotal</span>
                  <span className="font-bold text-[#173D32]">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="mb-4 flex justify-between">
                  <span className="text-sm text-[#686E65]">Shipping</span>
                  <span className="text-sm font-bold text-green-700">FREE</span>
                </div>
                <div className="mb-5 flex justify-between border-t border-[#E9E4D9] pt-4">
                  <span className="font-black text-[#173D32]">Total</span>
                  <span className="text-xl font-black text-[#8B2635]">${totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full rounded-xl bg-[#8B2635] py-4 text-center text-xs font-extrabold uppercase tracking-widest text-white transition hover:bg-[#72202D]"
                >
                  Proceed to Checkout
                </Link>
                <p className="mt-3 text-center text-[10px] text-[#8A8173]">
                  Free shipping · Secure checkout
                </p>
              </div>
            )}
          </section>
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
