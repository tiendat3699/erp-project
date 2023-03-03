import axios from 'axios';

// const httpRequest = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
//     withCredentials: true,
// });

const axiosIntance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

const httpRequest = {
    post: async (path, options = {}) => {
        const response = await axiosIntance.post(path, options);
        return response;
    },

    get: async (path, options = {}) => {
        const response = await axiosIntance.get(path, options);
        return response;
    },

    delete: async (path, optons = {}) => {
        const response = await axiosIntance.delete(path, optons);
        return response;
    },
};

export default httpRequest;
