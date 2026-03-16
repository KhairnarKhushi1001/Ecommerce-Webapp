import { useState } from "react";

export default function Navbar() {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={`flex items-center justify-around h-12 rounded-xl 
      backdrop-blur-lg bg-white/10 border border-white/20
      transition-all duration-500
      ${expand ? "w-96" : "w-64"}`}
    >
      {/* Home */}
      <button className="flex p-2 items-center justify-center w-10 h-10 rounded-full text-white hover:-translate-y-1 transition">
        <svg
          viewBox="0 0 1024 1024"
          className="text-xl"
          fill="currentColor"
        >
          <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
        </svg>
      </button>

      {/* Search */}
      <button
        onClick={() => setExpand(!expand)}
        className="flex p-2 items-center justify-center w-10 h-10 rounded-full text-white hover:-translate-y-1 transition"
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          className="text-xl"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Search Input (visible when expanded) */}
      {expand && (
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-b border-white outline-none text-white px-2 w-32"
        />
      )}

      {/* Profile */}
      <button className="flex p-2 items-center justify-center w-10 h-10 rounded-full text-white hover:-translate-y-1 transition">
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-xl">
          <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5Z" />
        </svg>
      </button>

      {/* Cart */}
      <button className="flex p-2 items-center justify-center w-10 h-10 rounded-full text-white hover:-translate-y-1 transition">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          className="text-xl"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      </button>
    </div>
  );
}