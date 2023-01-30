import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { TextField, Button, Checkbox } from '~/components/Input';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Authentication() {
    const location = useLocation();
    const [isLogin, setIslogin] = useState(location.pathname === '/login');
    const title = isLogin ? 'Đăng nhập' : 'Đăng ký';

    useEffect(() => {
        setIslogin(location.pathname === '/login');
    }, [location]);

    return (
        <div className={cx('container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form action="" className={cx('form')}>
                <h1 className={cx('title')}>{title}</h1>
                <p className={cx('hint-text')}>
                    {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                    <Link to={isLogin ? '/signIn' : '/login'}>{isLogin ? 'Đăng ký' : 'Đăng nhập'}</Link>
                </p>
                {!isLogin && (
                    <>
                        <TextField name="fullname" placeholder="Họ và tên" />
                        <TextField name="email_account" placeholder="Email" />
                    </>
                )}
                <TextField name="name_account" placeholder="Tên tài khoản" />
                <TextField name="password" placeholder="Mật khẩu" hideBtn hidedfield />
                {!isLogin && <TextField name="repeat_password" placeholder="Nhập lại mật khẩu" hideBtn hidedfield />}
                {isLogin && (
                    <div className={cx('space-btw-bottom')}>
                        <Checkbox name="rememberme" labelRight="Ghi nhớ" />
                        <Link to="/">Quên mật khẩu</Link>
                    </div>
                )}
                {!isLogin && (
                    <div className={cx('bottom')}>
                        <Checkbox name="rememberme" />
                        <span className="">
                            Tôi đồng ý với
                            <Link to="/">Chính sách bảo mật</Link>
                        </span>
                    </div>
                )}
                <Button className={cx('submit-btn')} rounded primary>
                    {title}
                </Button>
            </form>
        </div>
    );
}

export default Authentication;
