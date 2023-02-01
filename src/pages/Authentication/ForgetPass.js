import classNames from 'classnames/bind';
import { TextField, Button } from '~/components/Input';
import { useForm } from '~/hooks';

import styles from './Authentication.module.scss';
import { backgroundAuthenPage } from '~/images';

const cx = classNames.bind(styles);

function ForgetPass() {
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
                <h1 className={cx('title')}>Lấy lại mật khẩu</h1>
                <p className={cx('hint-text')}>Nhập email đăng ký để lấy lại mật khẩu</p>
                <TextField
                    {...register('mail_account', { required: rules.required, pattern: rules.email })}
                    name="mail_account"
                    message={errors.mail_account?.message}
                    placeholder="Email"
                />
                <div className={cx('footer')}>
                    <Button to="/login" className={cx('submit-btn')} rounded>
                        Hủy
                    </Button>
                    <Button type="submit" className={cx('submit-btn')} rounded primary>
                        Gửi email
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ForgetPass;
