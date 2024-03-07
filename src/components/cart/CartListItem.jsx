import { useContext } from "react";
import {
  INCREMENT_CART_PRODUCT,
  DECREMENT_CART_PRODUCT,
  REMOVE_CART_PRODUCT
} from "../../constants/constants";
import { CartContext } from "../../context/CartContext";

const CartListItem = ({ cartProduct, itemNumber }) => {
  const { cartDispatch } = useContext(CartContext);

  return (
    <div className="cart_list_item_container">
      <div className="cart_product_container">
        <img src={cartProduct.image} alt={cartProduct.title} />
        <div className="title_price_remove">
          <p>
            <b>{cartProduct.title}</b>
          </p>
          <p>
            <b>${cartProduct.price}</b>
          </p>

          {/* REMOVE CART PRODUCT */}
          <p
            onClick={() => {
              cartDispatch({
                type: REMOVE_CART_PRODUCT,
                payload: cartProduct.id
              });
            }}
            className="remove_cart_item_button"
          >
            Remove
          </p>
        </div>
      </div>
      <div className="cart_product_number">
        {/* DECREMENT PRODUCT ITEMS */}
        <button
          onClick={() => {
            cartDispatch({
              type: DECREMENT_CART_PRODUCT,
              payload: cartProduct.id
            });
          }}
        >
          -
        </button>
        <span>{itemNumber}</span>
        {/* INCREMENT PRODUCT ITEMS */}
        <button
          onClick={() => {
            cartDispatch({
              type: INCREMENT_CART_PRODUCT,
              payload: cartProduct.id
            });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartListItem;
