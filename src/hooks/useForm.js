import { useForm as useFormHook } from 'react-hook-form';

function useForm() {
    const rules = {
        required: 'Không được bỏ trống',
        email: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Email không hợp lệ',
        },
        minLength: (value) => ({
            value: value,
            message: `Cần ít nhất ${value} ký tự`,
        }),
        matchCheck: (value1, value2) => value1 === value2 || 'Mật khẩu nhập lại chưa đúng',
    };

    const useFormReturn = useFormHook({ mode: 'onTouched' });
    return { ...useFormReturn, rules };
}

export default useForm;
