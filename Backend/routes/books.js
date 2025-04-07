import express from "express";
import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch"; // For Node.js < v18

const router = express.Router();

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

// Route to get books based on a search query
router.get("/", async (req, res) => {
  const { q = "harry potter" } = req.query; // Default search term
  const apiKey = process.env.BOOKS_API_KEY;

  try {
    const response = await fetch(`${GOOGLE_BOOKS_API}?q=${encodeURIComponent(q)}&key=${apiKey}`);
    const data = await response.json();

    const books = data.items?.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(", ") || "Unknown"
    })) || [];

    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books from external API" });
  }
});

export default router;
