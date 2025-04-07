import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="flex justify-between items-center  ml-5 px-7 md:px-16 py-4 bg-[#fcbf49] backdrop-blur-sm bg-opacity-90 shadow-md rounded sticky top-0 z-50"
    >      <Link
        to="/"
        className="text-3xl font-extrabold text-white tracking-wide hover:scale-105 transition"
      >
        Cook <span className="text-[#ffffffdd]">&</span> Chill
      </Link>
      <nav className="hidden md:flex gap-8 text-lg font-medium text-white">
        <Link
          to="/"
          className="hover:underline underline-offset-4 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/recipies"
          className="hover:underline underline-offset-4 transition duration-200"
        >
          Recipes
        </Link>
        <Link
          to="/weather"
          className="hover:underline underline-offset-4 transition duration-200"
        >
          Weather
        </Link>
        <Link
          to="/memes"
          className="hover:underline underline-offset-4 transition duration-200"
        >
          Memes
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <button className="text-white font-semibold hover:underline transition">
          Login
        </button>
        <button className="bg-white text-[#fcbf49] px-5 py-2 rounded-full font-bold shadow-md hover:scale-105 transition duration-300">
          Sign Up
        </button>
      </div>
    </motion.header>
  );
}
