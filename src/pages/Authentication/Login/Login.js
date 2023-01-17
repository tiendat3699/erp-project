import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Input from '~/components/Input';
import Button from '~/components/button/Button';

import styles from './Login.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('Login-container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form action="" className={cx('form')}>
                <h1 className={cx('title')}>Đăng nhập</h1>
                <p className={cx('link')}>
                    Không có tài khoản
                    <Link to="/signIn">Đăng ký</Link>
                </p>
                <Input type="text" placeholder="Tên tài khoản" />
                <Input type="password" placeholder="Mật khẩu" />
                <Button className={cx('submit-btn')} rounded primary>
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
}

export default Login;
