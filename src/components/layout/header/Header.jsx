import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useSelector } from "react-redux";
import LogoutButton from "../../logout/Logout";

const allowedPages = {
  "Agriculture, Environment & Sustainability": ["/professionalnetwork"],
  "Arts, Communication, Media & Design": ["/professionalnetwork"],
  "Consulting, Finance, Operations & Entrepreneurship": ["/professionalnetwork"],
  "Education, Human Services & NonProfit": ["/professionalnetwork"],
  "Hospitality, Sports & Recreation": ["/professionalnetwork"],
  "Technology, Engineering & Data": ["/professionalnetwork"],
  "Government, Policy, Law & International Affairs": ["/legalassistance"],
  "Health & Sciences": ["/virtualclinic"],
};

const allPages = ["/professionalnetwork", "/legalassistance", "/virtualclinic", "/businessnetwork"];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For Desktop Dropdown
  const { isAuthenticated, industry, role } = useSelector((state) => state.auth);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  let availableRoutes = [];
  if (role === "helper" || role === "admin") {
    availableRoutes = allPages;
  } else if (role === "seeker" && industry) {
    availableRoutes = allowedPages[industry] || [];
  }

  return (
    <nav className="bg-[#003505] p-2 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-24 w-36" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-gray-300 transition transform hover:scale-105">Home</Link>

          {isAuthenticated && (
            <div className="relative group">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white hover:text-gray-300 cursor-pointer transition transform hover:scale-105"
              >
                Business & Services
                <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-lg border-b-4 border-[#003505] transition-all duration-300 ${isDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}>
                <Link to="/businessnetwork" className="block px-4 py-2 text-[#003505] border-b border-gray-300 hover:bg-gray-200 transition">Ads and Services</Link>
                <Link to="/business" className="block px-4 py-2 text-[#003505] border-b border-gray-300 hover:bg-gray-200 transition">Business Directory</Link>
                <Link to="/" className="block px-4 py-2 text-stone-500 hover:bg-gray-200 transition">Job Board - <br /> Coming Soon</Link>
              </div>

            </div>
          )}

          {availableRoutes.includes("/professionalnetwork") && (
            <Link to="/professionalnetwork" className="text-white hover:text-gray-300 transition transform hover:scale-105">Professional Network</Link>
          )}
          {availableRoutes.includes("/legalassistance") && (
            <Link to="/legalassistance" className="text-white hover:text-gray-300 transition transform hover:scale-105">Legal Assistance</Link>
          )}
          {availableRoutes.includes("/virtualclinic") && (
            <Link to="/virtualclinic" className="text-white hover:text-gray-300 transition transform hover:scale-105">Virtual Clinic</Link>
          )}
          <Link to="/contact" className="text-white hover:text-gray-300 transition transform hover:scale-105">Contact Us</Link>

          {isAuthenticated ? <LogoutButton /> : (
            <Link to="/signin" className="px-4 py-1 bg-white text-[#003505] font-medium rounded-lg border-2 border-[#003505] shadow-md transition duration-300 hover:bg-[#003505] hover:text-white hover:border-white">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-3/4 bg-[#003505] p-6 flex flex-col space-y-4 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button className="self-end text-white" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <Link to="/" className="block text-white py-2 transition hover:text-gray-300" onClick={toggleMobileMenu}>Home</Link>

        {isAuthenticated && (
          <div>
            <button onClick={toggleMobileDropdown} className="block w-full text-left text-white py-2 flex justify-between items-center">
              Business & Services
              <svg className={`w-4 h-4 transition-transform ${isMobileDropdownOpen ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`ml-4 transition-all overflow-hidden ${isMobileDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} duration-300`}>
              <Link to="/businessnetwork" className="block text-white py-2 transition hover:text-gray-300" onClick={toggleMobileMenu}>Ads and Services</Link>
              <Link to="/business" className="block text-white py-2 transition hover:text-gray-300" onClick={toggleMobileMenu}>Business Directory</Link>
            </div>
          </div>
        )}

        {availableRoutes.includes("/professionalnetwork") && (
          <Link to="/professionalnetwork" className="block text-white py-2 transition hover:text-gray-300" onClick={toggleMobileMenu}>Professional Network</Link>
        )}
        {availableRoutes.includes("/legalassistance") && (
          <Link to="/legalassistance" className="block text-white py-2 transition hover:text-gray-300" onClick={toggleMobileMenu}>Legal Assistance</Link>
        )}
         {availableRoutes.includes("/virtualclinic") && (
          <Link to="/virtualclinic" className="block text-white py-2 transition hover:text-gray-300" onClick={toggleMobileMenu}>Virtual Clinic</Link>
        )}
        <Link to="/contact" className="block text-white py-2 transition hover:text-gray-300" onClick={toggleMobileMenu}>Contact Us</Link>

        {isAuthenticated ? <LogoutButton /> : (
          <Link to="/signin" className="block text-white py-2 transition hover:text-gray-300" onClick={toggleMobileMenu}>Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
