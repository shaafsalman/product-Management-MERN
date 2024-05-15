import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';




const App = () => {
  return (
    <div className="App">
      <Background/>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HeroPage/>} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/*" element={<ProtectedRoutes />} />
            <Route path="/single-player" element={<SinglePlayer />} /> 
            <Route path="/multi-player" element={<MultiPlayer />} /> 
            <Route path="/hero" element={<HeroPage/>} /> 

          </Routes>
        </div>
      </Router>
    </div>
  );
};

const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? (
    <>
       <Background/>
      <NavigationBar />
      <div className="page-content">
        <Routes>
          <Route path="/home" element={<GameMenu />} /> 
          <Route path="/Home/GameMenu" element={<GameMenu />} /> 
          <Route path="/Home/Leaderboards" element={<Leaderboards />} />
          <Route path="/Home/Friends" element={<Friends />} />
          <Route path="/Home/Scores" element={<Scores />} />
          <Route path="/Home/Settings" element={<Settings />} />
          <Route path="/Home/Profile" element={<Profile />} />
          <Route path="/Home/About" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
