const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');
const authController = require('../Controllers/AuthController');

//Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

//Product Routes
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
