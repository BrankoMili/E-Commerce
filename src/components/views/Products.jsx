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
  const [filtersOpen, setFiltersOpen] = useState(false); // State za mobilne filtere

  useEffect(() => {
    // Dohvatamo proizvode samo ako nisu već u state-u
    if (productsConstant.length === 0) {
      setProductsState(prevState => ({
        ...prevState,
        loading: true,
        error: null
      }));
      instance
        .get("/products")
        .then(res => {
          setProductsState(prevState => ({
            ...prevState,
            products: changeSortItemsBy(SORT_BY_NAME, res.data),
            productsConstant: res.data,
            loading: false,
            error: null
          }));
        })
        .catch(err => {
          console.error("Error", err);
          setProductsState(prevState => ({
            ...prevState,
            loading: false,
            error: err
          }));
        });
    }
  }, [productsConstant, setProductsState]);

  const onChangeCategory = e => {
    const newCategory = e.target.value;
    setProductsState(prevState => ({
      ...prevState,
      products: changeCategory(
        newCategory,
        productsConstant,
        searchQuery,
        order
      )
    }));
    setCategory(newCategory);
  };

  const categories = [
    "All Categories",
    "women's clothing",
    "men's clothing",
    "jewelery",
    "electronics"
  ];

  if (loading && productsConstant.length === 0)
    return <div className="loader"></div>;
  if (error) return <Error error={error} />;

  return (
    <div className="products_page_container">
      {/* SIDEBAR SA FILTERIMA */}
      <aside className={`filters_sidebar ${filtersOpen ? "active" : ""}`}>
        <div className="filters_header">
          <h3>Filters</h3>
          <button
            className="close_filters_btn"
            onClick={() => setFiltersOpen(false)}
          >
            &times;
          </button>
        </div>

        <h4>Category</h4>
        <div className="categories_container">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category_button ${category === cat ? "active" : ""}`}
              value={cat}
              onClick={onChangeCategory}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* GLAVNI DEO SA PROIZVODIMA */}
      <main className="products_main_content">
        <div className="toolbar">
          <button
            className="mobile_filters_btn"
            onClick={() => setFiltersOpen(true)}
          >
            <i className="fas fa-filter"></i> Filters
          </button>

          <input
            type="text"
            placeholder="Search Products..."
            className="search_input"
            onChange={e => {
              setSearchQuery(e.target.value);
              setProductsState(prevState => ({
                ...prevState,
                products: searchProducts(
                  e.target.value,
                  productsConstant,
                  category
                )
              }));
            }}
          />

          <select
            className="sort_select"
            onChange={e => {
              setOrder(e.target.value);
              setProductsState(prevState => ({
                ...prevState,
                products: changeSortItemsBy(e.target.value, products)
              }));
            }}
          >
            <option value={SORT_BY_NAME}>Name</option>
            <option value={SORT_BY_PRICE_LOW_TO_HIGH}>
              Price: Low to High
            </option>
            <option value={SORT_BY_PRICE_HIGH_TO_LOW}>
              Price: High to Low
            </option>
            <option value={SORT_BY_RATING_HIGH_TO_LOW}>
              Rating: High to Low
            </option>
            <option value={SORT_BY_RATING_LOW_TO_HIGH}>
              Rating: Low to High
            </option>
          </select>
        </div>

        <h2 className="current_category_title">{category}</h2>

        {products.length > 0 ? (
          <ProductsList products={products} />
        ) : (
          <p className="no_products_found">
            No products found matching your criteria.
          </p>
        )}
      </main>
    </div>
  );
};

export default Products;
