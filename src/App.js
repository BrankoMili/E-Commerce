import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/views/Home";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/views/Products";
import Cart from "./components/views/Cart";
import ContactUs from "./components/views/ContactUs";
import PrivacyPolicy from "./components/views/PrivacyPolicy";
import TermsOfService from "./components/views/TermsOfService";
import PageNotFound from "./components/views/PageNotFound";
import ProductContextProvider from "./context/ProductContext";
import CartContextProvider from "./context/CartContext";
import Footer from "./components/views/Footer";
import SingleProduct from "./components/products/SingleProduct";

function App() {
  return (
    <div className="App">
      <ProductContextProvider>
        <CartContextProvider>
          <Router>
            <Navbar />
            <div className="main">
              <Routes>
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/termsofservice" element={<TermsOfService />} />
                <Route
                  path="/products/:productId"
                  element={<SingleProduct />}
                />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </CartContextProvider>
      </ProductContextProvider>
    </div>
  );
}

export default App;
