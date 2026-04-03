export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
  featured?: boolean
}

export interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Sports",
  "Books",
] as const

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life. Features active noise cancellation, comfortable over-ear design, and crystal-clear audio quality.",
    price: 12499,
    originalPrice: 16999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviewCount: 2847,
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with health monitoring, GPS tracking, and seamless smartphone integration. Water-resistant up to 50 meters.",
    price: 24999,
    originalPrice: 29999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviewCount: 1523,
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    description: "Ultra-soft 100% organic cotton t-shirt. Available in multiple colors. Perfect fit for everyday comfort.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.3,
    reviewCount: 892,
    inStock: true,
  },
  {
    id: "4",
    name: "Running Shoes Elite",
    description: "Lightweight running shoes with advanced cushioning technology. Breathable mesh upper for maximum comfort during long runs.",
    price: 10999,
    originalPrice: 13999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.6,
    reviewCount: 3421,
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    description: "Double-wall vacuum insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    price: 2899,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.4,
    reviewCount: 1876,
    inStock: true,
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    price: 3299,
    originalPrice: 4199,
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.2,
    reviewCount: 654,
    inStock: true,
  },
  {
    id: "7",
    name: "Leather Messenger Bag",
    description: "Handcrafted genuine leather messenger bag with multiple compartments. Perfect for professionals on the go.",
    price: 15999,
    originalPrice: 19999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.8,
    reviewCount: 432,
    inStock: true,
    featured: true,
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic coffee mugs. Microwave and dishwasher safe. Perfect for your morning brew.",
    price: 3799,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.5,
    reviewCount: 789,
    inStock: true,
  },
  {
    id: "9",
    name: "Yoga Mat Premium",
    description: "Extra thick yoga mat with superior grip. Non-slip surface and eco-friendly materials. Includes carrying strap.",
    price: 4199,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.6,
    reviewCount: 1234,
    inStock: true,
  },
  {
    id: "10",
    name: "Bestselling Novel Collection",
    description: "Curated collection of 5 bestselling novels from award-winning authors. Perfect gift for book lovers.",
    price: 4999,
    originalPrice: 6699,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    category: "Books",
    rating: 4.9,
    reviewCount: 2156,
    inStock: true,
  },
  {
    id: "11",
    name: "Kitchen Knife Set",
    description: "Professional 6-piece kitchen knife set with wooden block. German stainless steel blades for precision cutting.",
    price: 12499,
    originalPrice: 16999,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.7,
    reviewCount: 567,
    inStock: true,
  },
  {
    id: "12",
    name: "Denim Jacket Classic",
    description: "Timeless denim jacket with a modern fit. Durable construction and versatile style for any occasion.",
    price: 7499,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.4,
    reviewCount: 345,
    inStock: false,
  },
]

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    userName: "Rahul D.",
    rating: 5,
    comment: "Amazing sound quality! The noise cancellation is top-notch. Worth every rupee.",
    date: "2024-03-15",
  },
  {
    id: "r2",
    productId: "1",
    userName: "Priya M.",
    rating: 4,
    comment: "Great headphones, very comfortable for long listening sessions. Battery life is impressive.",
    date: "2024-03-10",
  },
  {
    id: "r3",
    productId: "1",
    userName: "Amit R.",
    rating: 5,
    comment: "Best headphones I have ever owned. The build quality is excellent.",
    date: "2024-03-05",
  },
  {
    id: "r4",
    productId: "2",
    userName: "Sneha K.",
    rating: 5,
    comment: "This smartwatch has everything I need. Health tracking is very accurate.",
    date: "2024-03-12",
  },
  {
    id: "r5",
    productId: "2",
    userName: "Deepak L.",
    rating: 4,
    comment: "Great features and battery life. The display is beautiful.",
    date: "2024-03-08",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}
