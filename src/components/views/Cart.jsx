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
    postalCode: ""
  });
  const [submitedForm, setSubmitedForm] = useState(false);
  const navigate = useNavigate();
  const [totalPriceOrder, setTotalPriceOrder] = useState(0);
  const [notification, setNotification] = useState({
    notification_title: "",
    notification_text: "",
    show: false
  });
  const [timer, setTimer] = useState(undefined);

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

  // Form Validation
  // If every input field is properly fulfilled
  const passedInputOrder = () => {
    setTotalPriceOrder(totalPrice);
    setSubmitedForm(true);
    cartDispatch({
      type: CLEAR_CART
    });
  };

  // If any of input field is not properly fulfilled
  const failedInputOrder = () => {
    setTimer(
      setTimeout(() => {
        setNotification(prevState => {
          return { ...prevState, show: false };
        });
        setTimer(undefined);
      }, 3000)
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    const fullNameRegex = /^[a-zA-Z ]{2,50}$/;
    const addressRegex = /^[a-zA-Z0-9\s,.'-+]{3,50}$/;
    const cityRegex = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const postalRegex = /^[a-zA-Z0-9\s,.'-]{2,20}$/;

    if (fullNameRegex.test(orderInput.fullName) === false) {
      if (timer === undefined) {
        setNotification(prevState => {
          return {
            ...prevState,
            notification_title: "Invalid full name",
            notification_text:
              "Number of characters must be between 2 and 50. Only alphabet is allowed",
            show: true
          };
        });
        failedInputOrder();
      }
      return;
    }

    if (addressRegex.test(orderInput.address) === false) {
      if (timer === undefined) {
        setNotification(prevState => {
          return {
            ...prevState,
            notification_title: "Invalid address",
            notification_text: "Please insert valid address.",
            show: true
          };
        });
        failedInputOrder();
      }
      return;
    }

    if (cityRegex.test(orderInput.city) === false) {
      if (timer === undefined) {
        setNotification(prevState => {
          return {
            ...prevState,
            notification_title: "Invalid city name",
            notification_text: "Please insert valid city name.",
            show: true
          };
        });
        failedInputOrder();
      }
      return;
    }

    if (phoneRegex.test(orderInput.phone) === false) {
      if (timer === undefined) {
        setNotification(prevState => {
          return {
            ...prevState,
            notification_title: "Invalid phone number",
            notification_text: "Please insert valid phone number.",
            show: true
          };
        });
        failedInputOrder();
      }
      return;
    }

    if (emailRegex.test(orderInput.email) === false) {
      if (timer === undefined) {
        setNotification(prevState => {
          return {
            ...prevState,
            notification_title: "Invalid email",
            notification_text: "Please insert valid email address.",
            show: true
          };
        });
        failedInputOrder();
      }
      return;
    }

    if (postalRegex.test(orderInput.postalCode) === false) {
      if (timer === undefined) {
        setNotification(prevState => {
          return {
            ...prevState,
            notification_title: "Invalid postal code",
            notification_text: "Please insert valid postal code.",
            show: true
          };
        });
        failedInputOrder();
      }
      return;
    }

    passedInputOrder(); // If every input field is properly fulfilled
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setOrderInput(prevState => {
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
                type: CLEAR_CART
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
            {notification.show && (
              <div id="notification_container">
                <img src={errorImg} id="success_icon" />
                <div className="text_notification_container">
                  <b>{notification.notification_title}</b>
                  <p>{notification.notification_text}</p>
                </div>
                <img
                  src={closeImg}
                  id="close_notification_icon"
                  onClick={() => {
                    clearTimeout(timer);
                    setTimer(undefined);
                    setNotification(prevState => {
                      return { ...prevState, show: false };
                    });
                  }}
                />
              </div>
            )}
            <h4>ADDRESS FOR SHIPPING AND BILLING</h4>
            <form className="cart_form_container" onSubmit={handleSubmit}>
              <label>
                <span>Full Name</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="fullName"
                  value={orderInput.fullName}
                  required
                  maxLength="50"
                />
              </label>
              <label>
                <span>Address</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="address"
                  value={orderInput.address}
                  required
                  maxLength="50"
                />
              </label>
              <label>
                <span>City</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="city"
                  value={orderInput.city}
                  required
                />
              </label>
              <label>
                <span>Phone</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="phone"
                  value={orderInput.phone}
                  required
                />
              </label>
              <label>
                <span>Email</span>{" "}
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={orderInput.email}
                  required
                />
              </label>
              <label>
                <span>Postal Code</span>{" "}
                <input
                  type="text"
                  onChange={handleChange}
                  name="postalCode"
                  value={orderInput.postalCode}
                  required
                  maxLength="20"
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
