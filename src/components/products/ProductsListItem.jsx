import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { ADD_TO_CART } from "../../constants/constants";

const ProductsListItem = ({ product }) => {
  const navigate = useNavigate();
  const { cartDispatch } = useContext(CartContext);

  const handleAddToCart = e => {
    e.stopPropagation();
    cartDispatch({
      type: ADD_TO_CART,
      payload: {
        items: 1,
        product: product
      }
    });
  };

  return (
    <div
      className="product_card"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="card_image_container">
        <img src={product.image} alt={product.title} className="card_image" />
      </div>
      <div className="card_details">
        <span className="card_category">{product.category}</span>
        <h4 className="card_title">{product.title}</h4>
        <div className="card_footer">
          <p className="card_price">${product.price.toFixed(2)}</p>
          <button className="add_to_cart_btn" onClick={handleAddToCart}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsListItem;
