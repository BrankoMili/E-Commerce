import {
  SORT_BY_NAME,
  SORT_BY_PRICE_HIGH_TO_LOW,
  SORT_BY_PRICE_LOW_TO_HIGH,
  SORT_BY_RATING_HIGH_TO_LOW,
  SORT_BY_RATING_LOW_TO_HIGH
} from "../../constants/constants";

// SORT PRODUCTS BY DIFFERENT PARAMETERS
export const changeSortItemsBy = (sortBy, products) => {
  let sortedArray = [];

  switch (sortBy) {
    case SORT_BY_PRICE_LOW_TO_HIGH: {
      sortedArray = [...products].sort(function (a, b) {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
      break;
    }

    case SORT_BY_PRICE_HIGH_TO_LOW: {
      sortedArray = [...products].sort(function (a, b) {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
      break;
    }

    case SORT_BY_RATING_LOW_TO_HIGH: {
      sortedArray = [...products].sort(function (a, b) {
        if (a.rating.rate < b.rating.rate) {
          return -1;
        }
        if (a.rating.rate > b.rating.rate) {
          return 1;
        }
        return 0;
      });
      break;
    }

    case SORT_BY_RATING_HIGH_TO_LOW: {
      sortedArray = [...products].sort(function (a, b) {
        if (a.rating.rate > b.rating.rate) {
          return -1;
        }
        if (a.rating.rate < b.rating.rate) {
          return 1;
        }
        return 0;
      });
      break;
    }

    case SORT_BY_NAME: {
      sortedArray = [...products].sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      break;
    }
    default:
      break;
  }

  return sortedArray;
};

// SHOW SELECTED CATEGORY OF PRODUCTS
export const changeCategory = (
  category,
  productsConstant,
  searchQuery,
  order
) => {
  let categorizedArray = productsConstant;

  if (category !== "All Categories") {
    categorizedArray = productsConstant.filter(product => {
      return product.category === category;
    });
  }

  if (searchQuery) {
    categorizedArray = categorizedArray.filter(product => {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  categorizedArray = changeSortItemsBy(order, categorizedArray);

  return categorizedArray;
};

// SEARCH PRODUCTS BY NAME
export const searchProducts = (
  searchQuery,
  productsConstant,
  currentCategory
) => {
  const searchResults = productsConstant.filter(product => {
    if (
      product.category === currentCategory ||
      currentCategory === "All Categories"
    ) {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return searchResults;
};
