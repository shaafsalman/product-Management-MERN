import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = ({ onClose, name, price }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:8080/api/products/${productId}`, updatedProduct);
        const updatedProducts = products.map(product =>
          product._id === productId ? response.data : product
        );
        setProducts(updatedProducts);
        setSearchResults(updatedProducts);
        setMessage({ Heading: 'Success', Message: 'Product updated successfully!' }); // Set success message
      } catch (error) {
        console.error('Error updating product:', error);
        setMessage({ Heading: 'Error', Message: 'Failed to update product' }); 
      }
};

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="max-w-md w-full p-6  shadow-lg bg-gradient-to-br from-gray-500 to-gray-600">
        <h3 className="font-semibold mb-2 text-white text-2xl">Add Product</h3>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md mb-2"
            required
          />
          <input
            type="number"
            placeholder={price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md mb-2"
            required
          />
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Cancel</button>
            <button type="submit" className="w-full bg-white text-gray-600 py-2 rounded-md font-semibold hover:bg-gray-600 hover:text-white transition duration-300">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
