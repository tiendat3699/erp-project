import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button } from '~/components/Input';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    return (
        <Button className={cx('menu-item', { separate: data.separate })} leftIcon={data.icon}>
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MenuItem;
