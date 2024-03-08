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
        <div className="logo_container">
          <Link to={"/"}>
            <Logo className="logo" />
          </Link>
        </div>

        <NavTabsItem value="Products" path="/products" />
        <NavTabsItem value="Terms Of Service" path="/termsofservice" />
        <NavTabsItem value="Privacy Policy" path="/privacypolicy" />
        <NavTabsItem value="Contact Us" path="/contactus" />

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
    </nav>
  );
};

export default Navbar;
