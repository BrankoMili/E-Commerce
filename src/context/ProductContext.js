import { createContext, useReducer } from "react";
import { productReducer } from "../reducer/productReducer";

export const ProductContext = createContext();

const initialState = {
  products: [],
  loading: true,
  error: null
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
