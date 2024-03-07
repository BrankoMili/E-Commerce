import { useEffect, useContext, useState } from "react";
import instance from "../../utils/api";
import { ProductContext } from "../../context/ProductContext";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SORT_BY_NAME,
  SORT_BY_PRICE_LOW_TO_HIGH,
  SORT_BY_PRICE_HIGH_TO_LOW,
  SORT_BY_RATING_LOW_TO_HIGH,
  SORT_BY_RATING_HIGH_TO_LOW,
  SET_PRODUCT_CATEGORY,
  SHOW_ALL_ITEMS
} from "../../constants/constants";
import Error from "../error/Error";
import ProductsList from "../products/ProductsList";
import { ReactComponent as Close_btn } from "../../assets/close_btn.svg";

const Products = () => {
  const { productState, productDispatch } = useContext(ProductContext);
  const { products, loading, error } = productState;
  const [sortBy, setSortBy] = useState(SORT_BY_NAME);
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const [category, setCategory] = useState(undefined);

  useEffect(() => {
    productDispatch({
      type: sortBy
    });
  }, [sortBy, showCloseBtn, category]);

  useEffect(() => {
    productDispatch({
      type: FETCH_PRODUCTS_REQUEST
    });
    instance
      .get("/products")
      .then(res => {
        productDispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: res.data
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
    <main className="products_container">
      <div className="sort_category_container">
        <select
          onChange={e => {
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

        <div>
          <form
            onChange={e => {
              setCategory(e.target.value);
            }}
            onClick={e => {
              if (!showCloseBtn) {
                setShowCloseBtn(true);
              }

              if (e.target.type === "radio") {
                productDispatch({
                  type: SET_PRODUCT_CATEGORY,
                  payload: e.target.value
                });
              }
            }}
          >
            <label>
              <input type="radio" value="women's clothing" name="categories" />{" "}
              Women's Clothing
            </label>
            <label>
              <input type="radio" value="men's clothing" name="categories" />{" "}
              Men's Clothing
            </label>
            <label>
              <input type="radio" value="electronics" name="categories" />{" "}
              Electronics
            </label>
            <label>
              <input type="radio" value="jewelery" name="categories" /> Jewelery
            </label>

            <button
              type="reset"
              onClick={() => {
                setShowCloseBtn(false);
                productDispatch({
                  type: SHOW_ALL_ITEMS
                });
                setCategory(undefined);
              }}
              className="close_btn_container"
            >
              {showCloseBtn && <Close_btn className="close_btn" />}
            </button>
          </form>
        </div>
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
