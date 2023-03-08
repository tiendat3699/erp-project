import { useForm as useFormHook, Controller } from 'react-hook-form';

function useForm() {
    const rules = {
        required: 'Không được bỏ trống',
        email: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Email không hợp lệ',
        },
        username: {
            value: /^[a-z0-9_-]*$/,
            message: 'Tên tài khoản chỉ nên chứa chữ cái không dấu và số hoặc dấu "_"',
        },
        minLength: (value) => ({
            value: value,
            message: `Cần ít nhất ${value} ký tự`,
        }),
        maxLength: (value) => ({
            value: value,
            message: `Tối đa ${value} ký tự`,
        }),
        matchCheck: (value1, value2) => value1 === value2 || 'Mật khẩu nhập lại chưa đúng',
    };

    const useFormReturn = useFormHook({ mode: 'onTouched' });
    return { ...useFormReturn, rules };
}

export default useForm;
