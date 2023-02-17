import classNames from 'classnames/bind';

import Header from '../Components/Header';
import SideBar from '../Components/SideBar';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')} style={{ height: '10000px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
