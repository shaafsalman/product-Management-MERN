import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './addproduct'; // Import the AddProduct component

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products'); 
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const showAdd = () => {
    setShowAddProduct(true);
  };

  const toggleAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setSearchResults([...searchResults, newProduct]);
  };
  return (
    <div className="flex justify-center  min-h-screen bg-gray-100">
      <div className="max-w-screen-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Product Management</h2>
        <div className="flex items-center justify-between mb-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Search
            </button>
          </div>
          <button
            onClick={toggleAddProduct}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Add Product
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(product => (
              <tr key={product.id}>
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          {showAddProduct && <AddProduct onClose={toggleAddProduct} onAdd={handleAddProduct} />} 
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;