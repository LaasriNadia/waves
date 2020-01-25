import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_FROM_CART_USER,
    UPDATE_PROFILE_USER,
    CLEAR_UPDATE_PROFILE_USER
} from '../actions/types'





export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                registerSuccess: action.payload
            };
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload
            };
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            };

        case LOGOUT_USER:
            return {
                ...state
            };
        case ADD_TO_CART_USER:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            };
        case REMOVE_FROM_CART_USER:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                    userData: {
                        ...state.userData,
                        cart: action.payload.cart
                    }
            };
        case GET_CART_ITEMS_USER:
            return {
                ...state,
                cartDetail: action.payload
            };
        case UPDATE_PROFILE_USER:
            return {
                ...state,
                updateProfile: action.payload
            };
        case CLEAR_UPDATE_PROFILE_USER:
            return {
                ...state,
                updateProfile: action.payload
            }
            default:
                return state;
    }
}