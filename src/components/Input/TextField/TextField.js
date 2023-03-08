import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

function TextField({ placeholder, label, hideBtn, hidedfield, message, className, size = 'md', register }) {
    const [hide, setHide] = useState(hidedfield ? true : false);
    const id = register ? register.name + '_checkbox' : false;

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
                    className={cx('input', { invalid: message }, className, { [size]: size })}
                    type={hide ? 'password' : 'text'}
                    placeholder={placeholder}
                    {...register}
                />
                {hideBtn && (
                    <button type="button" className={cx('btn-hide')} onClick={() => setHide(!hide)} tabIndex={-1}>
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
}

TextField.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    hideBtn: PropTypes.bool,
    hidedfield: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    register: PropTypes.object,
};

export default TextField;
