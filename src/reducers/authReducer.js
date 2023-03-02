import { actionType } from '~/actions/authAction';

const initState = {
    isLoggedIn: false,
    user: {},
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SIGNUP_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case actionType.SIGNUP_FAIL:
            return {
                ...state,
                ...action.payload,
            };
        case actionType.LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                user: action.payload,
            };
        case actionType.LOGIN_FAIL:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;
