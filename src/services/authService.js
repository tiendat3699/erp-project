import { httpRequest } from '~/utils';
import store from '~/stores';
import { login, logOut } from '~/stores/auth';

const authService = {
    login: async (data) => {
        try {
            const res = await httpRequest.post('auth/login', data);
            store.dispatch(login(res.data));
            return res.data;
        } catch (error) {
            if (error.response?.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ message: error.message });
            }
        }
    },

    signup: async (data) => {
        try {
            const res = await httpRequest.post('auth/signup', data);
            return res.data;
        } catch (error) {
            if (error.response?.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ message: error.message });
            }
        }
    },

    logOut: async () => {
        try {
            const res = await httpRequest.delete('auth/logout');
            store.dispatch(logOut());
            return res.data;
        } catch (error) {
            if (error.response?.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ message: error.message });
            }
        }
    },

    refresh: async () => {
        try {
            const refreshToken = store.getState().auth.tokens.refreshToken;
            const res = await httpRequest.post('auth/refresh', { refreshToken: refreshToken });
            store.dispatch(login(res.data));
            return res.data;
        } catch (error) {
            if (error.response?.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ message: error.message });
            }
        }
    },
};

export default authService;
