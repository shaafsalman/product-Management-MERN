import React, { useState, useEffect } from 'react';
import AddProduct from './offlineAddProduct';
import UpdateProduct from './offlineUpdateProduct';
import axios from 'axios';
import MessageCard from './../Cards/messageCard';

const OfflineHome = () => {

    const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [message, setMessage] = useState(null);


  useEffect(() => 
    {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);


    ////////////////////////////////////////
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try 
    {
      const response = await axios.get('http://localhost:8080/api/offlineProducts/');
      setProducts(response.data || []);
      setSearchResults(response.data || []);
    } 
    catch (error) 
    {
      console.error('Error fetching products:', error);
    }
  };
  ////////////////////////////////////////
  useEffect(() => {
    handleSearch();
  }, [searchTerm, products]);
  const handleSearch = () => {
    if (searchTerm === '') {
      setSearchResults(products);
    } 
    else 
    {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };
  const showAdd = () => {
    setShowAddProduct(true);
  };
  const toggleAddProduct = () => {
    fetchProducts();
    setShowAddProduct(!showAddProduct);
  };
////////////
  const handleUpdateProduct = (product) => {
    setCurrentProduct(product);
    setShowUpdateProduct(true);
  };
  const handleUpdate = (productId, updatedProduct) => {
    const updatedProducts = products.map(product =>
      product._id === productId ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setSearchResults(updatedProducts);
  };
  ////////////
  const handleDeleteProduct = async (productId) => {
    try {
      console.log(`Attempting to delete product with ID: ${productId}`);
      const response = await axios.delete(`http://localhost:8080/api/offlineProducts/delete/${productId}`);
      console.log('Deletion response:', response);
      setMessage({ Heading: 'Success', Message: 'Product deleted successfully!' });
      fetchProducts(); 

    } 
    catch (error) 
    {
      console.error('Error deleting product:', error);
      setMessage({ Heading: 'Error', Message: 'Failed to delete product' });
    }
  };
////////////////////////////////////////


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {message && (
        <MessageCard Heading={message.Heading} Message={message.Message} onClose={() => setMessage(null)} />
      )}
      <div className="w-full max-w-screen-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-600 text-center md:text-center">Product Management</h1>
        
        
        
        {/* row 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-red-950 w-full md:w-auto"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-gray-600 text-white rounded-r-md font-semibold transition duration-300"
            >
              Search
            </button>
          </div>
          
          <button
            onClick={showAdd}
            className="px-4 py-2 bg-gray-600 text-white rounded-md font-semibold transition duration-300 w-full md:w-auto"
          >
            Add Product
          </button>
        
        </div>



        {/* table */}
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-br from-gray-500 to-gray-600 text-white text-lg md:text-2xl">
            <th className="px-2 md:px-6 py-4 text-center">ID</th>
              <th className="px-2 md:px-6 py-4 text-center">Name</th>
              <th className="px-2 md:px-6 py-4 text-center">Price</th>
              <th className="px-2 md:px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((product, index) => (
              <tr key={index} className="bg-transparent">
                <td className="px-2 md:px-6 py-4 text-center text-gray-800 text-sm md:text-xl">{product.id}</td>
                <td className="px-2 md:px-6 py-4 text-center text-gray-800 text-sm md:text-xl">{product.name}</td>
                <td className="px-2 md:px-6 py-4 text-center text-gray-800 text-sm md:text-xl">{product.price} Rs</td>
                <td className="px-2 md:px-6 py-4 space-x-2 flex justify-center">
                  <button
                    onClick={() => handleUpdateProduct(product)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-gray-800 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <AddProduct 
            onClose={toggleAddProduct}
            setMessage={setMessage} 
          />
        </div>
      )}
      {showUpdateProduct && (
        <UpdateProduct
          productId={currentProduct.id}
          currentName={currentProduct.name}
          currentPrice={currentProduct.price}
          onClose={() => setShowUpdateProduct(false)}
          onUpdate={handleUpdate}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default OfflineHome;
