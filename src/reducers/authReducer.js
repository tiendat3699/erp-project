import { actionType } from '~/actions/authAction';

const initState = {
    isLoggedIn: false,
    user: {
        fullname: '',
        username: '',
        email: '',
    },
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SIGNUP_FAIL:
            return {
                isLoggedIn: false,
                ...state,
            };
        default:
            return state;
    }
};

export default authReducer;
