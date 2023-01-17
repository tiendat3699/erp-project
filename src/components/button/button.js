import { Link } from 'react-router-dom';
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

export default Button;
