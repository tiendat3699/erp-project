import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { components } from 'react-select';

import styles from './Chip.module.scss';

const cx = classNames.bind(styles);

function DefaultChip({ data, ...props }) {
    return (
        <components.MultiValue {...props} className={cx('wrapper', 'image')}>
            <div className={cx('chip')}>
                <p className={cx('lable')}>{data.label}</p>
            </div>
        </components.MultiValue>
    );
}

DefaultChip.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DefaultChip;
