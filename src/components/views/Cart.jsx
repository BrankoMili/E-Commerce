import "../cart/cart.css";
import CartList from "../cart/CartList";
import { CartContext } from "../../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { CLEAR_CART } from "../../constants/constants";

const Cart = () => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderInput, setOrderInput] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
    postalCode: ""
  });
  const [submitedForm, setSubmitedForm] = useState(false);

  const sumPrice = () => {
    setTotalPrice(0);
    if (cartState.length !== 0) {
      cartState.forEach(item => {
        setTotalPrice(
          prevPrice => prevPrice + item.product.price * item.itemNumber
        );
      });
    }
  };

  useEffect(() => {
    sumPrice();
  }, [cartState]);

  const handleSubmit = e => {
    e.preventDefault();

    setSubmitedForm(true);

    cartDispatch({
      type: CLEAR_CART
    });
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setOrderInput(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="shopping_cart_page">
      <h2>Shopping Cart</h2>
      <div className="line"></div>
      <CartList cartProducts={cartState} />
      <div className="line"></div>
      <div className="total_price_container">
        <p>Total Price:</p>
        <p>
          <b>${totalPrice.toFixed(2)}</b>
        </p>
      </div>

      <button
        className="button_style"
        onClick={() => {
          cartDispatch({
            type: CLEAR_CART
          });
        }}
      >
        Clear Cart
      </button>

      <div className="order_container">
        {submitedForm ? (
          <div className="submited_form_container">
            <h4>ORDER INFORMATION - ORDER CONFIRMED</h4>
            <div className="input_container">
              <p>Full Name:</p> <span>{orderInput.fullName}</span>
            </div>
            <div className="input_container">
              <p>Address:</p> <span>{orderInput.address}</span>
            </div>
            <div className="input_container">
              <p>City:</p> <span>{orderInput.city}</span>
            </div>
            <div className="input_container">
              <p>Phone:</p> <span>{orderInput.phone}</span>
            </div>
            <div className="input_container">
              <p>Postal Code:</p> <span>{orderInput.postalCode}</span>
            </div>
            <button
              className="button_style"
              onClick={() => {
                setSubmitedForm(false);

                setOrderInput({
                  fullName: "",
                  address: "",
                  city: "",
                  phone: "",
                  postalCode: ""
                });
              }}
            >
              Back To Card
            </button>
          </div>
        ) : (
          <div>
            <h4>ADDRESS FOR SHIPPING AND BILLING</h4>
            <form className="cart_form_container" onSubmit={handleSubmit}>
              <label>
                <span>Full Name</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="fullName"
                  value={orderInput.fullName}
                />
              </label>
              <label>
                <span>Address</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="address"
                  value={orderInput.address}
                />
              </label>
              <label>
                <span>City</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="city"
                  value={orderInput.city}
                />
              </label>
              <label>
                <span>Phone</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="phone"
                  value={orderInput.phone}
                />
              </label>
              <label>
                <span>Postal Code</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="postalCode"
                  value={orderInput.postalCode}
                />
              </label>
              <button className="button_style" type="submit">
                Submit Order
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
