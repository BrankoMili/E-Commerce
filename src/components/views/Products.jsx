import { useEffect, useContext } from "react";
import instance from "../../utils/api";
import { ProductContext } from "../../context/ProductContext";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from "../../constants/constants";
import Error from "../error/Error";
import ProductsList from "../products/ProductsList";

const Products = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { products, loading, error } = state;

  useEffect(() => {
    dispatch({
      type: FETCH_PRODUCTS_REQUEST
    });
    instance
      .get("/products")
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
    <div>
      <ProductsList products={products} />
    </div>
  );
};

export default Products;
