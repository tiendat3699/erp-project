import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

import AccountItem from '~/components/AccountItem';
import MenuItem from './MenuItem';
import { logo } from '~/images';
import { privateRoutes } from '~/routes';

import styles from './SideBar.module.scss';
import { setSibarCollapse } from '~/stores/page';

const cx = classNames.bind(styles);

function SideBar() {
    const sideBarCollapse = useSelector((state) => state.page.sideBarCollapse, shallowEqual);
    const dispatch = useDispatch();
    const [collapse, setCollapse] = useState(sideBarCollapse);
    const [hide, setHide] = useState(sideBarCollapse);
    const user = useSelector((state) => state.auth.user, shallowEqual);

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
        dispatch(setSibarCollapse(!collapse));
    };

    const hideClass = {
        hide,
    };

    return (
        <aside className={cx('wrapper', { collapse })}>
            <div className={cx('header')}>
                <Link to="/" className={cx('logo', 'animation-show', hideClass)}>
                    <img src={logo} alt="" />
                    <span className={cx('title')}>ERP project</span>
                </Link>
                <button className={cx('collapse-btn')} onClick={handleCollapse}>
                    {<FontAwesomeIcon className={cx('icon')} icon={faAnglesLeft} rotation={collapse ? 180 : 0} />}
                </button>
            </div>
            <div className={cx('account', 'animation-show', hideClass)}>
                <AccountItem data={user} />
            </div>
            <div className={cx('menu')}>
                {privateRoutes.map((route) => (
                    <MenuItem key={route.path} title={route.title} to={route.path} icon={route.icon} minimal={hide} />
                ))}
                {/* <MenuItem title={hide ? '' : 'Dự án'} to="/projects" icon={<FontAwesomeIcon icon={faFolderOpen} />} />
                <MenuItem title={hide ? '' : 'Khách hàng'} to="/customer" icon={<FontAwesomeIcon icon={faUsers} />} /> */}
            </div>
        </aside>
    );
}

export default SideBar;
