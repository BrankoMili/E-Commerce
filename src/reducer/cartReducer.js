import { ADD_TO_CART } from "../constants/constants";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [
        ...state,
        {
          itemNumber: action.payload.items,
          product: action.payload.product
        }
      ];

    default:
      return state;
  }
};
