import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './GridSystem.module.scss';

const cx = classNames.bind(styles);

function Row({ children, space, className }) {
    const spaceClass = {};
    if (space) {
        spaceClass['gap-' + space] = true;
    }
    return <div className={cx('row', spaceClass, className)}>{children}</div>;
}

Row.propTypes = {
    children: PropTypes.node.isRequired,
    space: PropTypes.number,
    className: PropTypes.string,
};

export default Row;
