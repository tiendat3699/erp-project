import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    limit: 5,
    transition: Slide,
    theme: 'colored',
};

const showtoast = {
    success: (message) => toast.success(message, options),
    info: (message) => toast.info(message, options),
    warn: (message) => toast.warn(message, options),
    error: (message) => toast.error(message, options),
    loading: (message) => toast.loading(message, { ...options, closeOnClick: false }),
    update: (toastId, message, type = 'success') =>
        toast.update(toastId, { render: message, type: type, isLoading: false, ...options }),
};

function ToastComponent() {
    return <ToastContainer />;
}

export { options, showtoast };
export default ToastComponent;
