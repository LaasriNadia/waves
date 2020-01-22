import {
    combineReducers
} from 'redux';
import user from './user_reducer'
import product from './product_reducer'
const rootReducer = combineReducers({
    user,
    product
})

export default rootReducer;