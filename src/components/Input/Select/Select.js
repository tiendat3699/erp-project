import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import ReactSelect from 'react-select';

import styles from './Select.module.scss';

const cx = classNames.bind(styles);

const Select = forwardRef(({ name, label, message, size = 'md', placeholder, options, isMutil, disabled }, ref) => {
    const [value, setValue] = useState('');

    let height;

    switch (size) {
        case 'sm':
            height = 36;
            break;
        case 'md':
            height = 40;
            break;
        case 'lg':
            height = 50;
            break;
        default:
            break;
    }

    const boxShadowStyle = (isFocused) => {
        let style;
        if (isFocused) {
            if (message) {
                style = '0 0 0 1px var(--danger-color)';
            } else {
                style = '0 0 0 1px var(--primary-color)';
            }
        } else {
            style = 'none';
        }
        return style;
    };

    const borderColorStyle = (isFocused) => {
        let style;
        if (message) {
            style = 'var(--danger-color) !important';
        } else {
            if (isFocused) {
                style = 'var(--primary-color) !important';
            } else {
                style = '#555';
            }
        }
        return style;
    };

    const handleSetValue = (val) => {
        if (isMutil) {
            const values = val.map((el) => el.value);
            setValue(JSON.stringify(values));
        } else {
            setValue(val.value);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <input ref={ref} type="hidden" name={name} value={value} />
            {label && <label className={cx('label')}>{label}</label>}
            <ReactSelect
                className={cx('selector', { invalid: message })}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        minHeight: height,
                        borderRadius: 10,
                        borderColor: borderColorStyle(state.isFocused),
                        boxShadow: boxShadowStyle(state.isFocused),
                    }),
                }}
                options={options}
                placeholder={placeholder}
                isMulti={isMutil}
                isDisabled={disabled}
                onChange={handleSetValue}
            />
            {message && (
                <span className={cx('error-messgae')}>
                    <FontAwesomeIcon className={cx('error-icon')} icon={faTriangleExclamation} />
                    {message}
                </span>
            )}
        </div>
    );
});

export default Select;
