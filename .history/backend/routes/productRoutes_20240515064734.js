const express = require('express');
const router = express.Router();
const Product = require('./../models/Product'); 



router.post('/add', async (req, res) => {
    console.log("Request add product");
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: "Failed to save product" });
    }
});





// GET /products: Retrieve a list of all products
router.get('/', async (req, res) => {
    try {
        console.log("Request all products");
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /products/:id: Retrieve a specific product by ID
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
    console.log("Request product with id");
});

// POST /products: Create a new product
router.post('/add', async (req, res) => {
    console.log("Request add product");
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /products/:id: Update an existing product by ID
router.put('/:id', getProduct, async (req, res) => {
    console.log("Request update  products");
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /products/:id: Delete a product by ID
router.delete('/:id', getProduct, async (req, res) => {
    console.log("Request remove  products");

    try {
        await res.product.remove();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware function to retrieve product by ID
async function getProduct(req, res, next) {
    console.log("Request getter  products");

    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.product = product;
    next();
}

module.exports = router;
