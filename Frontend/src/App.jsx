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
import AddCategory from "./pages/AddCategory";

const App = () => {
  const [product, setProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  return (
   
      <div className="flex flex-col min-h-screen">
        
        <Toaster position="top-right" reverseOrder={false} />
        {/* Navbar always on top */}
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} isSearchBarVisible={isSearchBarVisible} />

        {/* Page Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage searchTerm={searchTerm}/>} />
            <Route path="/products" element={<ProductsPage setProduct={setProduct} setIsSearchBarVisible={setIsSearchBarVisible}  searchTerm={searchTerm} />} />
            <Route path="/categories/:id/products" element={<CategoryPage setProduct={setProduct} />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products/:id" element={<ShowProductDetails product={product} />} />
            <Route path="/add-category" element={<AddCategory />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
  
  );
};

export default App;