import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import instance from "../../utils/api";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from "../../constants/constants";
import { ProductContext } from "../../context/ProductContext";
import Error from "../error/Error";
import { ReactComponent as Add_to_cart } from "../../assets/add_to_cart.svg";
import { CartContext } from "../../context/CartContext";
import { ADD_TO_CART } from "../../constants/constants";

const SingleProduct = () => {
  const { productState, productDispatch } = useContext(ProductContext);
  const { products, loading, error } = productState;
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product] = products;
  const { cartDispatch } = useContext(CartContext);

  useEffect(() => {
    productDispatch({
      type: FETCH_PRODUCTS_REQUEST
    });
    instance
      .get(`/products/${productId}`)
      .then(res => {
        productDispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: [res.data] // productDispatch product data in array
        });
      })
      .catch(err => {
        console.error("Error", err);
        productDispatch({
          type: FETCH_PRODUCTS_FAILURE,
          payload: err
        });
      });
  }, []);

  if (loading) return <div className="loader"></div>;
  if (error) return <Error error={error} />;
  return (
    <>
      <div className="single_product_container">
        <h4>{product.title}</h4>
        <img src={product.image} alt={product.title} />
        <p>
          <b>Price: ${product.price}</b>
        </p>
        <p>
          Rating: {product.rating.rate} (Reviews: {product.rating.count})
        </p>

        <p className="product_desc">{product.description}</p>
        <p>
          Category: <b>{product.category}</b>
        </p>

        <div
          className="add_item_single_item"
          onClick={() => {
            cartDispatch({
              type: ADD_TO_CART, // ADD TO CART cartproductDispatch
              payload: {
                items: 1,
                product: product
              }
            });
          }}
        >
          <p>Add to Cart</p>
          <Add_to_cart className="add_to_cart" />
        </div>

        <button
          className="button_style"
          onClick={() => {
            navigate("/products");
          }}
        >
          Back To All Products
        </button>
      </div>
    </>
  );
};

export default SingleProduct;
