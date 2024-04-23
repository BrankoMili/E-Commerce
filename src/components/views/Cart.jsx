import "../cart/cart.css";
import CartList from "../cart/CartList";
import { CartContext } from "../../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { CLEAR_CART } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import shoppingCart from "../../assets/vecteezy_basket-retail-shopping-cart-blue-icon-on-abstract-cloud_19130097.jpg";
import errorImg from "../../assets/error.svg";
import closeImg from "../../assets/close.svg";

const Cart = () => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderInput, setOrderInput] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    postalCode: "",
  });
  const [submitedForm, setSubmitedForm] = useState(false);
  const navigate = useNavigate();
  const [totalPriceOrder, setTotalPriceOrder] = useState(0);

  const sumPrice = () => {
    setTotalPrice(0);
    if (cartState.length !== 0) {
      cartState.forEach((item) => {
        setTotalPrice(
          (prevPrice) => prevPrice + item.product.price * item.itemNumber
        );
      });
    }
  };

  useEffect(() => {
    sumPrice();
  }, [cartState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullNameRegex = /^[a-zA-Z ]{2,30}$/;
    const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    if (fullNameRegex.test(orderInput.fullName)) {
      setTotalPriceOrder(totalPrice);
      setSubmitedForm(true);
      cartDispatch({
        type: CLEAR_CART,
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setOrderInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  // IF CART IS EMPTY AND FORM IS NOT SUBMITED
  if (cartState.length === 0 && !submitedForm) {
    return (
      <div className="shopping_cart_page">
        <h3>Your Shopping Cart Is Empty</h3>
        <img src={shoppingCart} className="shopppigCart_image" />
        <button
          className="button_style"
          onClick={() => {
            navigate("/products");
          }}
        >
          Back To All Products
        </button>
        <p className="byVecteezy">
          <a href="https://www.vecteezy.com/free-vector/empty-cart">
            Empty Cart Vectors by Vecteezy
          </a>
        </p>
      </div>
    );
  }
  return (
    <div className="shopping_cart_page">
      <h2>Shopping Cart</h2>

      {!submitedForm && totalPrice !== 0 && (
        <div>
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
                type: CLEAR_CART,
              });
            }}
          >
            Clear Cart
          </button>
        </div>
      )}

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
              <p>Email:</p> <span>{orderInput.email}</span>
            </div>
            <div className="input_container">
              <p>Postal Code:</p> <span>{orderInput.postalCode}</span>
            </div>
            <div className="input_container">
              <p>Total Price: </p>{" "}
              <span>
                <b>${totalPriceOrder.toFixed(2)}</b>
              </span>
            </div>
            <button
              className="button_style"
              onClick={() => {
                navigate("/products");
              }}
            >
              Go To Products
            </button>
          </div>
        ) : (
          <div>
            <div id="notification_container">
              <img src={errorImg} id="success_icon" />
              <div class="text_notification_container">
                <b>Invalid username</b>
                <p>Username must have between 2 and 10 characters</p>
              </div>
              <img src={closeImg} id="close_notification_icon" />
            </div>
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
                <span>Email</span>{" "}
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={orderInput.email}
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
