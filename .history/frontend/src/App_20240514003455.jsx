import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Background/>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} /> 
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};


export default App;
