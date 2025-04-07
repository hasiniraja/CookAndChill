CookAndChill is a full-stack web application crafted to enhance your cooking experience by blending smart features with a fun twist. It brings together a variety of APIs to provide users with:

🍲 Delicious recipes powered by the Spoonacular API

🌦️ Weather-based dish suggestions to match the mood of the day

📚 Educational book access to learn while you cook

📰 Latest food and cooking news to stay updated

😂 A meme generator to keep things light in the kitchen

Whether you're meal-planning for the week or just chilling at home, CookAndChill adds a touch of creativity and convenience to your culinary journey.

Got it! Here's the section rewritten *without* the "easy/medium" headings and with a clean format ready for your README:

---

## 📦 NPM Packages Used

| Package | Description |
|--------|-------------|
| **axios** | A promise-based HTTP client used for making API requests on both frontend and backend. |
| **cors** | Middleware to enable Cross-Origin Resource Sharing, used in the backend server. |
| **dotenv** | Loads environment variables from a `.env` file into `process.env`. |
| **nodemon** | Automatically restarts the backend server during development when file changes are detected. |
| **react-spinners** | A collection of customizable loading spinner components for React. |
| **react-icons** | Provides popular icon sets as React components. |
| **react-toastify** | Allows toast notifications in the frontend with minimal configuration. |
| **chart.js** | A popular charting library used to render visual data in the frontend. |
| **react-chartjs-2** | A React wrapper for Chart.js to easily integrate charts in React components. |
| **tailwindcss** | A utility-first CSS framework used for styling the frontend efficiently. |
| **eslint** | A static code analysis tool to ensure code quality and consistency across the project. |

---
Perfect! Here's a clean and user-friendly section for your README that explains how to **set up and run the CookAndChill app** — both frontend and backend:

---

##  Getting Started

Follow the steps below to set up and run the CookAndChill application locally.
###  Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- Internet connection (to fetch external API data)

---

###  Folder Structure

```
CookAndChill/
├── Backend/
└── Frontend/
```

---

### ⚙️ Backend Setup

1. Open terminal and navigate to the backend folder:

   ```bash
   cd CookAndChill/Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add your API keys like:

   ```
   SPOONACULAR_API_KEY=your_key
   WEATHER_API_KEY=your_key
   NEWS_API_KEY=your_key
   BOOKS_API_KEY=your_key
   MEME_API_KEY=your_key
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will typically run on: `http://localhost:5000/`

---

### 💻 Frontend Setup

1. Open a new terminal and navigate to the frontend folder:

   ```bash
   cd CookAndChill/Frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the React frontend:

   ```bash
   npm run dev
   ```

   The frontend will usually run on: `http://localhost:5173/`

---

### ✅ Testing the Setup

- Make sure both servers (frontend and backend) are running.
- Visit the frontend URL in your browser.
- Try using the weather, recipe, book, meme, and news features to ensure everything works as expected.

---

