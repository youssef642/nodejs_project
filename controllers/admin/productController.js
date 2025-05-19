const Product = require("../../models/Product");
const Category = require("../../models/Category");

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;
    const product = new Product({
      name,
      price,
      description,
      category,
      createdBy: req.userId,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate(
      "category createdBy",
      "name username"
    );
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate(
      "category createdBy",
      "name username"
    );
    if (!product) throw new Error("Product not found");
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category },
      { new: true }
    );
    if (!product) throw new Error("Product not found");
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error("Product not found");
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) throw new Error("Category not found");
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!category) throw new Error("Category not found");
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new Error("Category not found");
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};
