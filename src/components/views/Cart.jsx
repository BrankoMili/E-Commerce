import "../cart/cart.css";
import CartList from "../cart/CartList";
import { CartContext } from "../../context/CartContext";
import { useContext, useEffect, useState } from "react";

const Cart = () => {
  const { state } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const sumPrice = () => {
    setTotalPrice(0);
    if (state.length !== 0) {
      state.forEach(item => {
        setTotalPrice(prevPrice => prevPrice + item.product.price);
      });
    }
  };

  useEffect(() => {
    sumPrice();
  }, [state]);

  return (
    <div className="shopping_cart_page">
      <h2>Shopping Cart</h2>
      <div className="line"></div>
      <CartList cartProducts={state} />
      <div className="line"></div>
      <div className="total_price_container">
        <p>Total Price:</p>
        <p>
          <b>${totalPrice}</b>
        </p>
      </div>
      <button className="button_style">Continue Order</button>
      <button className="button_style">Clear Cart</button>
    </div>
  );
};

export default Cart;
