import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm px-6 py-3 flex items-center justify-between">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <h1 className="text-xl font-semibold tracking-wide text-gray-800">
            ShoppingHub
          </h1>
        </div>

        {/* Menu Icon */}
        <div className="cursor-pointer group">
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-black transition"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-[40%] hover:shadow-md transition">
        
        <select className="bg-transparent text-gray-600 text-sm outline-none cursor-pointer">
          <option>All Categories</option>
        </select>

        <input
          type="text"
          placeholder="Search for more than 20,000 products"
          className="bg-transparent flex-1 px-3 outline-none text-sm"
        />

        {/* Search Icon */}
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
      </div>

      {/* NAV LINKS */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        <p className="cursor-pointer hover:text-black transition">HOME</p>
        <p className="cursor-pointer hover:text-black transition flex items-center gap-1">
          PAGES
          <span className="text-xs">▼</span>
        </p>
      </div>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-4">
        
        {/* User */}
        <svg
          className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
        </svg>

        {/* Heart */}
        <svg
          className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>

        {/* Cart */}
        <svg
          className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;