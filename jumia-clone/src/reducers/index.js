import { combineReducers } from 'redux'
import categoryReducer from './category.reducer';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer'
import productReducer from './product.reducers';
import userReducer from './user.reducer';





const reducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer
});

export default reducer