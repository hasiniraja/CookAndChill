import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const fetchBooks = async () => {
      setLoading(true);
      toast.info(`Searching for "${searchTerm}"...`);

      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
        const data = await res.json();

        const formatted = data.docs.slice(0, 20).map((book) => ({
          key: book.key,
          title: book.title,
          author: book.author_name?.join(", ") || "Unknown",
          coverId: book.cover_i,
          downloadUrl:
            book.ia && book.ia.length
              ? `https://archive.org/download/${book.ia[0]}/${book.ia[0]}.pdf`
              : null,
        }));

        setBooks(formatted);

        if (formatted.length > 0) {
          toast.success(`Found ${formatted.length} books!`);
        } else {
          toast.warn("No books found.");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Something went wrong while fetching books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  return (
    <div className="flex bg-[#fdf7ee] min-h-screen ml-15">
      <Sidebar />

      <div className="flex-1 p-8">
        <ToastContainer position="top-right" autoClose={3000} />

        <h2 className="text-3xl font-bold mb-6">📚 Explore Books</h2>

        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg border border-gray-300 mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <ClipLoader color="#fcbf49" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <motion.div
                key={book.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                {book.coverId ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                    alt={book.title}
                    className="w-full h-56 object-cover rounded mb-3"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <h3 className="text-lg font-semibold text-center">{book.title}</h3>
                <p className="text-sm text-gray-600 text-center">Author: {book.author}</p>
                {book.downloadUrl ? (
                  <a
                    href={book.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block"
                  >
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                      📥 Download
                    </button>
                  </a>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">No download</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
