const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');

// Create a product
router.post('/', productController.createProduct);

// Fetch all products
router.get('/', productController.getAllProducts);

// Show product
router.get('/:id', productController.getProductById);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
