import * as httpRequest from '~/utils/httpRequest';

export const login = async (data) => {
    try {
        const res = httpRequest.post('auth/login', data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const signup = async (data) => {
    try {
        const res = httpRequest.post('auth/signup', data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
