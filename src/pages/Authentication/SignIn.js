import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { TextField, Button, Checkbox } from '~/components/Input';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function SignIn() {
    return (
        <div className={cx('container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form action="" className={cx('form')}>
                <h1 className={cx('title')}>Đăng ký</h1>
                <p className={cx('hint-text')}>
                    Đã có tài khoản?
                    <Link to="/login">Đăng nhập</Link>
                </p>
                <TextField name="fullname" placeholder="Họ và tên của bạn" />
                <TextField name="mail_account" placeholder="Email" />
                <TextField name="name_account" placeholder="Tên tài khoản" />
                <TextField name="password" placeholder="Mật khẩu" hideBtn hidedfield />
                <TextField name="repeat_password" placeholder="Nhập lại mật khẩu" hideBtn hidedfield />
                <div className={cx('bottom')}>
                    <Checkbox name="agree_policy" />
                    <span className={cx('agree-text')}>
                        Tôi đồng ý với
                        <Link to="/">Chính sách bảo mật</Link>
                    </span>
                </div>
                <Button className={cx('submit-btn')} rounded primary>
                    Đăng ký
                </Button>
            </form>
        </div>
    );
}

export default SignIn;
