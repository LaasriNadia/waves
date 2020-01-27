import {
    UPDATE_SITE_INFO,
    GET_SITE_INFO
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_SITE_INFO:
            return {
                ...state,
                siteInfo: action.payload
            };
        case UPDATE_SITE_INFO:
            return {
                ...state,
                siteInfo: action.payload.siteInfo
            };

        default:
            return state;
    }
}