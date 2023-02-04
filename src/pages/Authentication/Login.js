/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { TextField, Button, Checkbox } from '~/components/Input';
import { useForm } from '~/hooks';
import { authService } from '~/services';
import ToastComponent, { loading as toastLoading, update as toastUpdate } from '~/components/Toast/';

import 'react-toastify/dist/ReactToastify.css';

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

    const [cookies, setCookies] = useCookies();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const fetch = async () => {
            const toastId = toastLoading('Đang đăng nhập');
            const result = await authService.login(data);
            if (result.accessToken) {
                setCookies('accessToken', result.accessToken);
                toastUpdate(toastId, result.message, 'success');
                // navigate('/');
            } else {
                toastUpdate(toastId, result.message, 'error');
            }
        };

        fetch();
    };

    return (
        <div className={cx('container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form action="" className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
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
                    <Button type="submit" className={cx('submit-btn')} rounded primary>
                        Đăng nhập
                    </Button>
                </div>
            </form>
            {/* {loading && (
                <div className={cx('overlay')}>
                    <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} pulse />
                </div>
            )} */}
            <ToastComponent />
        </div>
    );
}

export default login;
