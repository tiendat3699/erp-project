import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

function TextField({ type, placeholder, label, name }) {
    const id = name + '_input';
    return (
        <div className={cx('wrapper')}>
            {label && (
                <label className={cx('label')} htmlFor={id}>
                    {label}
                </label>
            )}
            <input id={id} name={name} className={cx('input')} type={type} placeholder={placeholder} />
        </div>
    );
}

TextField.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
};

export default TextField;
