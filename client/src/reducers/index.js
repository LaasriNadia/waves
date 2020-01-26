import {
    combineReducers
} from 'redux';
import user from './user_reducer'
import product from './product_reducer'
import site from './site_reducer'
const rootReducer = combineReducers({
    user,
    product,
    site
})

export default rootReducer;