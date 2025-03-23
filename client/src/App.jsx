import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CreateProductPage from "./pages/CreateProductPage";

function App() {
  // Load theme from localStorage
  const storedTheme = localStorage.getItem("theme") || "light";
  const [darkMode, setDarkMode] = useState(storedTheme === "dark");

  // Apply theme on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen  max-w-[90vw] mx-auto bg-center   bg-[rgba(var(--background))] dark:bg-black text-[rgb(var(--copy-primary))] transition-colors duration-300 mt-10">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
