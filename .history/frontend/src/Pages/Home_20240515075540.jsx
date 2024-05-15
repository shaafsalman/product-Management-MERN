import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import axios from 'axios';
import MessageCard from './../Cards/messageCard'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [message, setMessage] = useState(null); // State for message

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [message]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/');
      setProducts(response.data || []);
      setSearchResults(response.data || []);
      console.log('data from response: ', response.data);
      console.log('Search Results:', searchResults);
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
    fetchProducts();
  };

  const toggleAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  };

  const handleUpdateProduct = async (productId, updatedProduct) => {
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
      setMessage({ Heading: 'Error', Message: 'Failed to update product' }); // Set error message
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${productId}`);
      const updatedProducts = products.filter(product => product._id !== productId);
      setProducts(updatedProducts);
      setSearchResults(updatedProducts);
      setMessage({ Heading: 'Success', Message: 'Product deleted successfully!' }); 
    } 
    catch (error) 
    {
      console.error('Error deleting product:', error);
      setMessage({ Heading: 'Error', Message: 'Failed to delete product' });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold mb-6">Product Management</h1>
      {message && (
        <MessageCard Heading={message.Heading} Message={message.Message} onClose={() => setMessage(null)} />
      )}
      <div className="w-full max-w-screen-md bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-red-950"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-gray-600 text-white py-2 rounded-md font-semibold transition duration-300"
            >
              Search
            </button>
          </div>
          <button
            onClick={showAdd}
            className="px-4 py- bg-gray-600 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Add Product
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
  <thead>
    <tr className="bg-gradient-to-br from-gray-500 to-gray-600 text-white text-2xl">
      <th className="px-6 py-4 text-center">Name</th>
      <th className="px-6 py-4 text-center">Price</th>
      <th className="px-6 py-4 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {searchResults.map((product, index) => (
      <tr key={index} className={"bg-transparent "}>
        <td className="px-6 py-4 text-center text-gray-800 text-xl ">{product.name}</td>
        <td className="px-6 py-4 text-center text-gray-800 text-xl">{product.price} :RS</td>
        <td className="px-6 py-4 space-x-2 flex justify-center">
          <button
            onClick={() => handleUpdateProduct(product._id, { name: 'Updated Name', price: 0 })}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="w-full bg-gray-800 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        
   

        
        
        
          
      
      </div>
      {showAddProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <AddProduct onClose={toggleAddProduct} setMessage={setMessage} /> // Pass setMessage to AddProduct
        </div>
      )}
    </div>
  );
};

export default Home;
