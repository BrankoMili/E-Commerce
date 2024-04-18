import { createContext, useState } from "react";

export const ProductContext = createContext();

const initialState = {
  products: [],
  productsConstant: [],
  loading: true,
  error: null
};

const ProductContextProvider = ({ children }) => {
  const [productsState, setProductsState] = useState(initialState);

  return (
    <ProductContext.Provider value={{ productsState, setProductsState }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
