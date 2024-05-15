import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/products', { name, price });
      onAdd(response.data); // Notify the parent component about the newly added product
      setName('');
      setPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="mt-4">
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
