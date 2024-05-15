const express = require('express');
const router = express.Router();
const usersData = require('./../models/offlineUser');


// POST /products/add: Add a new product
router.post('/login', (req, res) => {
    console.log("request to login user");
 
});
router.post('/register', (req, res) => {
    console.log("request to register user");
    try 
    {
        const { username, email, password } = req.body;
        if (!email|| !password) {
            return res.status(400).json({ message: 'username, email and password are required' });
        }
        const newUser = {
            id: productsData.getAllUsers().length + 1, 
            username,
            email,
            password
        };
        usersData.addUser(newUser);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    }
     catch (error) 
    {
        res.status(500).json({ message: "Failed to register user" });
    }
});



module.exports = router;
