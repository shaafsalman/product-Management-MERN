const express = require('express');
const router = express.Router();
const usersData = require('./../models/offlineUser');


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


module.exports = router;
