// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HousePricePredictor from './pages/HousePricePredictor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/predict" element={<HousePricePredictor />} />
      </Routes>
    </Router>
  );
}

export default App;