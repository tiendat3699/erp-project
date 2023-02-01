import { useForm as useFormHook } from 'react-hook-form';

const rules = {
    required: 'Không được bỏ trống',
    email: {
        value: /^\S+@\S+\.\S+$/,
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
    return useFormHook({ mode: 'onTouched' });
}

export default useForm;
export { rules };
