import { useEffect, useContext, useState } from "react";
import instance from "../../utils/api";
import { ProductContext } from "../../context/ProductContext";
import {
  SORT_BY_NAME,
  SORT_BY_PRICE_LOW_TO_HIGH,
  SORT_BY_PRICE_HIGH_TO_LOW,
  SORT_BY_RATING_LOW_TO_HIGH,
  SORT_BY_RATING_HIGH_TO_LOW
} from "../../constants/constants";
import Error from "../error/Error";
import ProductsList from "../products/ProductsList";
import {
  changeCategory,
  changeSortItemsBy,
  searchProducts
} from "../productsFunctionality/actions";

const Products = () => {
  const { productsState, setProductsState } = useContext(ProductContext);
  const { products, productsConstant, loading, error } = productsState;
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [order, setOrder] = useState(SORT_BY_NAME);

  useEffect(() => {
    setProductsState(prevState => {
      return { ...prevState, loading: true, error: null };
    });
    instance
      .get("/products")
      .then(res => {
        setProductsState(prevState => {
          return {
            ...prevState,
            products: changeSortItemsBy(SORT_BY_NAME, res.data),
            productsConstant: res.data,
            loading: false,
            error: null
          };
        });
      })
      .catch(err => {
        console.error("Error", err);
        setProductsState(prevState => {
          return {
            ...prevState,
            loading: false,
            error: err
          };
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
            setProductsState(prevState => {
              return {
                ...prevState,
                products: changeSortItemsBy(e.target.value, products)
              };
            });
            setOrder(e.target.value);
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
          onChange={e => {
            setProductsState(prevState => {
              return {
                ...prevState,
                products: changeCategory(
                  e.target.value,
                  productsConstant,
                  searchQuery,
                  order
                )
              };
            });

            setCategory(e.target.value);
          }}
        >
          <option value="All Categories">All Categories</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search Products"
        className="search_container"
        onChange={e => {
          setSearchQuery(e.target.value);
          setProductsState(prevState => {
            return {
              ...prevState,
              products: searchProducts(
                e.target.value,
                productsConstant,
                category
              )
            };
          });
        }}
      />

      <h3>
        {category.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
          letter.toUpperCase()
        )}
      </h3>

      <ProductsList products={products} />
    </main>
  );
};

export default Products;
