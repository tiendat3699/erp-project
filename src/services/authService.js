import { httpRequest } from '~/utils';

const authService = {
    login: async (data) => {
        const res = await httpRequest.post('auth/login', data);
        return res.data;
    },

    signup: async (data) => {
        const res = await httpRequest.post('auth/signup', data);
        return res.data;
    },
};

export default authService;
