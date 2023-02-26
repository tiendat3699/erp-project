export const actionType = {
    SETNAME: 'SETNAME',
};

export const setTitle = (name) => ({
    type: actionType.SETNAME,
    payload: name,
});
