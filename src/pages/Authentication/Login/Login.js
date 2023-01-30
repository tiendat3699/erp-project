import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { TextField, Button, CheckBox } from '~/components/Input';

import styles from './Login.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form action="" className={cx('form')}>
                <h1 className={cx('title')}>Đăng nhập</h1>
                <p className={cx('hint-text')}>
                    Chưa có tài khoản?
                    <Link to="/signIn">Đăng ký</Link>
                </p>
                <TextField type="text" placeholder="Tên tài khoản" name="name_account" />
                <TextField type="password" placeholder="Mật khẩu" name="password" />
                <CheckBox labelRight="Ghi nhớ" />
                <Button className={cx('submit-btn')} rounded primary>
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
}

export default Login;
