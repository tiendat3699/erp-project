import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useForm } from '~/hooks';
import { authService } from '~/services';
import { login } from '~/store/auth';
import { TextField, Button, Checkbox } from '~/components/Input';
import ToastComponent, { showtoast } from '~/components/Toast/';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [navigate, success]);

    const onSubmit = (data) => {
        if (disabled) return;
        const fetch = async () => {
            const toastId = showtoast.loading('Đang đăng nhập...');
            setDisabled(true);
            const res = await authService.login(data);
            if (res.isError) {
                showtoast.update(toastId, res.message, 'error');
            } else {
                showtoast.update(toastId, res.message, 'success');
                dispatch(login(res));
                setSuccess(true);
            }
            setDisabled(false);
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
                    {...register('username', { required: rules.required })}
                    name="username"
                    message={errors.username?.message}
                    placeholder="Tên tài khoản"
                />
                <TextField
                    {...register('password', { required: rules.required })}
                    name="password"
                    placeholder="Mật khẩu"
                    message={errors.password?.message}
                    hideBtn
                    hidedfield
                />
                <div className={cx('space-btw-bottom')}>
                    <Checkbox {...register('rememberme')} name="rememberme" labelRight="Ghi nhớ" />
                    <Link to="/forgetpass">Quên mật khẩu</Link>
                </div>
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
