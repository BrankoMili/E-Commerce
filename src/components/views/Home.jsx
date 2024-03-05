// import { getAllProducts } from "../../services/productService";
import { useEffect, useContext } from "react";
import instance from "../../utils/api";
import { ProductContext } from "../../context/ProductContext";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import Error from "../error/Error";

const Home = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { products, loading, error } = state;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: FETCH_PRODUCTS_REQUEST
    });
    instance
      .get("/products/3")
      .then(res => {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: res.data
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
    <section className="home_container">
      <h1>E-Commerce</h1>
      <h2>Most Popular Product </h2>
      <div className="most_popular_product_container">
        <img src={products.image} alt={products.title} />
        <p>
          <b>{products.title}</b>
        </p>
        <p>{products.description}</p>
        <p>
          <b>${products.price}</b>
        </p>
      </div>
      <button className="allproduct_btn" onClick={() => navigate("/products")}>
        Check Other Products
      </button>
    </section>
  );
};

export default Home;
