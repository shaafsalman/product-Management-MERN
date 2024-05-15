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
  const toggleAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setSearchResults([...searchResults, newProduct]);
  };
  return (
    <div className="flex flex-col items-center mt-8">
      {showAddProduct && <AddProduct onClose={toggleAddProduct} onAdd={handleAddProduct} />} 
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={showAdd}
          className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:bg-indigo-600"
        >
          add
        </button>
        
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:bg-indigo-600"
        >
          Search
        </button>
      </div>
      <table className="border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(product => (
            <tr key={product.id}>
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Update</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
