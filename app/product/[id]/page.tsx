
import ProductClient from './ProductClient';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

const PRODUCTS = [
  // DOG'S LOVER
  {
    id: 1,
    name: "Festive Paws Holiday Hoodie",
    category: "dogs",
    price: 24.99,
    image: "/fd1.jpeg",
    description: "A festive holiday design featuring an adorable dog with a touch of Christmas spirit.",
  },
  {
    id: 2,
    name: "Santa Paws Christmas Sweatshirt",
    category: "dogs",
    price: 24.99,
    image: "/fd2.jpeg",
    description: "A playful Christmas-inspired dog design for the holiday season.",
  },
  {
    id: 3,
    name: "Reindeer Pup Holiday Pullover",
    category: "dogs",
    price: 24.99,
    image: "/fd3.jpeg",
    description: "A fun holiday design featuring a festive puppy and Christmas details.",
  },
  {
    id: 4,
    name: "Winter Puppy Christmas Sweatshirt",
    category: "dogs",
    price: 24.99,
    image: "/fd4.jpeg",
    description: "A cheerful winter design featuring adorable holiday puppies.",
  },
  {
    id: 5,
    name: "Golden Retriever Christmas Hoodie",
    category: "dogs",
    price: 24.99,
    image: "/fd5.jpeg",
    description: "A Christmas-inspired design celebrating everyone's favorite golden companion.",
  },

  // CAT'S LOVER
  {
    id: 6,
    name: "Festive Whiskers Cat Hoodie",
    category: "cats",
    price: 24.99,
    image: "/fc1.jpeg",
    description: "A charming Christmas design featuring a festive feline companion.",
  },
  {
    id: 7,
    name: "Santa Kitty Christmas Sweatshirt",
    category: "cats",
    price: 24.99,
    image: "/fc2.jpeg",
    description: "A playful cat-themed holiday design with plenty of Christmas personality.",
  },
  {
    id: 8,
    name: "Meowy Christmas Pullover",
    category: "cats",
    price: 24.99,
    image: "/fc3.jpeg",
    description: "A fun and festive design for cat lovers celebrating Christmas.",
  },
  {
    id: 9,
    name: "Winter Kitten Sweatshirt",
    category: "cats",
    price: 24.99,
    image: "/fc4.jpeg",
    description: "A cute holiday-inspired kitten design that brings Christmas cheer.",
  },
  {
    id: 10,
    name: "Purrfect Holiday Hoodie",
    category: "cats",
    price: 24.99,
    image: "/fc5.jpeg",
    description: "A festive design celebrating cats and the magic of the holiday season.",
  },

  // SANTA'S LOVERS
  {
    id: 11,
    name: "Classic St. Nick Hoodie",
    category: "santa",
    price: 24.99,
    image: "/fs1.jpeg",
    description: "A Santa-inspired Christmas design with a festive holiday look.",
  },
  {
    id: 12,
    name: "Vintage Santa Christmas Sweatshirt",
    category: "santa",
    price: 24.99,
    image: "/fs2.jpeg",
    description: "A festive Santa Claus design inspired by classic Christmas illustrations.",
  },
  {
    id: 13,
    name: "North Pole Headmaster Pullover",
    category: "santa",
    price: 24.99,
    image: "/fs3.jpeg",
    description: "A playful North Pole-inspired design with a Christmas twist.",
  },
  {
    id: 14,
    name: "Jolly Saint Nick Hoodie",
    category: "santa",
    price: 24.99,
    image: "/fs4.jpeg",
    description: "A cheerful Santa-inspired design for the Christmas season.",
  },
  {
    id: 15,
    name: "Midnight Santa Sweatshirt",
    category: "santa",
    price: 24.99,
    image: "/fs5.jpeg",
    description: "A festive Santa design with a darker Christmas-inspired look.",
  },

  // CHRISTMAS COLLECTION
  {
    id: 16,
    name: "Midnight Evergreen Hoodie",
    category: "christmas",
    price: 24.99,
    image: "/fr1.jpeg",
    description: "A Christmas-inspired design featuring an evergreen holiday theme.",
  },
  {
    id: 17,
    name: "Golden Snowflake Sweatshirt",
    category: "christmas",
    price: 24.99,
    image: "/fr2.jpeg",
    description: "A festive snowflake design inspired by the beauty of winter.",
  },
  {
    id: 18,
    name: "Winter Wonderland Pullover",
    category: "christmas",
    price: 24.99,
    image: "/fr3.jpeg",
    description: "A cheerful winter wonderland design for the Christmas season.",
  },
  {
    id: 19,
    name: "Royal Pine Christmas Hoodie",
    category: "christmas",
    price: 24.99,
    image: "/fr4.jpeg",
    description: "A festive Christmas design inspired by evergreen holiday scenery.",
  },
  {
    id: 20,
    name: "Silent Night Holiday Sweatshirt",
    category: "christmas",
    price: 24.99,
    image: "/fr5.jpeg",
    description: "A Christmas-inspired design with a calm and festive holiday feel.",
  },
];

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductClient product={product} />
      <Footer />
    </>
  );
}