import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaPlus, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-[rgba(var(--background))] shadow-md p-4 flex justify-between items-center">
      <Link to="/">
        <div className="text-3xl font-semibold text-[rgb(var(--copy-primary))] flex items-center space-x-2 gap-5">
          PRODUCT STORE <FaShoppingCart className="text-3xl " />
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/create">
          <button className="bg-[rgb(var(--cta))] px-4 py-2 text-[rgb(var(--cta-text))]  rounded-md hover:bg-[rgb(var(--cta-active))] transition">
            <FaPlus className="text-3xl" />
          </button>
        </Link>
        <button onClick={toggleDarkMode} className="flex items-center px-4 py-2 gap-2 bg-[rgba(var(--border))] text-[rgb(var(--copy-primary))] rounded-md hover:bg-[rgba(var(--copy-secondary))] transition">
          {/* {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} */}
          {darkMode ? <FaSun className="text-3xl" /> : <FaMoon className="text-3xl" />}
        </button>
      </div>
    </nav>
  );
}
