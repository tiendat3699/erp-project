import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react';

import styles from './SideBar.module.scss';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, className, minimal }) {
    const Tooltip = minimal ? Tippy : Fragment;
    let props = minimal
        ? {
              content: title,
              placement: 'left-end',
              theme: 'light',
          }
        : {};
    return (
        <Tooltip {...props}>
            <NavLink to={to} className={(nav) => cx('menu-item', { active: nav.isActive }, className)}>
                <span className={cx('item-icon')}>{icon}</span>
                <span className={cx('item-title')}>{minimal ? '' : title}</span>
            </NavLink>
        </Tooltip>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    className: PropTypes.string,
    minimal: PropTypes.bool,
};

export default MenuItem;
