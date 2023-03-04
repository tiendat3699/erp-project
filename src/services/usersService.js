import { httpRequest } from '~/utils';

const usersService = {
    getCurrentUser: async (token) => {
        try {
            const res = await httpRequest.get('users/me', { headers: { 'x-access-token': token } });
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
};

export default usersService;
