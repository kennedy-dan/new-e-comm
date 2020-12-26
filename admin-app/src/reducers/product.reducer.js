import { productConstants } from "../actions/constants";
const initstate = {
    products: []
}

export default (state = initstate, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
    
      
    }
    return state
}