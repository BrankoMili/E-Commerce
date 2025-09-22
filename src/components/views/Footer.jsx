import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="footer_container">
      <div className="footer_main_content">
        <div className="footer_column about_us">
          <Logo className="footer_logo" />
          <p>
            Your one-stop shop for high-quality products. Discover your next
            favorite thing with us.
          </p>
        </div>

        <div className="footer_column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer_column">
          <h4>Legal</h4>
          <ul>
            <li>
              <Link to="/privacypolicy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/termsofservice">Terms Of Service</Link>
            </li>
          </ul>
        </div>

        <div className="footer_column">
          <h4>Follow Us</h4>
          <div className="social_icons">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer_bottom_bar">
        <p>© 2025 eCommerce Website. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
