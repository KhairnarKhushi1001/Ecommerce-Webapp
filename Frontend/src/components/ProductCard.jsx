import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="mt-3 font-semibold text-green-600">₹{product.price.toLocaleString()}</p>
      <p className="mt-1 text-yellow-500">
        {"★".repeat(product.product_rating)}{"☆".repeat(5 - product.product_rating)}
      </p>
      <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
        {product.category}
      </span>
    </div>
  );
};

export default ProductCard;