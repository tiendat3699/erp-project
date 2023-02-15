import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response;
};

export default httpRequest;
