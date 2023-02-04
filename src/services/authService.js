import { httpRequest } from '~/utils';

const authService = {
    login: async (data) => {
        try {
            const res = await httpRequest.post('auth/login', data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },

    signup: async (data) => {
        try {
            const res = await httpRequest.post('auth/signup', data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
};

export default authService;
