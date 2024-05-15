import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Sending request to add product");
        console.log(name + price);
         await axios.post('http://localhost:8080/api/products/add', { name, price }); 
        onClose(); 
    } catch (error) {
        console.error('Error adding product:', error);
    }
};
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Add Product</h3>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md mb-2"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md mb-2"
            required
          />
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Cancel</button>
            <button type="submit" className="w-full bg-white text-gray-600 py-2 rounded-md font-semibold hover:bg-gray-600 hover:text-white transition duration-300">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
