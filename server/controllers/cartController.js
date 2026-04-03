import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getUserCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price image countInStock");

  if (!cart) {
    return res.json({ items: [], totalItems: 0, totalPrice: 0 });
  }

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  res.json({ items: cart.items, totalItems, totalPrice });
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "productId and quantity are required" });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();

  const updatedCart = await Cart.findById(cart._id).populate("items.product", "name price image countInStock");

  const totalItems = updatedCart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = updatedCart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  res.status(201).json({ items: updatedCart.items, totalItems, totalPrice });
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== productId);

  await cart.save();

  const updatedCart = await Cart.findById(cart._id).populate("items.product", "name price image countInStock");
  const totalItems = updatedCart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = updatedCart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  res.json({ items: updatedCart.items, totalItems, totalPrice });
};

export const clearCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = [];
  await cart.save();

  res.json({ items: [], totalItems: 0, totalPrice: 0 });
};
