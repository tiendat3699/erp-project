import classNames from 'classnames/bind';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img src="https://avatars.githubusercontent.com/u/96950844?s=40&v=4" alt="" />
            </div>
            <div className={cx('info')}>
                <p className={cx('name')}>Đinh Tiến Đạt</p>
                <span className={cx('tag')}>Admin</span>
            </div>
        </div>
    );
}

export default AccountItem;
