import "./productsList.css";
import ProductsListItem from "./ProductsListItem";

const ProductsList = ({ products }) => {
  return (
    <div className="productslist_container">
      {products.map(product => (
        <ProductsListItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
