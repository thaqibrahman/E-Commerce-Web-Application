import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  const { shippingAddress } = req.body;

  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price image");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    items,
    totalPrice,
    status: "pending",
    shippingAddress: shippingAddress || "",
  });

  cart.items = [];
  await cart.save();

  const populatedOrder = await Order.findById(order._id).populate("items.product", "name price image");
  res.status(201).json(populatedOrder);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.product", "name price image").sort({ createdAt: -1 });
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate("items.product", "name price image");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};
