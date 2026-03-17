import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

const App = () => {
  return (
   
      <div className="flex flex-col min-h-screen">
        
        {/* Navbar always on top */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
  
  );
};

export default App;