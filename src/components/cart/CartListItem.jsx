import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import {
  INCREMENT_CART_PRODUCT,
  DECREMENT_CART_PRODUCT,
  REMOVE_CART_PRODUCT
} from "../../constants/constants";

const CartListItem = ({ cartProduct, itemNumber }) => {
  const { cartDispatch } = useContext(CartContext);
  const itemTotalPrice = cartProduct.price * itemNumber;

  return (
    <div className="cart_item_row">
      <div className="cart_item_product">
        <img src={cartProduct.image} alt={cartProduct.title} />
        <div>
          <h4>{cartProduct.title}</h4>
          <span className="cart_item_price_mobile">
            ${cartProduct.price.toFixed(2)}
          </span>
          <button
            className="remove_btn"
            onClick={() =>
              cartDispatch({
                type: REMOVE_CART_PRODUCT,
                payload: cartProduct.id
              })
            }
          >
            <i className="fas fa-trash-alt"></i> Remove
          </button>
        </div>
      </div>

      <div className="cart_item_price_desktop">
        ${cartProduct.price.toFixed(2)}
      </div>

      <div className="cart_item_quantity">
        <div className="quantity_selector">
          <button
            onClick={() =>
              cartDispatch({
                type: DECREMENT_CART_PRODUCT,
                payload: cartProduct.id
              })
            }
          >
            -
          </button>
          <span>{itemNumber}</span>
          <button
            onClick={() =>
              cartDispatch({
                type: INCREMENT_CART_PRODUCT,
                payload: cartProduct.id
              })
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="cart_item_total">${itemTotalPrice.toFixed(2)}</div>
    </div>
  );
};

export default CartListItem;
