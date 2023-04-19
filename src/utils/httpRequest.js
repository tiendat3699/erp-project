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
    post: async (path, options = {}, config = {}) => {
        const response = await axiosInstance.post(path, options, config);
        return response;
    },

    get: async (path, options = {}, config = {}) => {
        const response = await axiosInstance.get(path, options, config);
        return response;
    },

    put: async (path, options = {}, config = {}) => {
        const response = await axiosInstance.put(path, options, config);
        return response;
    },

    delete: async (path, options = {}, config = {}) => {
        const response = await axiosInstance.delete(path, options, config);
        return response;
    },
};

export default httpRequest;
