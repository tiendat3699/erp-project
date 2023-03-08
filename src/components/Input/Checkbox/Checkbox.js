import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './Checkbox.module.scss';
const cx = classNames.bind(styles);

function Checkbox({ labelLeft, labelRight, error, register }) {
    const id = register ? register?.name + '_checkbox' : undefined;
    const [checked, setCheck] = useState(false);

    const { onChange, ...restRgister } = register || {};

    const HandleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
        setCheck(!checked);
    };

    return (
        <label htmlFor={id} className={cx('wrapper')}>
            {labelLeft && <span>{labelLeft}</span>}
            <div className={cx('checkbox')}>
                <input
                    className={cx({ invalid: error })}
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={HandleChange}
                    {...restRgister}
                />
                {checked && <FontAwesomeIcon className={cx('icon')} icon={faCheck} />}
            </div>
            {labelRight && <span>{labelRight}</span>}
        </label>
    );
}

Checkbox.propTypes = {
    labelLeft: PropTypes.string,
    labelRight: PropTypes.string,
    error: PropTypes.object,
    register: PropTypes.object,
};

export default Checkbox;
