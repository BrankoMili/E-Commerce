import { useEffect, useContext } from "react";
import instance from "../../utils/api";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import Error from "../error/Error";

const Home = () => {
  const { productsState, setProductsState } = useContext(ProductContext);
  const { products, loading, error } = productsState;
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      setProductsState(prevState => ({
        ...prevState,
        loading: true,
        error: null
      }));
      instance
        .get("/products/3")
        .then(res => {
          setProductsState(prevState => ({
            ...prevState,
            products: [res.data],
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
  }, [products, setProductsState]);

  if (loading && products.length === 0) return <div className="loader"></div>;
  if (error) return <Error error={error} />;

  // Ako nema proizvoda, ne renderuje ništa dok se ne učitaju
  if (products.length === 0) return null;

  const featuredProduct = products[0];

  return (
    <main className="home_container">
      {/* HERO SECTION */}
      <section className="hero_section">
        <div className="hero_content">
          <h1 className="hero_title">Discover Your Next Favorite Thing.</h1>
          <p className="hero_subtitle">
            Explore our curated collection of high-quality products, designed to
            fit your lifestyle.
          </p>
          <button
            className="button_style hero_button"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* FEATURED PRODUCT SECTION */}
      <section className="featured_product_section">
        <h2 className="section_title">Our Most Popular Product</h2>
        <div
          className="featured_product_card"
          onClick={() => navigate(`/products/${featuredProduct.id}`)}
        >
          <div className="product_image_wrapper">
            <img src={featuredProduct.image} alt={featuredProduct.title} />
          </div>
          <div className="product_info">
            <h3 className="product_title">{featuredProduct.title}</h3>
            <p className="product_description">{featuredProduct.description}</p>
            <p className="product_price">${featuredProduct.price}</p>
            <button
              className="button_style view_product_button"
              onClick={e => {
                e.stopPropagation();
                navigate(`/products/${featuredProduct.id}`);
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
