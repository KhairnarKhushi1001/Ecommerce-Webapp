import React from "react";

const ProductCard = ({
  image,
  name,
  description,
  category,
  price,
  originalPrice,
  rating,
}) => {
  // Calculate discount %
  const discount =
    originalPrice && price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
      
      {/* IMAGE */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        
        {/* NAME */}
        <h3 className="text-gray-800 font-semibold text-lg">
          {name}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm line-clamp-2">
          {description}
        </p>

        {/* CATEGORY */}
        <p className="text-xs text-green-600 font-medium">
          {category}
        </p>

        {/* PRICE + DISCOUNT */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{price}
          </span>

          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{originalPrice}
            </span>
          )}

          {discount > 0 && (
            <span className="text-xs text-green-600 font-semibold">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* RATING */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {"★".repeat(Math.floor(rating))}
          {"☆".repeat(5 - Math.floor(rating))}
          <span className="text-gray-500 text-xs ml-1">
            ({rating})
          </span>
        </div>
      </div>

      {/* HOVER ACTIONS */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-4">
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-black text-sm rounded-md hover:bg-gray-200 transition">
            Add to Cart
          </button>

          <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition">
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;