import axios from 'axios';
import {
    SITE_SERVER
} from '../components/utils';
import {
    GET_SITE_INFO,
    UPDATE_SITE_INFO
} from './types';


export const getSiteInfo = () => {
    const request = axios.get(`${SITE_SERVER}/site_data`).then(res => res.data)

    return {
        type: GET_SITE_INFO,
        payload: request
    }
}

export const updateSiteInfo = (dataToSubmit) => {
    const request = axios.post(`${SITE_SERVER}/site_data`, dataToSubmit).then(res => res.data)

    return {
        type: UPDATE_SITE_INFO,
        payload: request
    }
}