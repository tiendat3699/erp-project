import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import ReactSelect from 'react-select';

import styles from './Select.module.scss';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function Select({ label, message, size = 'md', placeholder, options, isMutil, disabled, inputRef, ...pastProps }) {
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

    return (
        <div className={cx('wrapper')}>
            {label && <label className={cx('label')}>{label}</label>}
            <ReactSelect
                className={cx('selector', { invalid: message })}
                options={options}
                placeholder={placeholder}
                isMulti={isMutil}
                isDisabled={disabled}
                ref={inputRef}
                {...pastProps}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        minHeight: height,
                        borderRadius: 10,
                        borderColor: borderColorStyle(state.isFocused),
                        boxShadow: boxShadowStyle(state.isFocused),
                    }),
                }}
            />
            {message && (
                <span className={cx('error-messgae')}>
                    <FontAwesomeIcon className={cx('error-icon')} icon={faTriangleExclamation} />
                    {message}
                </span>
            )}
        </div>
    );
}

export default Select;
