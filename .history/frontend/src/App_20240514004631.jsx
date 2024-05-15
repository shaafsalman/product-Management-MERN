import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Pages/Login"
import SighnUp from "./Pages/SighnUp"
import NoPage from './Pages/NoPage';
const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};


export default App;
