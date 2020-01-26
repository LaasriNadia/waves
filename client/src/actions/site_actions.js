import axios from 'axios';
import {
    SITE_SERVER
} from '../components/utils';
import {
    UPDATE_SITE_INFO
} from './types';


export const updateSiteInfo = () => {
    const request = axios.get(`${SITE_SERVER}/getSiteData`).then(res => res.data)

    return {
        type: UPDATE_SITE_INFO,
        payload: request
    }
}