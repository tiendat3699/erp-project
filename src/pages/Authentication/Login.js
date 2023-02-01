import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { TextField, Button, Checkbox } from '~/components/Input';
import { useForm } from '~/hooks';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function login() {
    const {
        rules,
        register,
        handleSubmit,
        formState: { errors },
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <div className={cx('container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form action="" className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={cx('title')}>Đăng nhập</h1>
                <p className={cx('hint-text')}>
                    Chưa có tài khoản? <Link to="/signin">Đăng ký</Link>
                </p>
                <TextField
                    {...register('name_account', { required: rules.required })}
                    name="name_account"
                    message={errors.name_account?.message}
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
        </div>
    );
}

export default login;
