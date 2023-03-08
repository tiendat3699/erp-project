import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { components } from 'react-select';

import styles from './Chip.module.scss';

const cx = classNames.bind(styles);

function ImageChip({ data, ...props }) {
    return (
        <components.MultiValue {...props} className={cx('wrapper', 'image')}>
            <div className={cx('chip')}>
                <img className={cx('img')} src={data.image} alt="" />
                <p className={cx('lable')}>{data.label}</p>
            </div>
        </components.MultiValue>
    );
}

ImageChip.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ImageChip;
