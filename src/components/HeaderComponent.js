// Header
import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className=" bg-[#4B0082] dark:bg-[#2C2C54] shadow-md text-white fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 shadow-lg z-50 border-b border-[#BA55D3]">
      {/* Título do App */}
      <div className="text-xl font-bold tracking-wide flex items-center space-x-2">
        <span>Planejador de Conteúdo</span>
      </div>

      {/* Botões à Direita */}
      <div className="flex items-center space-x-4">
        {/* Botão de Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-[#BA55D3]/80 hover:bg-[#BA55D3] transition duration-200 shadow-md"
          aria-label="Alternar Dark Mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-7.364l-1.414 1.414M6.05 6.05l-1.414 1.414m12.728 12.728l-1.414-1.414M6.05 17.95l-1.414-1.414M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
            />
          </svg>
        </button>

        {/* Botão do Menu */}
        <button
          onClick={toggleMenu}
          className="p-2 rounded-full bg-[#BA55D3]/80 hover:bg-[#BA55D3] transition duration-200 shadow-md"
          aria-label="Abrir Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <nav className="absolute top-16 right-6 bg-[#E6E6FA] dark:bg-[#483D8B] text-gray-800 dark:text-white rounded-lg shadow-lg w-48 border border-[#BA55D3]">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link to="/" className="hover:text-[#9370DB] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/new-post" className="hover:text-[#9370DB] transition">
                Novo Post
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default HeaderComponent;
