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
  const { isAuthenticated, industry, role } = useSelector((state) => state.auth);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // **Role-Based Page Access**
  let availableRoutes = [];
  if (role === "helper") {
    availableRoutes = allPages; // Helper ko sab pages dikhai denge
  } else if (role === "seeker" && industry) {
    availableRoutes = allowedPages[industry] || []; // Seeker ko sirf industry-based pages
  }

  return (
      <nav className="bg-[#003505] p-4 fixed w-full top-0 left-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <Link to="/">
              <img src={logo} alt="Logo" className="h-24 w-36" />
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            {isAuthenticated ? (
                <>
                  <Link to="/businessnetwork" className="text-white hover:text-gray-300">Business Network</Link>
                  {availableRoutes.includes("/professionalnetwork") && (
                      <Link to="/professionalnetwork" className="text-white hover:text-gray-300">Professional Network</Link>
                  )}
                  {availableRoutes.includes("/legalassistance") && (
                      <Link to="/legalassistance" className="text-white hover:text-gray-300">Legal Assistance</Link>
                  )}
                  {availableRoutes.includes("/virtualclinic") && (
                      <Link to="/virtualclinic" className="text-white hover:text-gray-300">Virtual Clinic</Link>
                  )}
                  <Link to="/contact" className="text-white hover:text-gray-300">Contact Us</Link>
                  <LogoutButton />
                </>
            ) : (
                <>
                  <Link to="/contact" className="text-white hover:text-gray-300">Contact Us</Link>
                  <Link to="/signin" className="flex items-center gap-1 md:-mt-1 px-4 py-1 bg-[white] text-#003505 font-medium rounded-lg 
             transition duration-300 hover:bg-[#003505] hover:text-[white] hover:border-2 hover:border-white cursor-pointer border-2 border-[#003505] shadow-md">Sign In</Link>
                </>
            )}
          </div>

          <button className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className={`fixed top-0 right-0 h-full w-3/4 bg-[#003505] p-6 flex flex-col space-y-4 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button className="self-end text-white" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <Link to="/" className="block text-white py-2" onClick={toggleMobileMenu}>Home</Link>
          {isAuthenticated ? (
              <>
                <Link to="/businessnetwork" className="block text-white py-2" onClick={toggleMobileMenu}>Business Network</Link>
                {availableRoutes.includes("/professionalnetwork") && (
                    <Link to="/professionalnetwork" className="block text-white py-2" onClick={toggleMobileMenu}>Professional Network</Link>
                )}
                {availableRoutes.includes("/legalassistance") && (
                    <Link to="/legalassistance" className="block text-white py-2" onClick={toggleMobileMenu}>Legal Assistance</Link>
                )}
                {availableRoutes.includes("/virtualclinic") && (
                    <Link to="/virtualclinic" className="block text-white py-2" onClick={toggleMobileMenu}>Virtual Clinic</Link>
                )}
                <Link to="/contact" className="block text-white py-2" onClick={toggleMobileMenu}>Contact Us</Link>
                <LogoutButton />
              </>
          ) : (
              <>
                <Link to="/contact" className="block text-white py-2" onClick={toggleMobileMenu}>Contact Us</Link>
                <Link to="/signin" className="block text-white py-2" onClick={toggleMobileMenu}>Sign In</Link>
              </>
          )}
        </div>
      </nav>
  );
};

export default Header;
