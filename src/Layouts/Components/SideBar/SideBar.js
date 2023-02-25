import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faPager, faUsers } from '@fortawesome/free-solid-svg-icons';

import AccountItem from '~/components/AccountItem';
import MenuItem from './MenuItem';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <Link to="/" className={cx('logo')}>
                <img src="https://wemomedia.net/wp-content/uploads/2022/09/Untitled-design-70x70.png.webp" alt="" />
            </Link>
            <AccountItem />
            <div className={cx('menu')}>
                <MenuItem title="Tổng quan" to="/" icon={<FontAwesomeIcon icon={faPager} />} />
                <MenuItem title="Dự án" to="/projects" icon={<FontAwesomeIcon icon={faFolderOpen} />} />
                <MenuItem title="Khách hàng" to="/customer" icon={<FontAwesomeIcon icon={faUsers} />} />
            </div>
        </aside>
    );
}

export default SideBar;
