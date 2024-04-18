import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import instance from "../../utils/api";
import { ProductContext } from "../../context/ProductContext";
import Error from "../error/Error";
import { ReactComponent as Add_to_cart } from "../../assets/add_to_cart.svg";
import { CartContext } from "../../context/CartContext";
import { ADD_TO_CART } from "../../constants/constants";

const SingleProduct = () => {
  const { productsState, setProductsState } = useContext(ProductContext);
  const { products, loading, error } = productsState;
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product] = products;
  const { cartDispatch } = useContext(CartContext);

  useEffect(() => {
    setProductsState(prevState => {
      return { ...prevState, loading: true, error: null };
    });
    instance
      .get(`/products/${productId}`)
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
    <>
      <div className="single_product_container">
        <h4>{product.title}</h4>
        <img src={product.image} alt={product.title} />
        <p>
          <b>Price: ${product.price}</b>
        </p>
        <p>
          Rating: {product.rating.rate} (Reviews: {product.rating.count})
        </p>

        <p className="product_desc">{product.description}</p>
        <p>
          Category: <b>{product.category}</b>
        </p>

        <div
          className="add_item_single_item"
          onClick={() => {
            cartDispatch({
              type: ADD_TO_CART, // ADD TO CART cartproductDispatch
              payload: {
                items: 1,
                product: product
              }
            });
          }}
        >
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
