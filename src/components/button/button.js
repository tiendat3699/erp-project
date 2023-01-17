import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

import styles from './button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, children, primary, rounded, className, ...passProp }) {
    let Comp = 'button';

    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary: primary,
        rounded: rounded,
    });

    return (
        <Comp className={classes} {...passProp}>
            {children}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    rounded: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
