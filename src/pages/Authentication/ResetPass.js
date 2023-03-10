import classNames from 'classnames/bind';
import { TextField, Button } from '~/components/Input';
import { useForm } from '~/hooks';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function ResetPass() {
    const {
        rules,
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
                <h1 className={cx('title')}>Đặt mật khẩu mới</h1>
                <p className={cx('hint-text')}>Đặt lại mật khẩu mới</p>
                <TextField
                    {...register('password', { required: rules.required, minLength: rules.minLength(8) })}
                    name="password"
                    placeholder="Mật khẩu mới"
                    message={errors.password?.message}
                    hideBtn
                    hidedfield
                />
                <TextField
                    {...register('repeat_password', {
                        required: rules.required,
                        validate: (value) => rules.matchCheck(value, watch('password')),
                    })}
                    name="repeat_password"
                    placeholder="Nhập lại mật khẩu"
                    message={errors.repeat_password?.message}
                    hideBtn
                    hidedfield
                />
                <div className={cx('footer')}>
                    <Button to="/login" className={cx('submit-btn')} rounded>
                        Hủy
                    </Button>
                    <Button type="submit" className={cx('submit-btn')} rounded primary>
                        Lưu
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ResetPass;
