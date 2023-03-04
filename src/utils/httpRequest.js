import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '~/services';
import { login } from '~/stores/auth';

//axiosIntance
let refreshReques = null;

const axiosIntance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

//handle refresh token
axiosIntance.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response.status === 401) {
            const dispatch = useDispatch();
            const { tokens } = useSelector((state) => state.auth);
            refreshReques = refreshReques || authService.refresh(tokens.refresToken);
            const res = await refreshReques;
            dispatch(login(res));
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
