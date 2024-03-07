import CartListItem from "./CartListItem";

const CartList = ({ cartProducts }) => {
  return (
    <>
      {cartProducts.length !== 0 && (
        <div>
          {cartProducts.map(cartProduct => {
            return (
              <CartListItem
                key={cartProduct.product.id}
                cartProduct={cartProduct.product}
                itemNumber={cartProduct.itemNumber}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CartList;
