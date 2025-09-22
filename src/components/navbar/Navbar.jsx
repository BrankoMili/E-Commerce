import "./navbar.css";
import NavTabsItem from "./NavTabsItem";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import isAuthenticated from "../../utils/auth";

const Navbar = () => {
  const { cartState } = useContext(CartContext);
  const [sumItems, setSumItems] = useState(0);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const sumOfItems = () => {
    return cartState.reduce((sum, item) => sum + item.itemNumber, 0);
  };

  useEffect(() => {
    setSumItems(sumOfItems());
  }, [cartState]);

  const toggleHamburgerMenu = () => {
    setHamburgerMenuOpen(!hamburgerMenuOpen);
  };

  const closeMobileMenu = () => {
    setHamburgerMenuOpen(false);
  };

  return (
    <nav className="navbar_container">
      <div className="nav_content">
        <div className="logo_container">
          <Link to={"/"} onClick={closeMobileMenu}>
            <Logo className="logo" />
          </Link>
        </div>

        <div className={`nav_links ${hamburgerMenuOpen ? "active" : ""}`}>
          <NavTabsItem
            value="Products"
            path="/products"
            onClick={closeMobileMenu}
          />
          <NavTabsItem
            value="Terms Of Service"
            path="/termsofservice"
            onClick={closeMobileMenu}
          />
          <NavTabsItem
            value="Privacy Policy"
            path="/privacypolicy"
            onClick={closeMobileMenu}
          />
          <NavTabsItem
            value="Contact Us"
            path="/contactus"
            onClick={closeMobileMenu}
          />
          <button onClick={isAuthenticated} className="login_button_mobile">
            login
          </button>
        </div>

        <div className="nav_actions">
          <button onClick={isAuthenticated} className="login_button_desktop">
            login
          </button>
          <div className="cart_container">
            <Link to={"/cart"}>
              <div className="cart_div">
                <Cart className="cart" />
                {cartState.length > 0 && (
                  <div className="cart_badge">
                    <span>{sumItems}</span>
                  </div>
                )}
              </div>
            </Link>
          </div>
          <button className="hamburger_button" onClick={toggleHamburgerMenu}>
            {hamburgerMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
