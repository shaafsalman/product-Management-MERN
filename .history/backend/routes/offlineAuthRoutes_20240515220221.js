const express = require('express');
const router = express.Router();
const usersData = require('./../models/offlineUser');
const { sendVerificationEmail } = require("../utils/email");

// POST /users/login: Login a user
router.post('/login', (req, res) => {
    console.log("Request to login user");
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = usersData.getAllUsers().find(user => user.email === email && user.password === password);
        if (!user) 
        {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        console.log(usersData);
        console.log("login Successfully logged");
        return res.status(200).json({ message: 'Login successful', user });

    } 
    catch (error) 
    {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Failed to login' });
    }
});


router.post('/register', (req, res) => {
    console.log("Request to register user");
    console.log(req.body);
    try {
        const { username, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const newUser = {
            username,
            email,
            password
        };
        usersData.addUser(newUser);
        res.status(200).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: "Failed to register user" });
    }
});


router.post('/verify', (req, res) => {
    console.log("Request to register user");
    console.log(req.body);
    try {
       
        await sendVerificationEmail(req.body.email);
        res.status(200).json({ message: "mail sent successfully"});
    } 
    catch (error) 
    {
        console.error('Error registering user:', error);
        res.status(500).json({ message: "Failed to register user" });
    }
});





module.exports = router;
