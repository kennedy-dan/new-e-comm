import { combineReducers } from 'redux'
import categoryReducer from './category.reducer';
import authReducer from './auth.reducer';

import productReducer from './product.reducers';




const reducer = combineReducers({
  
    category: categoryReducer,
    product: productReducer,
    auth: authReducer
    
});

export default reducer