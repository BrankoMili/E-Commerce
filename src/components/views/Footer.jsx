import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer_container">
      <p>© 2024 eCommerce Website</p>
      <Link to={"/privacypolicy"}>Privacy Policy</Link>
      <Link to={"/termsofservice"}>Terms Of Service</Link>
      <Link to={"/contactus"}>Contact Us</Link>
    </footer>
  );
};

export default Footer;
