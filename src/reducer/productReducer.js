import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SORT_BY_NAME,
  SORT_BY_PRICE_HIGH_TO_LOW,
  SORT_BY_PRICE_LOW_TO_HIGH,
  SORT_BY_RATING_HIGH_TO_LOW,
  SORT_BY_RATING_LOW_TO_HIGH,
  SET_PRODUCT_CATEGORY,
} from "../constants/constants";

export const productReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      const sortedArray = action.payload.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      return {
        ...state,
        products: sortedArray,
        loading: false,
        error: null,
        productsConstant: action.payload,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SORT_BY_PRICE_LOW_TO_HIGH: {
      const sortedArray = [...state.products].sort(function (a, b) {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });

      return {
        ...state,
        products: sortedArray,
      };
    }

    case SORT_BY_PRICE_HIGH_TO_LOW: {
      const sortedArray = [...state.products].sort(function (a, b) {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });

      return {
        ...state,
        products: sortedArray,
      };
    }

    case SORT_BY_RATING_LOW_TO_HIGH: {
      const sortedArray = [...state.products].sort(function (a, b) {
        if (a.rating.rate < b.rating.rate) {
          return -1;
        }
        if (a.rating.rate > b.rating.rate) {
          return 1;
        }
        return 0;
      });

      return {
        ...state,
        products: sortedArray,
      };
    }

    case SORT_BY_RATING_HIGH_TO_LOW: {
      const sortedArray = [...state.products].sort(function (a, b) {
        if (a.rating.rate > b.rating.rate) {
          return -1;
        }
        if (a.rating.rate < b.rating.rate) {
          return 1;
        }
        return 0;
      });

      return {
        ...state,
        products: sortedArray,
      };
    }

    case SORT_BY_NAME: {
      const sortedArray = [...state.products].sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      return {
        ...state,
        products: sortedArray,
      };
    }

    case SET_PRODUCT_CATEGORY: {
      if (action.payload === "all_categories") {
        return {
          ...state,
          products: [...state.productsConstant],
        };
      }

      const stateProductsCopy = [...state.productsConstant];
      const categorizedArray = stateProductsCopy.filter((product) => {
        return product.category === action.payload;
      });

      return {
        ...state,
        products: categorizedArray,
      };
    }

    default:
      return state;
  }
};
