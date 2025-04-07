// Sidebar.jsx
import React, { useState, useEffect } from "react";
import {
  Utensils,
  Film,
  Music,
  Smile,
  MapPin,
  Book,
  Newspaper,
  Sun,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Notify parent when sidebar state changes
  useEffect(() => {
    if (onToggle) onToggle(isOpen);
  }, [isOpen, onToggle]);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#fcbf49] transition-all duration-300 shadow-md z-50 overflow-y-auto ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 text-black hover:text-white transition"
      >
        <Menu />
      </button>

      <nav className="flex-1 flex flex-col gap-6 p-4 text-white font-medium">
        <Link to="/recipies" className="flex items-center gap-3 hover:text-yellow-100">
          <Utensils size={20} />
          {isOpen && "Recipes"}
        </Link>
        <Link to="/weather" className="flex items-center gap-3 hover:text-yellow-100">
          <Sun size={20} />
          {isOpen && "Weather"}
        </Link>
        <Link to="/" className="flex items-center gap-3 hover:text-yellow-100">
          <Film size={20} />
          {isOpen && "Movies"}
        </Link>
        <Link to="/" className="flex items-center gap-3 hover:text-yellow-100">
          <Music size={20} />
          {isOpen && "Spotify"}
        </Link>
        <Link to="/memes" className="flex items-center gap-3 hover:text-yellow-100">
          <Smile size={20} />
          {isOpen && "Memes"}
        </Link>
        <Link to="/grocery" className="flex items-center gap-3 hover:text-yellow-100">
          <MapPin size={20} />
          {isOpen && "Grocery"}
        </Link>
        <Link to="/books" className="flex items-center gap-3 hover:text-yellow-100">
          <Book size={20} />
          {isOpen && "Books"}
        </Link>
        <Link to="/news" className="flex items-center gap-3 hover:text-yellow-100">
          <Newspaper size={20} />
          {isOpen && "News"}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
