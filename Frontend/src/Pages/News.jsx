import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNews = async (searchQuery = "") => {
    setLoading(true);
    try {
      const endpoint = searchQuery
        ? `http://localhost:5000/api/news?q=${searchQuery}`
        : `http://localhost:5000/api/news`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Failed to fetch news", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query.trim());
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">📰 Latest News</h2>

        {/* 🔍 Search Form */}
        <form onSubmit={handleSearch} className="mb-6 flex flex-wrap gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Search
          </button>
        </form>

        {/* 🔄 Loading or News */}
        {loading ? (
          <p className="text-gray-600">Loading news...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {article.description}
                </p>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt="news"
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Read more 🔗
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default News;
