import axios from 'axios';
import { authService } from '~/services';

//axiosIntance
let refreshReques = null;
let refreshing = false;

const axiosIntance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

//handle refresh token
axiosIntance.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (!refreshing && error.response.status === 401) {
            refreshing = true;
            refreshReques = refreshReques || authService.refresh();
            await refreshReques;
            refreshing = false;
            return axios(error.config);
        }

        return Promise.reject(error);
    },
);

const httpRequest = {
    post: async (path, options = {}) => {
        const response = await axiosIntance.post(path, options);
        return response;
    },

    get: async (path, options = {}) => {
        const response = await axiosIntance.get(path, options);
        return response;
    },

    delete: async (path, optons = {}) => {
        const response = await axiosIntance.delete(path, optons);
        return response;
    },
};

export default httpRequest;
