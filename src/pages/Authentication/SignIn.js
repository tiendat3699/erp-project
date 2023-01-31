import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useForm, rules } from '~/hooks';
import { TextField, Button, Checkbox } from '~/components/Input';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function SignIn() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm();

    const onSubmit = (data) => console.log(data);

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
                    {...register('mail_account', {
                        required: rules.required,
                        pattern: rules.email,
                    })}
                    name="mail_account"
                    placeholder="Email"
                    message={errors.mail_account?.message}
                />
                <TextField
                    {...register('name_account', {
                        required: rules.required,
                        minLength: rules.minLength6,
                    })}
                    name="name_account"
                    placeholder="Tên tài khoản"
                    message={errors.name_account?.message}
                />
                <TextField
                    {...register('password', {
                        required: rules.required,
                        minLength: rules.minLength8,
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
                        validate: (value) => value === watch('password') || 'Mật khẩu không giống nhau',
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

export default SignIn;
