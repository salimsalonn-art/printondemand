import ProductClient from './ProductClient';

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

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  return <ProductClient product={product} />;
}