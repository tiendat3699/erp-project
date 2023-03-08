import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '~/hooks';
import { authService } from '~/services';
import { TextField, Button, Checkbox } from '~/components/Input';
import ToastComponent, { showtoast, toastType } from '~/components/Toast/';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function Login() {
    const {
        rules,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [disabled, setDisabled] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 1000);
        }
    }, [navigate, success]);

    const onSubmit = (data) => {
        if (disabled) return;
        const fetch = async () => {
            const toastId = showtoast.loading('Đang đăng nhập...');
            try {
                setDisabled(true);
                const res = await authService.login(data);
                showtoast.update(toastId, res.message, toastType.SUCCESS);
                setSuccess(true);
            } catch (error) {
                showtoast.update(toastId, error.message, toastType.WARNING);
            } finally {
                setDisabled(false);
            }
        };

        fetch();
    };

    return (
        <div className={cx('container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={cx('title')}>Đăng nhập</h1>
                <p className={cx('hint-text')}>
                    Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
                </p>
                <TextField
                    register={register('username', { required: rules.required })}
                    message={errors.username?.message}
                    placeholder="Tên tài khoản"
                />
                <TextField
                    register={register('password', { required: rules.required })}
                    placeholder="Mật khẩu"
                    message={errors.password?.message}
                    hideBtn
                    hidedfield
                />
                <div className={cx('footer')}>
                    <Button disabled={disabled} className={cx('submit-btn')} rounded primary>
                        Đăng nhập
                    </Button>
                </div>
            </form>
            <ToastComponent />
        </div>
    );
}

export default Login;
