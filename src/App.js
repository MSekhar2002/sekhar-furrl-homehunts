// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNav from './components/NavBar/TopNav';
import ProductList from './components/ProductList/ProductList';
import './App.css';

const App = () => (
  <Router>
    <div className="app">
      <TopNav />
      <Routes>
        <Route path="/" exact element={<ProductList/>} />
        <Route path="*"  element={<div>client Side Error </div>} />
      </Routes>
    </div>
  </Router>
);

export default App;
