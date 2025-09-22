import pageNotFoundImage from "../../assets/pagenotfound.jpg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page_not_found_container">
      <div className="pnf_content">
        <img
          className="pnf_image"
          src={pageNotFoundImage}
          alt="Illustration of a lost astronaut"
        />
        <h1 className="pnf_title">404 - Page Not Found</h1>
        <p className="pnf_text">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <button className="button_style" onClick={() => navigate("/")}>
          Go To Homepage
        </button>
        <a
          className="pnf_attribution"
          href="https://www.vecteezy.com/free-vector/404-page"
        >
          404 Page Vectors by Vecteezy
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
