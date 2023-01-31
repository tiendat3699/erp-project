import { useForm as useFormReact } from 'react-hook-form';

const rules = {
    required: 'Không được bỏ trống',
    email: {
        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: 'Email không hợp lệ',
    },
    minLength6: {
        value: 6,
        message: 'Cần ít nhất 6 ký tự',
    },
    minLength8: {
        value: 8,
        message: 'Cần ít nhất 8 ký tự',
    },
};

function useForm() {
    return useFormReact({ mode: 'onTouched' });
}

export default useForm;
export { rules };
