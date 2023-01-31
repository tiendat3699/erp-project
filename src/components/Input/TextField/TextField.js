import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

const TextField = forwardRef(({ name, placeholder, label, hideBtn, hidedfield, message, ...passProps }, ref) => {
    const [hide, setHide] = useState(hidedfield ? true : false);
    const id = name + '_input';
    return (
        <div className={cx('wrapper')}>
            {label && (
                <label className={cx('label')} htmlFor={id}>
                    {label}
                </label>
            )}
            <div className={cx('group-field')}>
                <input
                    id={id}
                    name={name}
                    className={cx('input', { invalid: message })}
                    type={hide ? 'password' : 'text'}
                    placeholder={placeholder}
                    ref={ref}
                    {...passProps}
                />
                {hideBtn && (
                    <button type="button" className={cx('btn-hide')} onClick={() => setHide(!hide)}>
                        <FontAwesomeIcon className={cx('btn-icon')} icon={hide ? faEye : faEyeSlash} />
                    </button>
                )}
            </div>
            {message && (
                <span className={cx('error-messgae')}>
                    <FontAwesomeIcon className={cx('error-icon')} icon={faTriangleExclamation} />
                    {message}
                </span>
            )}
        </div>
    );
});

TextField.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    message: PropTypes.string,
};

export default TextField;
