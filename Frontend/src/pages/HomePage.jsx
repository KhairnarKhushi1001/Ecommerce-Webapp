import React from "react";
import { useNavigate } from "react-router-dom";
import Offers from "../components/Offers";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();

  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop",
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop",
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop",
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white overflow-y-auto">

      {/* Page Content */}
      <div className="space-y-12 p-6 pb-32">

        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-wide">
            Welcome to Store
          </h1>

          <button
            className="mt-6 px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>

        {/* Offers */}
        <Offers />

        {/* Categories */}
        {/* <Categories /> */}

        {/* Carousel */}
        <Carousel slides={slideData} />

      </div>

      {/* Floating Navbar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Navbar />
      </div>

    </div>
  );
};

export default HomePage;