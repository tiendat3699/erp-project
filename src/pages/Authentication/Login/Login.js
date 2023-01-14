import classNames from 'classnames/bind';
import Input from '~/components/Input';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('Login-container')}>
            <form action="" className={cx('form')}>
                <Input type="text" placeholder="Tên tài khoản" />
                <Input type="password" placeholder="Mật khẩu" />
            </form>
        </div>
    );
}

export default Login;
