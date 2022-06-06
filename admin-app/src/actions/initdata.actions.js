import axios from "../helpers/axios"
import { categoryConstants, initdataConstants, orderConstants, productConstants } from "./constants"


export const initialData = () => {
    return async dispatch => {
        const res = await axios.post('/initialdata')
        if(res.status === 200){
            const {categories, products, orders} = res.data
            dispatch({type: categoryConstants.GET_CATEGORY_SUCCESS,
                payload:{categories}
            });
            dispatch({type: productConstants.GET_PRODUCT_SUCCESS,
                payload: {products}
            })
            dispatch({type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: {orders}
            })
        }console.log(res)
    }
}