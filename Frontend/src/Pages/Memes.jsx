import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const MemeGenerator = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then((res) => {
      setMemes(res.data.data.memes.slice(0, 10)); // Get top 10 memes
    });
  }, []);

  const generateMeme = async () => {
    if (!selectedMeme || !caption) return;

    const formData = new URLSearchParams();
    formData.append("template_id", selectedMeme.id);
    formData.append("username", "HansikaReddy"); // Replace with your Imgflip username
    formData.append("password", "pwKx!cbxBcgat8Q"); // Replace with your Imgflip password
    formData.append("text0", caption);
    formData.append("text1", "");

    try {
      const response = await axios.post("https://api.imgflip.com/caption_image", formData);
      alert("Meme generated! 🎉");
      window.open(response.data.data.url, "_blank");
    } catch (err) {
      console.error("Meme generation failed", err);
      alert("Failed to generate meme. Try again!");
    }
  };

  return (
    <div className="flex bg-[#fdf7ee] min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 ml-15">
        <h2 className="text-3xl font-bold mb-6">🤣 Generate a Meme</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {memes.map((meme) => (
            <img
              key={meme.id}
              src={meme.url}
              alt={meme.name}
              onClick={() => setSelectedMeme(meme)}
              className={`cursor-pointer rounded shadow-lg hover:shadow-xl transition ${
                selectedMeme?.id === meme.id ? "ring-4 ring-yellow-400" : ""
              }`}
            />
          ))}
        </div>

        {selectedMeme && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter your caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border px-4 py-2 rounded mr-4 w-full max-w-md mb-4"
            />
            <br />
            <button
              onClick={generateMeme}
              className="bg-yellow-400 px-6 py-2 rounded font-bold text-white hover:bg-yellow-500"
            >
              Generate Meme
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeGenerator;
