import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoryPage from "./pages/CategoryProducts";
import AddProduct from "./pages/AddProduct";
import ShowProductDetails from "./pages/ShowProductDetails";

const App = () => {
  const [product, setProduct] = useState(null);

  return (
   
      <div className="flex flex-col min-h-screen">
        
        <Toaster position="top-right" reverseOrder={false} />
        {/* Navbar always on top */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage setProduct={setProduct} />} />
            <Route path="/categories/:id/products" element={<CategoryPage setProduct={setProduct} />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products/:id" element={<ShowProductDetails product={product} />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
  
  );
};

export default App;