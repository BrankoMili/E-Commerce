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

const SingleProduct = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { products, loading, error } = state;
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product] = products;

  useEffect(() => {
    dispatch({
      type: FETCH_PRODUCTS_REQUEST
    });
    instance
      .get(`/products/${productId}`)
      .then(res => {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: [res.data] // dispatch product data in array
        });
      })
      .catch(err => {
        console.error("Error", err);
        dispatch({
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
        <p>Rating: {product.rating.rate}</p>

        <p className="product_desc">{product.description}</p>
        <p>
          Category: <b>{product.category}</b>
        </p>

        <div className="add_item_single_item">
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
