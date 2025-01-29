import "../footer/Footer.css";
import logo from "../../../assets/logo.png"; 
const Footer = () => {
  return (
      <footer className="footer h-96">
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-section">
            <img src={logo} alt="Logo" className="footer-logo h-18 w-28" /> {/* Replace text with logo */}
            <p className="footer-description">
              When Stan Britten established BritKare in 1995, he did so with a
              true desire to assist the medical community with the quality care
              of their desire.
            </p>
          </div>

          {/* Links Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Links</h3>
            <ul className="footer-links">
              <li>› Home</li>
              <li>› Professional Network</li>
              <li>› Medical Assistance</li>
              <li>› Legal Assistance</li>
              <li>› Contact Us</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-contact">
              <li>📍 33 Street Saadi Town, near Malir cantt</li>
              <li>📞 +92 322 2155556</li>
              <li>📱 +92 322 2155556</li>
              <li>✉️ myousufk87@gmail.com</li>
            </ul>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
