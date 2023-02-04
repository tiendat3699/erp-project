import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useForm } from '~/hooks';
import { TextField, Button, Checkbox } from '~/components/Input';
import { authService } from '~/services';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function SignUp() {
    const {
        rules,
        register,
        handleSubmit,
        watch,
        formState: { errors },
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm();

    const onSubmit = (data) => console.log(authService.signup(data));

    return (
        <div className={cx('container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form action="" className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={cx('title')}>Đăng ký</h1>
                <p className={cx('hint-text')}>
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
                <TextField
                    {...register('fullname', { required: rules.required })}
                    name="fullname"
                    placeholder="Họ và tên của bạn"
                    message={errors.fullname?.message}
                />
                <TextField
                    {...register('email', {
                        required: rules.required,
                        pattern: rules.email,
                    })}
                    name="email"
                    placeholder="Email"
                    message={errors.mail_account?.message}
                />
                <TextField
                    {...register('username', {
                        required: rules.required,
                        pattern: rules.username,
                        minLength: rules.minLength(6),
                        maxLength: rules.maxLength(12),
                    })}
                    name="username"
                    placeholder="Tên tài khoản"
                    message={errors.username?.message}
                />
                <TextField
                    {...register('password', {
                        required: rules.required,
                        minLength: rules.minLength(8),
                    })}
                    name="password"
                    placeholder="Mật khẩu"
                    message={errors.password?.message}
                    hideBtn
                    hidedfield
                />
                <TextField
                    {...register('repeat_password', {
                        required: rules.required,
                        validate: (val) => rules.matchCheck(val, watch('password')),
                    })}
                    name="repeat_password"
                    placeholder="Nhập lại mật khẩu"
                    message={errors.repeat_password?.message}
                    hideBtn
                    hidedfield
                />
                <div className={cx('bottom')}>
                    <Checkbox
                        {...register('agreement', {
                            required: true,
                        })}
                        name="agreement"
                        error={errors.agreement}
                    />
                    <span className={cx('agree-text')}>
                        Tôi đồng ý với <Link to="/">Chính sách bảo mật</Link>
                    </span>
                </div>
                {errors.agreement && (
                    <p className={cx('validate-msg')}>
                        Vui lòng xác nhận rằng bạn đã đồng ý với các <Link to="/">chính sách bảo mật</Link> của chúng
                        tôi
                    </p>
                )}
                <div className={cx('footer')}>
                    <Button type="submit" className={cx('submit-btn')} rounded primary>
                        Đăng ký
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
