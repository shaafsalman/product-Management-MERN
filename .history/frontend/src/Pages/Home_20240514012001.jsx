import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  useEffect(() => {
    // Fetch all products from the backend on component mount
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products'); // Assuming backend API is hosted at the same URL
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/products?search=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('/products', { name: newProductName, price: newProductPrice });
      setProducts([...products, response.data]);
      setNewProductName('');
      setNewProductPrice('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedName, updatedPrice) => {
    try {
      await axios.put(`/products/${id}`, { name: updatedName, price: updatedPrice });
      fetchProducts(); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      fetchProducts(); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex space-x-4">
        <button onClick={fetchProducts} className="bg-blue-500 text-white px-4 py-2 rounded-md">Load</button>
        <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1" />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
        <button onClick={() => setShowAddForm(true)} className="bg-green-500 text-white px-4 py-2 rounded-md">Add</button>
      </div>
      <div className="mt-4">
        {showAddForm && (
          <div className="flex space-x-2">
            <input type="text" placeholder="Product Name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1" />
            <input type="number" placeholder="Price" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1" />
            <button onClick={handleAddProduct} className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
