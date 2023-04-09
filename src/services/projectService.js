import { httpRequest } from '~/utils';

const projectService = {
    getAll: async () => {
        try {
            const res = await httpRequest.get('projects/all');
            return res.data;
        } catch (error) {
            if (error.response?.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ message: error.message });
            }
        }
    },

    store: async (data) => {
        try {
            const res = await httpRequest.post('projects/store', data);
            return res.data;
        } catch (error) {
            if (error.response?.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ message: error.message });
            }
        }
    },
};

export default projectService;
