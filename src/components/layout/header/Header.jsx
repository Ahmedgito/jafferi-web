import { useState } from "react";
import logo from "../../../assets/logo.png"; // Replace with your logo path

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#003505] p-4 fixed w-full top-0 left-0 z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-20 w-32" />
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/about" className="text-white hover:text-gray-300">
            Professional Network
          </a>
          <a href="#services" className="text-white hover:text-gray-300">
            Medical Assistance
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Legal Assistance
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact Us
          </a>
          <a href="#signin" className="text-white hover:text-gray-300">
            Sign In
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-gray-800 p-4 absolute top-0 left-0 w-full z-20`}
      >
        <a href="/" className="block text-white py-2">
          Home
        </a>
        <a href="/about" className="block text-white py-2">
          Professional Network
        </a>
        <a href="#services" className="block text-white py-2">
          Medical Assistance
        </a>
        <a href="#contact" className="block text-white py-2">
          Legal Assistance
        </a>
        <a href="#contact" className="block text-white py-2">
          Contact Us
        </a>
        <a href="#signin" className="block text-white py-2">
          Sign In
        </a>
      </div>
    </nav>
  );
};

export default Header;
