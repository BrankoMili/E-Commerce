import React from "react";

const ProductsListItem = ({ product }) => {
  return (
    <div className="productlistitem_container">
      <p>{product.title}</p>
      <img src={product.image} alt="product_image" />
      <p>
        <b>${product.price}</b>
      </p>
    </div>
  );
};

export default ProductsListItem;
