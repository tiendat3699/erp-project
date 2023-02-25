import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img src={data.img} alt="" />
            </div>
            <div className={cx('info')}>
                <p className={cx('name')}>{data.name}</p>
                <p className={cx('username')}>{data.userName}</p>
                <span className={cx('tag')}>{data.role}</span>
            </div>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
