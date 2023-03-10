import classNames from 'classnames/bind';

import Header from '../Components/Header';
import SideBar from '../Components/SideBar';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <SideBar />
            <div className={cx('content-wrapper')}>
                <Header />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
