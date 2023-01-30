import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

function Checkbox({ name, labelLeft, labelRight }) {
    const id = name + '_checkbox';
    const [checked, setCheck] = useState(false);

    const HandleChange = () => {
        setCheck(!checked);
    };

    return (
        <label htmlFor={id} className={cx('wrapper')}>
            {labelLeft && <span>{labelLeft}</span>}
            <div className={cx('checkbox')}>
                <input id={id} name={name} type="checkbox" onChange={HandleChange} checked={checked} />
                {checked && <FontAwesomeIcon className={cx('icon')} icon={faCheck} />}
            </div>
            {labelRight && <span>{labelRight}</span>}
        </label>
    );
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    labelLeft: PropTypes.string,
    labelRight: PropTypes.string,
};

export default Checkbox;
