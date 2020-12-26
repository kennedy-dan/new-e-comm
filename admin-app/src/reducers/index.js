import { combineReducers } from 'redux'
import authReducer from './auth.reducers';
import userReducer from './user.reducers';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';
import pageReducer from './page.reducer'


const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    page: pageReducer,
    order: orderReducer,
});

export default reducer