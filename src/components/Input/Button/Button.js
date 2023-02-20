import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const Button = forwardRef(
    ({ disabled, to, href, children, primary, rounded, leftIcon, rightIcon, className, onClick, ...passProp }, ref) => {
        let Comp = 'button';
        const props = {
            onClick,
            ...passProp,
        };

        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on') && typeof props[key] === 'function') {
                    delete props[key];
                }
            });
        }

        if (to) {
            props.to = to;
            Comp = Link;
        } else if (href) {
            props.href = href;
            Comp = 'a';
        }

        const classes = cx('wrapper', {
            [className]: className,
            primary: primary,
            rounded: rounded,
        });

        return (
            <Comp ref={ref} disabled={disabled} className={classes} {...props}>
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={cx('title')}>{children}</span>
                {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            </Comp>
        );
    },
);

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    rounded: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
