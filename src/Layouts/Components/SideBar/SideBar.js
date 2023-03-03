import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

import AccountItem from '~/components/AccountItem';
import MenuItem from './MenuItem';
import { logo } from '~/images';

import styles from './SideBar.module.scss';
import { privateRoutes } from '~/routes';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function SideBar() {
    const [collapse, setCollapse] = useState(false);
    const [hide, setHide] = useState(false);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!collapse) {
            setTimeout(() => {
                setHide(false);
            }, 200);
        }
    }, [collapse, hide]);

    const handleCollapse = () => {
        setHide(true);
        setCollapse(!collapse);
    };

    const hideClass = {
        hide,
    };

    return (
        <aside className={cx('wrapper', { collapse })}>
            <div className={cx('header')}>
                <Link to="/" className={cx('logo', hideClass)}>
                    <img src={logo} alt="" />
                    <span className={cx('title')}>ERP project</span>
                </Link>
                <button className={cx('collapse-btn')} onClick={handleCollapse}>
                    {<FontAwesomeIcon className={cx('icon')} icon={faAnglesLeft} rotation={collapse ? 180 : 0} />}
                </button>
            </div>
            <div className={cx('account', hideClass)}>
                <AccountItem data={user} />
            </div>
            <div className={cx('menu')}>
                {privateRoutes.map((route, index) => (
                    <MenuItem key={index} title={hide ? '' : route.title} to={route.path} icon={route.icon} />
                ))}
                {/* <MenuItem title={hide ? '' : 'Dự án'} to="/projects" icon={<FontAwesomeIcon icon={faFolderOpen} />} />
                <MenuItem title={hide ? '' : 'Khách hàng'} to="/customer" icon={<FontAwesomeIcon icon={faUsers} />} /> */}
            </div>
        </aside>
    );
}

export default SideBar;
