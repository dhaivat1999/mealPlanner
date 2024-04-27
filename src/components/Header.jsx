import React, { useState, useEffect } from "react";
import HomeLogo from "../assets/HomeLogo.svg";
import Home from "./Home";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-custom-900 shadow-lg" : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between p-4 sm:p-6">
          <a
            href="/"
            className=" font-semibold text-custom-200 hover:text-opacity-50"
          >
            <img src={HomeLogo} width={30} height={30} alt="Home Logo" />
          </a>
          <a
            href="/search"
            className="hidden sm:block font-semibold text-custom-200 hover:text-opacity-50"
          >
            Recipe Generator
          </a>
          <a
            href="/calculate"
            className="hidden sm:block font-semibold text-custom-200 hover:text-opacity-50"
          >
            Calorie Calculator
          </a>

          <div className="flex items-center">
            <button
              className="lg:hidden focus:outline-none ml-4"
              aria-label="Menu"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6 text-custom-200 hover:text-opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </nav>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-custom-800 p-4">
            <a
              href="/search"
              className="block font-semibold text-custom-200 hover:text-opacity-50 py-2"
            >
              Recipe Generator
            </a>
            <a
              href="/calculate"
              className="block font-semibold text-custom-200 hover:text-opacity-50 py-2"
            >
              Calorie Calculator
            </a>
          </div>
        )}
      </header>
    </>
  );
}
