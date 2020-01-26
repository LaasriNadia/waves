import {
    UPDATE_SITE_INFO
} from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case UPDATE_SITE_INFO:
            return {
                ...state,
                siteInfo: action.payload
            }

            default:
                return state
    }
}