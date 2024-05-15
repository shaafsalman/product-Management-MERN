const fs = require('fs');

// Hardcoded product data
let usersData = [
    { id: 1, Username: 'Shaaf Salman', email: "ishaafsalman@gmail.com", password: "1122" },
    { id: 1, Username: 'admin', email: "admin", password: "1122" },
];

// Function to save products data to JSON file
const saveUsersData = () => {
    fs.writeFileSync('products.json', JSON.stringify(usersData, null, 2));
};

// Function to get all products
const getAllProducts = () => {
    return usersData;
};

// Function to add a new product
const addProduct = (product) => {
    usersData.push(product);
    saveUsersData();
};

// Function to update a product
const updateProduct = (id, updatedProduct) => {
    const index = usersData.findIndex(product => product.id === id);
    if (index !== -1) {
        usersData[index] = { ...usersData[index], ...updatedProduct };
        saveusersData();
        return true;
    }
    return false;
};

// Function to delete a product
const deleteProduct = (id) => {
    usersData = usersData.filter(product => product.id !== id);
    saveusersData();
};

// Function to search products by name
const searchProducts = (query) => {
    return usersData.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};
