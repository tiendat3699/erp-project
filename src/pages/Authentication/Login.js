import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { useForm } from '~/hooks';
import { login } from '~/actions/authAction';
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    const onSubmit = (data) => {
        if (disabled) return;
        const fetch = async () => {
            const toastId = showtoast.loading('Đang đăng nhập...');
            try {
                setDisabled(true);
                const res = await dispatch(login(data));
                const result = unwrapResult(res);
                showtoast.update(toastId, result.message, 'success');
                setSuccess(true);
            } catch (err) {
                showtoast.update(toastId, err, 'error');
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
