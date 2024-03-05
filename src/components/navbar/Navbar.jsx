import "./navbar.css";
import NavTabsItem from "./NavTabsItem";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar_container">
      <div className="logo_container">
        <Link to={"/"}>
          <Logo className="logo" />
        </Link>
      </div>

      <div className="navtabs_container">
        <NavTabsItem value="Products" path="/products" />
        <NavTabsItem value="Terms Of Service" path="/termsofservice" />
        <NavTabsItem value="Privacy Policy" path="/privacypolicy" />
        <NavTabsItem value="Contact Us" path="/contactus" />

        <div className="cart_container">
          <Link to={"/cart"}>
            <div className="cart_div">
              <Cart className="cart" />
              <div className="circle">
                <span>1</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
