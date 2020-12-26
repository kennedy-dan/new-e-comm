import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  productsByPrice: {
    under50k: [],
    under100k: [],
    under200k: [],
    under800k: [],
  },
  pageRequest: false,
  page: {},
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };

      break;
    case productConstants.GET_PRODUCT_PAGE_REQUEST:
      state = {
        ...state,
        // page: action.payload.page,
        pageRequest: true,
      };

      break;
    case productConstants.GET_PRODUCT_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };

      break;
    case productConstants.GET_PRODUCT_PAGE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        pageRequest: false,
      };

      break;
  }
  return state;
};
