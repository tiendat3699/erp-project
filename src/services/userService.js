import { httpRequest } from '~/utils';
import store from '~/stores';
import { setUserInfo } from '~/stores/auth';

const userService = {
    getCurrentUser: async () => {
        try {
            const res = await httpRequest.get('users/me');
            store.dispatch(setUserInfo(res.data));
            return res.data;
        } catch (error) {
            if (error.response?.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ message: error.message });
            }
        }
    },

    getAll: async () => {
        try {
            const res = await httpRequest.get('users/all');
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

export default userService;
