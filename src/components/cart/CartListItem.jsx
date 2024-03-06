import { useState } from "react";

const CartListItem = ({ cartProduct }) => {
  const [itemNumber, setItemNumber] = useState(1);

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
          <p>Remove</p>
        </div>
      </div>
      <div className="cart_product_number">
        <button
          onClick={() => {
            itemNumber > 1 && setItemNumber(itemNumber - 1);
          }}
        >
          -
        </button>
        <span>{itemNumber}</span>
        <button
          onClick={() => {
            setItemNumber(itemNumber + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartListItem;
