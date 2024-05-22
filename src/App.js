// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNav from './components/TopNav';
import ProductList from './components/ProductList';
import './App.css';

const App = () => (
  <Router>
    <div className="app">
      <TopNav />
      <Routes>
        <Route path="/" exact element={<ProductList/>} />
        <Route path="*" exact element={<div>client Side Error </div>} />


      </Routes>
    </div>
  </Router>
);

export default App;
