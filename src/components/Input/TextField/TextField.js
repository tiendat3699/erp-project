import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

function TextField({ name, placeholder, label, hideBtn, hidedfield }) {
    const [hide, setHide] = useState(hidedfield ? true : false);
    const id = name + '_input';

    return (
        <div className={cx('wrapper')}>
            {label && (
                <label className={cx('label')} htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                id={id}
                name={name}
                className={cx('input')}
                type={hide ? 'password' : 'text'}
                placeholder={placeholder}
            />
            {hideBtn && (
                <button type="button" className={cx('btn-hide')} onClick={() => setHide(!hide)}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={hide ? faEye : faEyeSlash} />
                </button>
            )}
        </div>
    );
}

TextField.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
};

export default TextField;
