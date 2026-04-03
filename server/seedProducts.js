import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    price: 12499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    countInStock: 25,
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with health monitoring and GPS.",
    price: 24999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    countInStock: 18,
  },
  {
    name: "Premium Cotton T-Shirt",
    description: "Ultra-soft 100% organic cotton t-shirt.",
    price: 2499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    countInStock: 100,
  },
  {
    name: "Running Shoes Elite",
    description: "Lightweight running shoes with advanced cushioning technology.",
    price: 10999,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    countInStock: 40,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Double-wall vacuum insulated water bottle.",
    price: 2899,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    countInStock: 120,
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with Qi-enabled devices.",
    price: 3299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400&h=400&fit=crop",
    countInStock: 60,
  },
  {
    name: "Leather Messenger Bag",
    description: "Handcrafted genuine leather messenger bag.",
    price: 15999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    countInStock: 20,
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic coffee mugs.",
    price: 3799,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    countInStock: 45,
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra thick yoga mat with superior grip.",
    price: 4199,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    countInStock: 70,
  },
  {
    name: "Bestselling Novel Collection",
    description: "Curated collection of 5 bestselling novels.",
    price: 4999,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    countInStock: 80,
  },
  {
    name: "Kitchen Knife Set",
    description: "Professional 6-piece kitchen knife set.",
    price: 12499,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
    countInStock: 55,
  },
  {
    name: "Denim Jacket Classic",
    description: "Timeless denim jacket with a modern fit.",
    price: 7499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
    countInStock: 12,
  }
];

async function seed() {
  try {
    await connectDB();
    await Product.deleteMany();
    const created = await Product.insertMany(products);
    console.log(`Seed completed: ${created.length} products inserted.`);
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
