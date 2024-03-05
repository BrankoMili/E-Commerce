import { Link } from "react-router-dom";

const NavTabsItem = ({ value, path }) => {
  return (
    <div className="navtabitem_container">
      <Link to={path}>{value}</Link>
    </div>
  );
};

export default NavTabsItem;
