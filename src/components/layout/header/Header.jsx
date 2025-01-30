import { useState } from "react";
import logo from "../../../assets/logo.png"; // Replace with your logo path

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#003505] p-4 fixed w-full top-0 left-0 z-50 ">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-20 w-32" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#/jafferi-web/" className="text-white hover:text-gray-300">Home</a>
          <a href="#/jafferi-web/about" className="text-white hover:text-gray-300">Professional Network</a>
          <a href="#services" className="text-white hover:text-gray-300">Medical Assistance</a>
          <a href="#contact" className="text-white hover:text-gray-300">Legal Assistance</a>
          <a href="#/jafferi-web/contact" className="text-white hover:text-gray-300">Contact Us</a>
          <a href="#/jafferi-web/signin" className="text-white hover:text-gray-300">Sign In</a>
        </div>

        {/* Mobile Hamburger Button */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-[#003505] p-6 flex flex-col space-y-4 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button className="self-end text-white" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <a href="#/jafferi-web/" className="block text-white py-2" onClick={toggleMobileMenu}>Home</a>
        <a href="#/jafferi-web/about" className="block text-white py-2" onClick={toggleMobileMenu}>Professional Network</a>
        <a href="#services" className="block text-white py-2" onClick={toggleMobileMenu}>Medical Assistance</a>
        <a href="#contact" className="block text-white py-2" onClick={toggleMobileMenu}>Legal Assistance</a>
        <a href="#/jafferi-web/contact" className="block text-white py-2" onClick={toggleMobileMenu}>Contact Us</a>
        <a href="#/jafferi-web/signin" className="block text-white py-2" onClick={toggleMobileMenu}>Sign In</a>
      </div>
    </nav>
  );
};

export default Header;
