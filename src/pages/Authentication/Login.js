/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { TextField, Button, Checkbox } from '~/components/Input';
import { useForm } from '~/hooks';
import { authService } from '~/services';
import ToastComponent, { showtoast } from '~/components/Toast/';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function login() {
    const {
        rules,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies();

    const onSubmit = (data) => {
        if (disabled) return;
        const fetch = async () => {
            const toastId = showtoast.loading('Đang đăng nhập...');
            try {
                setDisabled(true);
                const result = await authService.login(data);
                setDisabled(false);
                setCookie('accessToken', result.accessToken);
                showtoast.update(toastId, result.message, 'success');
                navigate('/');
            } catch (err) {
                const data = err.response?.data;
                setDisabled(false);
                if (data) {
                    showtoast.update(toastId, data.message, 'error');
                } else {
                    console.log(err.message);
                    showtoast.update(toastId, 'Lỗi đăng nhập', 'error');
                }
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
                    <Button disabled={disabled} type="submit" className={cx('submit-btn')} rounded primary>
                        Đăng nhập
                    </Button>
                </div>
            </form>
            <ToastComponent />
        </div>
    );
}

export default login;
