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
import Footer from "./components/views/Footer";

function App() {
  return (
    <>
      <ProductContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </ProductContextProvider>
    </>
  );
}

export default App;
