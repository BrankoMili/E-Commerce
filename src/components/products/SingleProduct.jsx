import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import instance from "../../utils/api";
import { ProductContext } from "../../context/ProductContext";
import Error from "../error/Error";
import { CartContext } from "../../context/CartContext";
import { ADD_TO_CART } from "../../constants/constants";

const SingleProduct = () => {
  const { setProductsState } = useContext(ProductContext);
  const { cartDispatch } = useContext(CartContext);
  const { productId } = useParams();

  // Lokalno stanje za upravljanje podacima i učitavanjem
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Resetuj stanje pre svakog novog dohvatanja
    setProduct(null);
    setLoading(true);
    setError(null);

    instance
      .get(`/products/${productId}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.error("Error fetching single product:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        setProductsState(prevState => ({
          ...prevState,
          loading: false,
          error: null
        }));
      });
  }, [productId, setProductsState]); // useEffect se ponovo pokreće ako se promeni ID proizvoda

  const handleAddToCart = () => {
    if (product) {
      cartDispatch({
        type: ADD_TO_CART,
        payload: {
          items: 1,
          product: product
        }
      });
    }
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <Error error={error} />;

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="single_product_page_container">
      <div className="back_to_products_link">
        <Link to="/products">
          <i className="fas fa-arrow-left"></i> Back to Products
        </Link>
      </div>

      <div className="product_page_layout">
        {/* LEVA KOLONA  */}
        <div className="product_image_column">
          <img src={product.image} alt={product.title} />
        </div>

        {/* DESNA KOLONA */}
        <div className="product_details_column">
          <span className="product_category">{product.category}</span>
          <h1 className="product_main_title">{product.title}</h1>

          <div className="product_rating">
            <span>⭐ {product.rating.rate.toFixed(1)}</span>
            <span className="review_count">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="product_main_price">${product.price.toFixed(2)}</p>

          <p className="product_main_description">{product.description}</p>

          <div className="cta_section">
            <button
              className="button_style add_to_cart_main_btn"
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
