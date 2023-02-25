import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faFolderOpen, faPager, faUsers } from '@fortawesome/free-solid-svg-icons';

import AccountItem from '~/components/AccountItem';
import MenuItem from './MenuItem';
import { logo } from '~/images';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
    const [collapse, setCollapse] = useState(false);
    const [hide, setHide] = useState(false);

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

    const user = {
        img: 'https://avatars.githubusercontent.com/u/96950844?s=40&v=4',
        name: 'Đinh Tiến Đạt',
        userName: 'TienDat',
        role: 'Admin',
    };

    return (
        <aside className={cx('wrapper', { collapse })}>
            <div className={cx('header')}>
                <Link to="/" className={cx('logo', hideClass)}>
                    <img src={logo} alt="" />
                    <span className={cx('title')}>Wemo Media</span>
                </Link>
                <button className={cx('collapse-btn')} onClick={handleCollapse}>
                    {<FontAwesomeIcon className={cx('icon')} icon={faAnglesLeft} rotation={collapse ? 180 : 0} />}
                </button>
            </div>
            <div className={cx('account', hideClass)}>
                <AccountItem data={user} />
            </div>
            <div className={cx('menu')}>
                <MenuItem title={hide ? '' : 'Tổng quan'} to="/" icon={<FontAwesomeIcon icon={faPager} />} />
                <MenuItem title={hide ? '' : 'Dự án'} to="/projects" icon={<FontAwesomeIcon icon={faFolderOpen} />} />
                <MenuItem title={hide ? '' : 'Khách hàng'} to="/customer" icon={<FontAwesomeIcon icon={faUsers} />} />
            </div>
        </aside>
    );
}

export default SideBar;
