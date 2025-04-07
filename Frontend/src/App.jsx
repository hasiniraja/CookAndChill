import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Recipies from "./Pages/Recipies"; // Import your Recipes page
import RecipeDetail from "./Pages/RecipeDetail"; // you'll create this
import Weather from "./Pages/Weather";
import Memes from "./Pages/Memes"; // you'll create this
import Sidebar from "./components/Sidebar";
import Grocery from "./Pages/Grocery";
import Books from "./Pages/Books";
import News from "./Pages/News";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipies" element={<Recipies />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/memes" element={<Memes />} />
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/books" element={<Books />} />
        <Route path="/news" element={<News />} />

      </Routes>
    </Router>
  );
}

export default App;
