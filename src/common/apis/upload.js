import config from "../config";
import { getState } from '../services/state';

export const getUploadUrl = () => {
    return `${config.API_SERVER}/upload`;
}

export const getUploadHeaders = () => {
    return {
        Authorization: "Bearer " + getState('userToken')
    }
}
