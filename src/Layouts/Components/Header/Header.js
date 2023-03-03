import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowRightToBracket,
    faBriefcase,
    faCircleQuestion,
    faSearch,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '~/components/Input';
import Menu from '~/components/Popper/Menu';

import { authService } from '~/services';
import { useNavigate } from 'react-router-dom';
import { logOut } from '~/store/auth';

import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const HandleLogOut = async () => {
        await authService.logOut();
        dispatch(logOut());
        navigate('/login');
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Hồ sơ cá nhân',
            to: '/:user',
        },
        {
            icon: <FontAwesomeIcon icon={faBriefcase} />,
            title: 'Quản lý công việc',
            to: '/:user',
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Trợ giúp',
            to: '/:user',
        },
        {
            icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
            title: 'Đăng xuất',
            onClick: HandleLogOut,
            separate: true,
        },
    ];

    const [chatQueue, setChatQueue] = useState([]);
    const [notifyQueue, setNotifyQueue] = useState([]);
    const { title } = useSelector((state) => state.page);
    const { avatar_url } = useSelector((state) => state.auth.user);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('leftside')}>
                <h2 className={cx('title')}>{title}</h2>
            </div>
            <div className={cx('rightside')}>
                <div className={cx('control')}>
                    <div className={cx('search')}>
                        <input type="text" placeholder="Nhập để tìm kiếm" />
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <Tippy content="Thông báo" delay={[200, 0]}>
                        <Button rounded className={cx('btn')}>
                            <FontAwesomeIcon icon={faBell} />
                            {chatQueue.length > 0 && (
                                <span className={cx('Queue')}>{chatQueue.length <= 9 ? chatQueue.length : '9+'}</span>
                            )}
                        </Button>
                    </Tippy>
                    <Tippy content="Tin nhắn" delay={[200, 0]}>
                        <Button rounded className={cx('btn')}>
                            <FontAwesomeIcon icon={faComment} />
                            {notifyQueue.length > 0 && (
                                <span className={cx('Queue')}>
                                    {notifyQueue.length <= 9 ? notifyQueue.length : '9+'}
                                </span>
                            )}
                        </Button>
                    </Tippy>
                    <Menu items={userMenu}>
                        <Tippy content="Tài khoản" delay={[200, 0]}>
                            <Button rounded className={cx('btn', 'avatar')}>
                                <img src={avatar_url} alt="" />
                            </Button>
                        </Tippy>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
