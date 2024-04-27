import { createContext, useReducer, useEffect } from "react";
import { cartReducer } from "../reducer/cartReducer";

export const CartContext = createContext();

// localStorage stores shopping cart list in the browser
const getLocalStorage = () => {
  let products = localStorage.getItem("products");
  if (products) {
    return JSON.parse(localStorage.getItem("products"));
  } else {
    return [];
  }
};

const initialProductsState = getLocalStorage();

const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    initialProductsState
  );

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartState));
  }, [cartState]);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
