const fs = require('fs');

// Hardcoded product data
let productsData = [
    { id: 1, Username: 'Shaaf Salman', email: "ishaafsalman@gmail.com", password: "1122" },

];

// Function to save products data to JSON file
const saveProductsData = () => {
    fs.writeFileSync('products.json', JSON.stringify(productsData, null, 2));
};

// Function to get all products
const getAllProducts = () => {
    return productsData;
};

// Function to add a new product
const addProduct = (product) => {
    productsData.push(product);
    saveProductsData();
};

// Function to update a product
const updateProduct = (id, updatedProduct) => {
    const index = productsData.findIndex(product => product.id === id);
    if (index !== -1) {
        productsData[index] = { ...productsData[index], ...updatedProduct };
        saveProductsData();
        return true;
    }
    return false;
};

// Function to delete a product
const deleteProduct = (id) => {
    productsData = productsData.filter(product => product.id !== id);
    saveProductsData();
};

// Function to search products by name
const searchProducts = (query) => {
    return productsData.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};
