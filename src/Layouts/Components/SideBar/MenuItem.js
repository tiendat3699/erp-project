import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, className }) {
    return (
        <NavLink to={to} className={(nav) => cx('menu-item', { active: nav.isActive }, className)}>
            <span className={cx('item-icon')}>{icon}</span>
            <span className={cx('item-title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default MenuItem;
