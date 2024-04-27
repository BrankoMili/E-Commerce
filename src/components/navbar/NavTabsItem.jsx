import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavTabsItem = ({ value, path }) => {
  const location = useLocation();

  return (
    <div
      className={
        location.pathname.includes(
          `/${value.toLowerCase().replaceAll(" ", "")}`
        )
          ? "underline_text"
          : "navtabitem_container"
      }
    >
      <Link to={path}>{value}</Link>
    </div>
  );
};

export default NavTabsItem;
