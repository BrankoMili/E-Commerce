import {
  ADD_TO_CART,
  INCREMENT_CART_PRODUCT,
  DECREMENT_CART_PRODUCT,
  REMOVE_CART_PRODUCT,
  CLEAR_CART
} from "../constants/constants";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = state.find(item => {
        return item.product.id === action.payload.product.id;
      });

      if (!product) {
        // IF PRODUCT IS NOT IN THE CART
        return [
          ...state,
          {
            itemNumber: action.payload.items,
            product: action.payload.product
          }
        ];
      } else {
        // IF PRODUCT IS IN THE CART
        const newArray = [...state].map(item => {
          if (item.product.id === action.payload.product.id) {
            return { ...item, itemNumber: item.itemNumber + 1 };
          }
          return item;
        });

        return [...newArray];
      }
    }
    case INCREMENT_CART_PRODUCT: {
      const newArray = [...state].map(item => {
        if (item.product.id === action.payload) {
          return { ...item, itemNumber: item.itemNumber + 1 };
        }
        return item;
      });
      return [...newArray];
    }

    case DECREMENT_CART_PRODUCT: {
      const newArray = [...state].map(item => {
        if (item.product.id === action.payload) {
          if (item.itemNumber > 1) {
            return { ...item, itemNumber: item.itemNumber - 1 };
          }
        }
        return item;
      });
      return [...newArray];
    }

    case REMOVE_CART_PRODUCT: {
      const newArray = [...state].filter(item => {
        return item.product.id !== action.payload;
      });
      return [...newArray];
    }

    case CLEAR_CART: {
      return [];
    }

    default:
      return state;
  }
};
