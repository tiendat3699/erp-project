import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import AccountItem from '~/components/AccountItem';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <Link to="/" className={cx('logo')}>
                <img src="https://wemomedia.net/wp-content/uploads/2022/09/Untitled-design-70x70.png.webp" alt="" />
            </Link>
            <AccountItem />
        </aside>
    );
}

export default SideBar;
