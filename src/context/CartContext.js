import { createContext, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

export const CartContext = createContext();

const initialProductsState = [];

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialProductsState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
