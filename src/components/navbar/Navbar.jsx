import "./navbar.css";
import NavTabsItem from "./NavTabsItem";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  const { cartState } = useContext(CartContext);
  const [sumItems, setSumItems] = useState(cartState.length);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const sumOfItems = () => {
    let sum = 0;
    cartState.forEach(item => {
      sum += item.itemNumber;
    });
    return sum;
  };

  useEffect(() => {
    setSumItems(sumOfItems());
  }, [cartState]);

  return (
    <nav className="navbar_container">
      <div className="navtabs_container">
        <div className="logo_hamburger_menu">
          <div className="logo_container">
            <Link to={"/"}>
              <Logo className="logo" />
            </Link>
          </div>

          <button
            class="hamburger_button"
            onClick={() => {
              setHamburgerMenuOpen(!hamburgerMenuOpen);
            }}
          >
            <svg
              width="28"
              height="24"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4H0V0H24V4ZM24 8H0V12H24V8ZM24 16H0V20H24V16Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        <div className="navbar_buttons">
          <NavTabsItem value="Products" path="/products" />
          <NavTabsItem value="Terms Of Service" path="/termsofservice" />
          <NavTabsItem value="Privacy Policy" path="/privacypolicy" />
          <NavTabsItem value="Contact Us" path="/contactus" />
        </div>

        <div className="cart_container">
          <Link to={"/cart"}>
            <div className="cart_div">
              <Cart className="cart" />
              {cartState.length > 0 && (
                <div className="circle">
                  <span>{sumItems}</span>
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* MOBILE VIEW MENU */}
      {hamburgerMenuOpen && (
        <div
          className="hamburger_menu_buttons_container"
          onClick={e => {
            if (e.target.tagName === "A") {
              setHamburgerMenuOpen(false);
            }
          }}
        >
          <NavTabsItem value="Products" path="/products" />
          <NavTabsItem value="Terms Of Service" path="/termsofservice" />
          <NavTabsItem value="Privacy Policy" path="/privacypolicy" />
          <NavTabsItem value="Contact Us" path="/contactus" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
