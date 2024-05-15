import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageCard from './../Cards/messageCard';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const closeMessage = () => {
    setShowMessage(false);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/offlineUser/verify', {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage('Register successful');
        setShowMessage(true);
        navigate('/login');
      } else {
        setError('Register failed. Please check your credentials and try again.');
        setShowMessage(true);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      setShowMessage(true);
    }
  };

  return (
    <div className="register">
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-lg rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-gray-500 to-gray-600">
          <div className="lg:px-8 lg:py-20 px-6 py-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Send Email</h2>
            <form className="space-y-6 " onSubmit={handleSendEmail}>
         
              <div>
                <label className="block text-sm text-white">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none focus:bg-white focus:text-gray-900"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-white text-gray-600 py-2 rounded-md font-semibold hover:bg-gray-600 hover:text-white transition duration-300"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-white">
                Already have an account?{' '}
                <Link to="/login" className="text-gray-200 hover:text-white">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showMessage && (
        <MessageCard
          Heading={error ? 'Error' : 'Success'}
          Message={error ? error : successMessage}
          onClose={closeMessage}
        />
      )}
    </div>
  );
};

export default Signup;
