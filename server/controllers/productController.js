import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query;

  let query = {};

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  const products = await Product.find(query);
  res.json(products.map((product) => ({
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    countInStock: product.countInStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  })));
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      countInStock: product.countInStock,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, category, image, countInStock } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: "Missing required product fields" });
  }

  const product = new Product({
    name,
    description,
    price,
    category,
    image: image || "",
    countInStock: countInStock || 0,
  });

  const createdProduct = await product.save();
  res.status(201).json({ id: createdProduct._id, ...createdProduct.toObject() });
};

export const updateProduct = async (req, res) => {
  const { name, description, price, category, image, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price !== undefined ? price : product.price;
  product.category = category || product.category;
  product.image = image !== undefined ? image : product.image;
  product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;

  const updatedProduct = await product.save();

  res.json({ id: updatedProduct._id, ...updatedProduct.toObject() });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.remove();
  res.json({ message: "Product removed" });
};
