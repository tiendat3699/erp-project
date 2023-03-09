import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '~/hooks';
import { authService } from '~/services';
import { TextField, Button, Checkbox } from '~/components/Input';
import ToastComponent, { showtoast, toastType } from '~/components/Toast';

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

    const [disabled, setDisabled] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    const onSubmit = (data) => {
        if (disabled) return;
        const fetch = async () => {
            const toastId = showtoast.loading('Đang đăng nhập...');
            try {
                setDisabled(true);
                const res = await authService.signup(data);
                showtoast.update(toastId, res.message, 'success', toastType.SUCCESS);
                setSuccess(true);
            } catch (error) {
                showtoast.update(toastId, error.message, 'error', toastType.ERROR);
            } finally {
                setDisabled(true);
            }
        };

        fetch();
    };

    return (
        <div className={cx('container')} style={{ backgroundImage: 'url(' + backgroundAuthenPage + ')' }}>
            <form action="" className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={cx('title')}>Đăng ký</h1>
                <p className={cx('hint-text')}>
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
                <TextField
                    register={register('fullname', { required: rules.required })}
                    placeholder="Họ và tên của bạn"
                    message={errors.fullname?.message}
                    placementMessage="right"
                />
                <TextField
                    register={register('email', {
                        required: rules.required,
                        pattern: rules.email,
                    })}
                    placeholder="Email"
                    message={errors.email?.message}
                    placementMessage="right"
                />
                <TextField
                    register={register('username', {
                        required: rules.required,
                        pattern: rules.username,
                        minLength: rules.minLength(6),
                        maxLength: rules.maxLength(12),
                    })}
                    placeholder="Tên tài khoản"
                    message={errors.username?.message}
                    placementMessage="right"
                />
                <TextField
                    register={register('password', {
                        required: rules.required,
                        minLength: rules.minLength(8),
                    })}
                    placeholder="Mật khẩu"
                    message={errors.password?.message}
                    placementMessage="right"
                    hideBtn
                    hidedfield
                />
                <TextField
                    register={register('repeat_password', {
                        required: rules.required,
                        validate: (val) => rules.matchCheck(val, watch('password')),
                    })}
                    placeholder="Nhập lại mật khẩu"
                    message={errors.repeat_password?.message}
                    placementMessage="right"
                    hideBtn
                    hidedfield
                />
                <div className={cx('bottom')}>
                    <Checkbox
                        register={register('agreement', {
                            required: true,
                        })}
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
                    <Button disabled={disabled} type="submit" className={cx('submit-btn')} rounded primary>
                        Đăng ký
                    </Button>
                </div>
            </form>
            <ToastComponent />
        </div>
    );
}

export default SignUp;
