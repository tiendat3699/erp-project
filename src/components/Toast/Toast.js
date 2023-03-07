import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: true,
    closeButton: true,
    transition: Slide,
    theme: 'colored',
    delay: 100,
};

const showtoast = {
    success: (message) => toast.success(message, options),
    info: (message) => toast.info(message, options),
    warn: (message) => toast.warn(message, options),
    error: (message) => toast.error(message, options),
    loading: (message) => toast.loading(message, { ...options, closeOnClick: false, delay: undefined }),
    update: (toastId, message, type = 'success') =>
        toast.update(toastId, { ...options, render: message, type: type, isLoading: false }),
};

function ToastComponent() {
    return <ToastContainer />;
}

const toastType = toast.TYPE;

export { options, showtoast, toastType };
export default ToastComponent;
