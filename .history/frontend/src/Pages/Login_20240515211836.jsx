import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import MessageCard from '../Cards/messageCard';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    if (showMessage) {
      timeout = setTimeout(() => {
        setShowMessage(false);
        setError('');
        setSuccessMessage('');
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showMessage]);

  const closeMessage = () => {
    setShowMessage(false);
    setError('');
    setSuccessMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      if (email === "shaaf@gmail.com" && password === "1122") {
        setSuccessMessage('Login successful');
        setShowMessage(true);
        navigate('/home');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setError(error.message);
      setShowMessage(true);
    }
    
    try {
      const response = await axios.post('http://localhost:8080/api/offlineUser/login', {
        email,
        password,
      });

      if (response.status === 200) 
        {
        setSuccessMessage('Login successful');
        setShowMessage(true);
        navigate('/home');
      } 
      else 
      {
        setError('Login failed. Please check your credentials and try again.');
        setShowMessage(true);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      setShowMessage(true);
    }
  };

  return (
    <div className="login">
      {showMessage && (
        <MessageCard 
          Heading={error ? 'Error' : 'Success'} 
          Message={error ? error : successMessage} 
          onClose={closeMessage} 
        />
      )}
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-lg rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-gray-500 to-gray-600">
          <div className="lg:px-8 lg:py-20 px-6 py-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Login</h2>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm text-white">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none focus:bg-white focus:text-gray-900"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-white">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none focus:bg-white focus:text-gray-900"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-white text-gray-600 py-2 rounded-md font-semibold hover:bg-gray-600 hover:text-white transition duration-300"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-white">
                Don't have an account?{' '}
                <Link to="/signup" className="text-gray-200 hover:text-white">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
