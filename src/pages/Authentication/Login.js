import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { TextField, Button, Checkbox } from '~/components/Input';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function login() {
    return (
        <div className={cx('container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form action="" className={cx('form')}>
                <h1 className={cx('title')}>Đăng nhập</h1>
                <p className={cx('hint-text')}>
                    Chưa có tài khoản?
                    <Link to="/signIn">Đăng ký</Link>
                </p>
                <TextField name="name_account" placeholder="Tên tài khoản" />
                <TextField name="password" placeholder="Mật khẩu" hideBtn hidedfield />
                <div className={cx('space-btw-bottom')}>
                    <Checkbox name="rememberme" labelRight="Ghi nhớ" />
                    <Link to="/">Quên mật khẩu</Link>
                </div>
                <Button className={cx('submit-btn')} rounded primary>
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
}

export default login;
