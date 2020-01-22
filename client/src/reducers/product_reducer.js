import {
    GET_PRODUCT_BY_ARRIVAL,
    GET_PRODUCT_BY_SELL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP,
    GET_PRODUCT_BY_ID,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    ADD_BRAND,
    ADD_WOOD,
    CLEAR_PRODUCT_DETAIL
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCT_BY_ARRIVAL:
            return {
                ...state,
                byArrival: action.payload
            };
        case GET_PRODUCT_BY_SELL:
            return {
                ...state,
                bySell: action.payload
            };

        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload
            };
        case GET_WOODS:
            return {
                ...state,
                woods: action.payload
            };
        case GET_PRODUCTS_TO_SHOP:
            return {
                ...state,
                toShop: action.payload.articles,
                    toShopSize: action.payload.size
            };
        case ADD_PRODUCT:
            return {
                ...state,
                addProduct: action.payload
            };
        case CLEAR_PRODUCT:
            return {
                ...state,
                addProduct: action.payload
            };
        case ADD_BRAND:
            return {
                ...state,
                brands: action.payload.brands,
                    addBrand: action.payload.success
            };
        case ADD_WOOD:
            return {
                ...state,
                woods: action.payload.woods,
                    addWood: action.payload.success
            };
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                productDetail: action.payload
            };
        case CLEAR_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload
            };

        default:
            return state;
    }
}