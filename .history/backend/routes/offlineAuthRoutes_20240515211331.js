const express = require('express');
const router = express.Router();
const usersData = require('./../models/offlineUser');


// POST /products/add: Add a new product
router.post('/login', (req, res) => {
    console.log("request to login user");
    try 
    {
        const { email, password } = req.body;
        if (!email|| !password) {
            return res.status(400).json({ message: 'email and password are required' });
        }
        const newProduct = {
            id: productsData.getAllProducts().length + 1, 
            name,
            price
        };
        productsData.addProduct(newProduct);
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product" });
    }
});
router.post('/register', (req, res) => {
    console.log("request to register user");
    try 
    {
        const { email, password } = req.body;
        if (!email|| !password) {
            return res.status(400).json({ message: 'email and password are required' });
        }
        const newProduct = {
            id: productsData.getAllProducts().length + 1, 
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
