import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data, minimal }) {
    return (
        <div className={cx('wrapper', { minimal })}>
            <div className={cx('avatar')}>
                <img src={data.avatar_url} alt="" />
            </div>
            <div className={cx('info')}>
                <p className={cx('name')}>{data.fullname}</p>
                <p className={cx('username')}>{data.username}</p>
                {!minimal ?? <span className={cx('tag')}>{data.role}</span>}
            </div>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    minimal: PropTypes.bool,
};

export default AccountItem;
