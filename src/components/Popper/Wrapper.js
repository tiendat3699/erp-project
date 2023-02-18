import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className }) {
    return <dir className={cx('wrapper', className)}>{children}</dir>;
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Wrapper;
