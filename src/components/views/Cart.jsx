import emptyCartIllustration from "../../assets/vecteezy_basket-retail-shopping-cart-blue-icon-on-abstract-cloud_19130097.jpg";

import "../cart/cart.css";
import CartList from "../cart/CartList";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
import { useContext, useEffect, useState } from "react";
import { CLEAR_CART } from "../../constants/constants";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const { productsState } = useContext(ProductContext);
  const navigate = useNavigate();

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
  const [notification, setNotification] = useState({
    title: "",
    text: "",
    show: false
  });

  // Izračunavanje ukupne cene
  useEffect(() => {
    const newTotalPrice = cartState.reduce(
      (sum, item) => sum + item.product.price * item.itemNumber,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartState]);

  // Logika za validaciju i slanje forme
  const handleSubmit = e => {
    e.preventDefault();
    const isFormValid = Object.values(orderInput).every(
      value => value.trim() !== ""
    );

    if (!isFormValid) {
      setNotification({
        title: "Incomplete Form",
        text: "Please fill out all shipping and billing details.",
        show: true
      });
      setTimeout(
        () => setNotification(prevState => ({ ...prevState, show: false })),
        4000
      );
      return;
    }

    setSubmitedForm(true);
    cartDispatch({ type: CLEAR_CART });
    window.scrollTo(0, 0);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setOrderInput(prevState => ({ ...prevState, [name]: value }));
  };

  if (submitedForm) {
    return (
      <div className="order_confirmation_container">
        <div className="confirmation_card">
          <i className="fas fa-check-circle success_icon"></i>
          <h1>Thank You For Your Order!</h1>
          <p>Your order has been confirmed and will be shipped shortly.</p>
          <div className="order_summary_details">
            <h4>Order Details:</h4>
            <p>
              <strong>Full Name:</strong> {orderInput.fullName}
            </p>
            <p>
              <strong>Address:</strong> {orderInput.address}, {orderInput.city},{" "}
              {orderInput.postalCode}
            </p>
            <p>
              <strong>Total Price:</strong>{" "}
              <strong>${totalPrice.toFixed(2)}</strong>
            </p>
          </div>
          <button
            className="button_style"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartState.length === 0) {
    const recommendedProducts = productsState.productsConstant.slice(0, 4);

    return (
      <div className="empty_cart_page">
        <div className="empty_cart_main_panel">
          <img src={emptyCartIllustration} alt="Empty shopping cart" />
          <h2>Your Cart is Currently Empty</h2>
          <p>
            Before you proceed to checkout, you must add some products to your
            cart.
          </p>
          <button
            className="button_style"
            onClick={() => navigate("/products")}
          >
            Return to Shop
          </button>
        </div>

        {/* --- NOVI DEO SA PREPORUKAMA --- */}
        <div className="empty_cart_recommendations">
          <h3>You might be interested in</h3>
          <div className="recommended_products_grid">
            {recommendedProducts.map(product => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="recommended_product_card"
              >
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <p>${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. STANJE: KORPA SA PROIZVODIMA
  return (
    <div className="cart_page_container">
      <div className="cart_header">
        <h1>Your Shopping Cart</h1>
      </div>
      <div className="cart_layout">
        <div className="cart_main_content">
          <div className="cart_items_list">
            <CartList cartProducts={cartState} />
          </div>

          <div className="checkout_form_container">
            <h2>Shipping & Billing</h2>
            {notification.show && (
              <div className="form_notification">
                <strong>{notification.title}:</strong> {notification.text}
              </div>
            )}
            <form
              id="checkout-form"
              className="checkout_form"
              onSubmit={handleSubmit}
            >
              <div className="form_group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={orderInput.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form_group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={orderInput.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form_row">
                <div className="form_group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={orderInput.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form_group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={orderInput.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form_row">
                <div className="form_group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={orderInput.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form_group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderInput.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <aside className="order_summary_section">
          <div className="summary_card">
            <h3>Order Summary</h3>
            <div className="summary_row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary_row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="summary_total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="button_style checkout_btn"
              type="submit"
              form="checkout-form"
            >
              Submit Order
            </button>
            <button
              className="clear_cart_btn"
              onClick={() => cartDispatch({ type: CLEAR_CART })}
            >
              Clear Cart
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
