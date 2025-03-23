import "../footer/Footer.css";
import { MapPin, Phone, Mail } from "lucide-react"; // Import icons
import logo from "../../../assets/logo.png";


const Footer = () => {
  return (
    <footer className="footer h-96 bg-gray-900 text-white py-10">
      <div className="footer-content flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-6">
        {/* Logo Section */}
        <div className="footer-section w-full md:w-1/3">
          <img src={logo} alt="Logo" className="footer-logo h-18 w-28 mb-4" />
          <p className="footer-description text-white text-sm">
          Jaferi Alliance is more than a platform — it's a thriving community fostering growth, collaboration, and support for all members.
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-section w-full md:w-1/3">
          <h3 className="footer-heading text-lg font-semibold mb-3">Links</h3>
          <ul className="footer-links space-y-2 text-gray-300">
            <li className="hover:text-green-400 cursor-pointer">› Home</li>
            <li className="hover:text-green-400 cursor-pointer">› Professional Network</li>
            <li className="hover:text-green-400 cursor-pointer">› Medical Assistance</li>
            <li className="hover:text-green-400 cursor-pointer">› Legal Assistance</li>
            <li className="hover:text-green-400 cursor-pointer">› Contact Us</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section w-full md:w-1/3">
          <h3 className="footer-heading text-lg font-semibold mb-3">Contact</h3>
          <ul className="footer-contact space-y-3 ">
           
           
            <li className="flex items-center gap-2">
              <Mail size={20} className="" /> 
              jaferialliance@gmail.com
            </li>
          
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
