import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Pages/Login"
import Signup from "./Pages/SighnUp"
import NoPage from './Pages/NoPage';
import Home from './Pages/Home';
import OfflineHome from './Pages/offlineHome';


const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/verifyEmail" element={<Home />} />
            <Route path="/offline-home" element={<OfflineHome/>} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};


export default App;
