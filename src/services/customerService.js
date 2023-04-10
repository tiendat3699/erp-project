import { httpRequest } from '~/utils';

const customerService = {
    store: async (data) => {
        try {
            const res = await httpRequest.post('customers/store', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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

export default customerService;
