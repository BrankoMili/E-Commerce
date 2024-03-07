import { ReactComponent as Add_to_cart } from "../../assets/add_to_cart.svg";
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
      type: ADD_TO_CART, // ADD TO CART cartDispatch
      payload: {
        items: 1,
        product: product
      }
    });
  };

  return (
    <div
      className="productlistitem_container"
      onClick={() => {
        navigate(`/products/${product.id}`);
      }}
    >
      <p>{product.title}</p>

      <p className="product_price">
        <b>${product.price}</b>
      </p>
      <img src={product.image} alt="product_image" className="product_image" />
      <div className="add_item_container" onClick={handleAddToCart}>
        <p>Add to Cart</p>
        <Add_to_cart className="add_to_cart" />
      </div>
    </div>
  );
};

export default ProductsListItem;
