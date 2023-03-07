import axios from 'axios';
import { authService } from '~/services';
import store from '~/stores';

//axiosIntance
let refreshRequest = null;

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

//handle refresh token
axiosInstance.interceptors.request.use(
    (req) => {
        const token = store.getState().auth.tokens;
        if (token) {
            req.headers['x-access-token'] = token.accessToken;
            req.headers['x-refresh-token'] = token.refreshToken;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const res = error.response;
        if (res?.status === 401 && res.data.error_code === 1 && !error.config._retry) {
            error.config._retry = true;
            refreshRequest = refreshRequest ? refreshRequest : authService.refresh();
            await refreshRequest;
            refreshRequest = null;
            return axiosInstance(error.config);
        }

        return Promise.reject(error);
    },
);

const httpRequest = {
    post: async (path, options = {}) => {
        const response = await axiosInstance.post(path, options);
        return response;
    },

    get: async (path, options = {}) => {
        const response = await axiosInstance.get(path, options);
        return response;
    },

    delete: async (path, optons = {}) => {
        const response = await axiosInstance.delete(path, optons);
        return response;
    },
};

export default httpRequest;
