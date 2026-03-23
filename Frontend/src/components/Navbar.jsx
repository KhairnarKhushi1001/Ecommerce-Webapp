import React from "react";
import { useNavigate } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

const Navbar = ({ searchTerm, setSearchTerm, isSearchBarVisible }) => {
  const navigate = useNavigate();


  return (
    <nav className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm px-6 py-3 flex items-center justify-between">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <h1 className="text-xl font-semibold tracking-wide text-gray-800">
            ShoppingHub
          </h1>
        </div>
      </div>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-6">

        {/* ✅ SEARCH BAR (UPDATED) */}
        {isSearchBarVisible && (<div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 hover:shadow-md transition">
          <input
            type="text"
            placeholder="Search for more than 20,000 products"
            className="bg-transparent flex-1 px-3 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <svg
            className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer transition"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </div>)}

        <BiHomeAlt2 className="text-2xl text-black/60 hover:text-black cursor-pointer transition" onClick={()=>navigate("/")} />
        <AiOutlineHeart className="text-2xl text-black/60 hover:text-black cursor-pointer transition" />
        <AiOutlineShoppingCart className="text-2xl text-black/60 hover:text-black cursor-pointer transition" />
        <AiOutlineUser className="text-2xl text-black/60 hover:text-black cursor-pointer transition" />
      </div>
    </nav>
  );
};

export default Navbar;