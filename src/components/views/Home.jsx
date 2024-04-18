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
    setProductsState(prevState => {
      return { ...prevState, loading: true, error: null };
    });
    instance
      .get("/products/3")
      .then(res => {
        setProductsState(prevState => {
          return {
            ...prevState,
            products: [res.data],
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
    <section className="home_container">
      <h1>eCommerce</h1>
      <h2>Most Popular Product </h2>
      <div
        className="most_popular_product_container"
        onClick={() => {
          navigate("/products/3");
        }}
      >
        <img src={products[0].image} alt={products[0].title} />
        <p>
          <b>{products[0].title}</b>
        </p>
        <p>{products[0].description}</p>
        <p>
          <b>${products[0].price}</b>
        </p>
      </div>
      <button className="button_style" onClick={() => navigate("/products")}>
        Check Other Products
      </button>
    </section>
  );
};

export default Home;
