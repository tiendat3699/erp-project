import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ type, placeholder, label }) {
    return (
        <div className={cx('input-wrap')}>
            {label && <label className={cx('label')}>{label}</label>}
            <input className={cx('input')} type={type} placeholder={placeholder} />
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
};

export default Input;
