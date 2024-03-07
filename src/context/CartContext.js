import { createContext, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

export const CartContext = createContext();

const initialProductsState = [];

const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    initialProductsState
  );

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
