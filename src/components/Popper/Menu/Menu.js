import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const renderResult = (attr) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attr}>
            <PopperWrapper className={cx('menu-popper')}>
                {items.map((item, index) => (
                    <MenuItem key={index} data={item} />
                ))}
            </PopperWrapper>
        </div>
    );
    return (
        <Tippy interactive placement="bottom-end" trigger="click" render={renderResult}>
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
};

export default Menu;
