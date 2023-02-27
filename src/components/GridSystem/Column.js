import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './GridSystem.module.scss';

const cx = classNames.bind(styles);

function Column({ children, xs, sm, md, lg, xl, className }) {
    const responClasses = {};
    if (xs) {
        responClasses['col-xs-' + xs] = true;
    }
    if (sm) {
        responClasses['col-sm-' + sm] = true;
    }
    if (md) {
        responClasses['col-md-' + md] = true;
    }
    if (lg) {
        responClasses['col-lg-' + lg] = true;
    }
    if (xl) {
        responClasses['col-xl-' + xl] = true;
    }

    return <div className={cx('col', responClasses, className)}>{children}</div>;
}

Column.propTypes = {
    children: PropTypes.node.isRequired,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    className: PropTypes.string,
};

export default Column;
