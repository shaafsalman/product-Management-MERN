const express = require('express');
const router = express.Router();
const Product = require('./../models/Product'); 




// Middleware to get a product by ID
async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Cannot find product' });
        }
        console.log('Product found:', product);
    } catch (err) {
        console.error('Error fetching product:', err.message);
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
}





router.get('/', async (req, res) => {
    try {
        console.log("Request all products");
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.post('/add', async (req, res) => {
    console.log("Request add product");
    console.log(req.body.name + " :  " + req.body.price);

    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
        return res.status(400).json({ message: "Product with this name already exists" });
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    try {
        console.log("Saving Product");
        console.log(product);
        const newProduct = await product.save();
        res.status(201).json({ message: "Product saved successfully", product: newProduct });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: "Failed to save product" });
    }
});

// GET /products/:id: Retrieve a specific product by ID
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
    console.log("Request product with id");
});

// DELETE /products/delete/:id: Delete a product by ID
router.delete('/delete/:id', getProduct, async (req, res) => {
    console.log("Request to remove product");
    try {
        await Product.deleteOne({ _id: res.product._id });
        console.log('Product removed');
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error removing product:', error.message);
        res.status(500).json({ message: error.message });
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






module.exports = router;
