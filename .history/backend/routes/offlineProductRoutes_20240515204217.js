const express = require('express');
const router = express.Router();
const productsData = require('./../models/offlineProduct');

// GET /products: Retrieve all products
router.get('/', (req, res) => {
    console.log("request to get all products");
    try 
    {
        // router getting aal products from model
        const products = productsData.getAllProducts();
        res.json(products);
    } 
    catch (error) 
    {
        res.status(500).json({ message: error.message });
    }
});

// POST /products/add: Add a new product
router.post('/add', (req, res) => {
    console.log("request to add product");
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }
        const newProduct = {
            id: productsData.getAllProducts().length + 1, // Generate a unique ID for the new product
            name,
            price
        };
        productsData.addProduct(newProduct);
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product" });
    }
});

// DELETE /products/delete/:id: Delete a product by ID
router.delete('/delete/:id', (req, res) => {
    console.log("request to delete product");
    try {
        const productId = parseInt(req.params.id);
        productsData.deleteProduct(productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /products/:id: Update an existing product by ID
router.put('/update/:id', (req, res) => {
    console.log("request to update product");
    console.log(req.params);
    
    try {
        console.log("request to update product");
        const productId = parseInt(req.params.id);
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }
        const updatedProduct = { name, price };
        if (productsData.updateProduct(productId, updatedProduct)) {
            res.json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
