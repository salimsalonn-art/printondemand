import ProductClient from './ProductClient';

const PRODUCTS = [
  // DOG'S LOVER (fd1 to fd5)
  { id: 1, name: "Festive Paws Premium Holiday Hoodie", category: "dogs", price: 54.99, rating: 4.9, reviews: 142, image: "/fd1.jpeg", description: "Luxurious heavy cotton holiday hoodie featuring festive dog winter artwork." },
  { id: 2, name: "Santa Paws Cozy Crewneck Sweatshirt", category: "dogs", price: 49.99, rating: 4.8, reviews: 98, image: "/fd2.jpeg", description: "Cozy crewneck sweatshirt with Santa Paws festive holiday print." },
  { id: 3, name: "Reindeer Pup Luxury Fleece Pullover", category: "dogs", price: 59.99, rating: 5.0, reviews: 215, image: "/fd3.jpeg", description: "Plush fleece pullover with reindeer puppy holiday graphics." },
  { id: 4, name: "Winter Puppy Knit Pattern Sweatshirt", category: "dogs", price: 49.99, rating: 4.7, reviews: 83, image: "/fd4.jpeg", description: "Winter knit pattern sweatshirt featuring adorable holiday puppies." },
  { id: 5, name: "Golden Retriever Festive Heritage Hoodie", category: "dogs", price: 54.99, rating: 4.9, reviews: 120, image: "/fd5.jpeg", description: "Golden retriever holiday heritage hoodie in cream and forest green." },

  // CAT'S LOVER (fc1 to fc5)
  { id: 6, name: "Festive Whiskers Holiday Cat Hoodie", category: "cats", price: 54.99, rating: 4.9, reviews: 164, image: "/fc1.jpeg", description: "Luxury holiday hoodie featuring festive cat and winter motifs." },
  { id: 7, name: "Santa Kitty Cozy Crewneck Sweatshirt", category: "cats", price: 49.99, rating: 4.8, reviews: 112, image: "/fc2.jpeg", description: "Santa kitty festive crewneck sweatshirt." },
  { id: 8, name: "Meowy Christmas Luxury Fleece Pullover", category: "cats", price: 59.99, rating: 5.0, reviews: 240, image: "/fc3.jpeg", description: "Meowy Christmas plush fleece holiday pullover." },
  { id: 9, name: "Winter Kitten Knit Pattern Sweatshirt", category: "cats", price: 49.99, rating: 4.7, reviews: 95, image: "/fc4.jpeg", description: "Winter kitten knit pattern holiday sweatshirt." },
  { id: 10, name: "Purrfect Holiday Heritage Hoodie", category: "cats", price: 54.99, rating: 4.9, reviews: 138, image: "/fc5.jpeg", description: "Purrfect holiday cat heritage hoodie." },

  // SANTA'S LOVERS (fs1 to fs5)
  { id: 11, name: "Classic St. Nick Luxury Velvet Hoodie", category: "santa", price: 64.99, rating: 5.0, reviews: 189, image: "/fs1.jpeg", description: "Classic St Nick luxury holiday hoodie with crimson accents." },
  { id: 12, name: "Vintage Santa Claus Crewneck Sweatshirt", category: "santa", price: 54.99, rating: 4.8, reviews: 145, image: "/fs2.jpeg", description: "Vintage Santa Claus festive crewneck sweatshirt." },
  { id: 13, name: "North Pole Headmaster Festive Pullover", category: "santa", price: 59.99, rating: 4.9, reviews: 177, image: "/fs3.jpeg", description: "North Pole headmaster holiday pullover." },
  { id: 14, name: "Jolly Saint Nick Signature Hoodie", category: "santa", price: 64.99, rating: 4.9, reviews: 156, image: "/fs4.jpeg", description: "Jolly Saint Nick signature Christmas hoodie." },
  { id: 15, name: "Midnight Santa Holiday Sweatshirt", category: "santa", price: 54.99, rating: 4.7, reviews: 91, image: "/fs5.jpeg", description: "Midnight Santa dark green holiday sweatshirt." },

  // CHRISTMAS'S LOVER (fr1 to fr5)
  { id: 16, name: "Midnight Evergreen Holiday Luxury Hoodie", category: "christmas", price: 59.99, rating: 4.9, reviews: 210, image: "/fr1.jpeg", description: "Midnight evergreen luxury Christmas holiday hoodie." },
  { id: 17, name: "Golden Snowflake Heritage Crewneck", category: "christmas", price: 54.99, rating: 4.8, reviews: 165, image: "/fr2.jpeg", description: "Golden snowflake heritage Christmas crewneck." },
  { id: 18, name: "Winter Wonderland Festive Pullover", category: "christmas", price: 59.99, rating: 5.0, reviews: 230, image: "/fr3.jpeg", description: "Winter wonderland festive Christmas pullover." },
  { id: 19, name: "Royal Pine Christmas Cashmere-Blend Hoodie", category: "christmas", price: 69.99, rating: 5.0, reviews: 310, image: "/fr4.jpeg", description: "Royal pine Christmas cashmere blend luxury hoodie." },
  { id: 20, name: "Silent Night Velvet Holiday Sweatshirt", category: "christmas", price: 54.99, rating: 4.8, reviews: 142, image: "/fr5.jpeg", description: "Silent night velvet holiday Christmas sweatshirt." }
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