import { authService } from '~/services';

export const actionType = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAIL: 'SIGNUP_FAIL',
};

export const signup = (data) => {
    return async () => {
        try {
            const result = await authService.signup(data);
            return {
                type: actionType.SIGNUP_SUCCESS,
                payload: result,
            };
        } catch (e) {
            return {
                type: actionType.SIGNUP_FAIL,
                payload: { error: e },
            };
        }
    };
};
