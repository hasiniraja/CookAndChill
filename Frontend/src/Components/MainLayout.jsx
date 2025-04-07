import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar onToggle={setIsSidebarOpen} />
      <main
        className={`transition-all duration-300 w-full ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } p-4`}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
