import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios"; 

const CategoryPage = ({ setProduct }) => {
  const { id } = useParams(); // category id from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8082/categories/${id}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [id]);


  return (
    <div className="min-h-screen p-6 bg-gray-100">
      
      <h1 className="text-2xl font-bold mb-6">
        Products
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard  
          key={product.id}
          product={product}
          setProduct={setProduct}
          />
        ))}
      </div>

    </div>
  );
};

export default CategoryPage;