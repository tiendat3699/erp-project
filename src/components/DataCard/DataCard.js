import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ContentBlock from '~/components/ContentBlock';

import styles from './DataCard.module.scss';

const cx = classNames.bind(styles);

function DataCard({ icon, title, value, className }) {
    return (
        <ContentBlock className={cx('wrapper', className)}>
            <div className={cx('icon')}>{icon}</div>
            <div className={cx('info')}>
                <p className={cx('value')}>{value}</p>
                <p className={cx('title')}>{title}</p>
            </div>
        </ContentBlock>
    );
}

DataCard.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    className: PropTypes.string,
};

export default DataCard;
