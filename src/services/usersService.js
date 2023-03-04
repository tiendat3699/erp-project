import { httpRequest } from '~/utils';
import store from '~/stores';
import { setUserInfo } from '~/stores/auth';

const usersService = {
    getCurrentUser: async () => {
        try {
            const res = await httpRequest.get('users/me');
            if (res.data.user) {
                store.dispatch(setUserInfo(res.data));
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
};

export default usersService;
