import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ContentBlock.module.scss';

const cx = classNames.bind(styles);

function ContentBlock({ children, className }) {
    return <dir className={cx('wrapper', className)}>{children}</dir>;
}

ContentBlock.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default ContentBlock;
