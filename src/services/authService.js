import { httpRequest } from '~/utils';

const authService = {
    login: async (data) => {
        try {
            const res = await httpRequest.post('auth/login', data);
            if (res.data?.auth) {
                return res.data;
            }
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

    getCurrentUser: async (token) => {
        try {
            const res = await httpRequest.post('auth/currentuser', token);
            if (res.data.user) {
                return res.data;
            }
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
            const res = await httpRequest.get('auth/refresh');
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
