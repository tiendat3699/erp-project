import { actionType } from '~/actions/pageTitleAction';

const pageTitleReducer = (state = '', action) => {
    switch (action.type) {
        case actionType.SETNAME:
            return action.payload;
        default:
            return state;
    }
};

export default pageTitleReducer;
