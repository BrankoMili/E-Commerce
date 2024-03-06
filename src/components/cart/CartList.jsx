import CartListItem from "./CartListItem";

const CartList = ({ cartProducts }) => {
  return (
    <>
      {cartProducts.length !== 0 && (
        <div>
          {cartProducts.map(cartProduct => {
            return (
              <CartListItem
                cartProduct={cartProduct.product}
                key={cartProduct.product.id}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CartList;
