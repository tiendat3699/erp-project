import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
};

const success = (message) => toast.success(message, options);
const info = (message) => toast.info(message, options);
const warn = (message) => toast.warn(message, options);
const error = (message) => toast.error(message, options);
const loading = (message) => toast.loading(message, options);
const update = (toastId, message, type = 'success') =>
    toast.update(toastId, { render: message, type: type, isLoading: false, ...options });

function ToastComponent() {
    return <ToastContainer />;
}

export { options, success, info, warn, error, loading, update };
export default ToastComponent;
