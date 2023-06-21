const ProductModel = require('../Models/productModel');

// Create a product
const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    // return;
    const product = await ProductModel.create(req.body);
    res.status(201).json({
      response: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Fetch all products
const getAllProducts = async (req, res) => {
  const product = await ProductModel.find({});
  res.status(200).json({
    response: true,
    data: product
  });
};

// Show product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      res.status(404).json({ response: false, message: `Product with ID ${id} not found` });
    }
    res.status(200).json({ response: true, data: product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ response: false, message: `An unknown error occurred` });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).json({ response: false, message: `Product with ID ${id} not found` });
    }
    const updatedProduct = await ProductModel.findById(id);
    res.status(200).json({ response: true, message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ response: false, message: `An unknown error occurred` });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id, req.body);
    if (!product) {
      res.status(404).json({ response: false, message: `Product with ID ${id} not found` });
    }
    res.status(200).json({ response: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ response: false, message: `An unknown error occurred` });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
