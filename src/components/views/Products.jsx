import { useEffect, useContext, useState } from "react";
import instance from "../../utils/api";
import { ProductContext } from "../../context/ProductContext";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SEARCH_INPUT,
  SORT_BY_NAME,
  SORT_BY_PRICE_LOW_TO_HIGH,
  SORT_BY_PRICE_HIGH_TO_LOW,
  SORT_BY_RATING_LOW_TO_HIGH,
  SORT_BY_RATING_HIGH_TO_LOW,
  SET_PRODUCT_CATEGORY,
} from "../../constants/constants";
import Error from "../error/Error";
import ProductsList from "../products/ProductsList";

const Products = () => {
  const { productState, productDispatch } = useContext(ProductContext);
  const { products, loading, error } = productState;
  const [sortBy, setSortBy] = useState(SORT_BY_NAME);
  const [category, setCategory] = useState(undefined);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    productDispatch({
      type: sortBy,
    });
  }, [sortBy, category]);

  useEffect(() => {
    productDispatch({
      type: FETCH_PRODUCTS_REQUEST,
    });
    instance
      .get("/products")
      .then((res) => {
        productDispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error("Error", err);
        productDispatch({
          type: FETCH_PRODUCTS_FAILURE,
          payload: err,
        });
      });
  }, []);

  if (loading) return <div className="loader"></div>;
  if (error) return <Error error={error} />;
  return (
    <main className="products_container">
      <input
        type="text"
        placeholder="Search product name"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);

          productDispatch({
            type: SEARCH_INPUT,
            payload: e.target.value,
          });
        }}
      />
      <div className="sort_category_container">
        <select
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value={SORT_BY_NAME} defaultValue>
            Sort by name ascending
          </option>
          <option value={SORT_BY_PRICE_LOW_TO_HIGH}>
            Sort by price low to high
          </option>
          <option value={SORT_BY_PRICE_HIGH_TO_LOW}>
            Sort by price high to low
          </option>
          <option value={SORT_BY_RATING_LOW_TO_HIGH}>
            Sort by rating low to high
          </option>
          <option value={SORT_BY_RATING_HIGH_TO_LOW}>
            Sort by rating high to low
          </option>
        </select>
        <p>Sort by category </p>
        <select
          onChange={(e) => {
            setCategory(e.target.value);

            productDispatch({
              type: SET_PRODUCT_CATEGORY,
              payload: e.target.value,
            });
          }}
        >
          <option value="all_categories">All Categories</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>

      <h3>
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "All Products"}
      </h3>

      <ProductsList products={products} />
    </main>
  );
};

export default Products;
