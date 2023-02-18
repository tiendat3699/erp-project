import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment } from '@fortawesome/free-regular-svg-icons';
import { Button } from '~/components/Input';
import { Wrapper } from '~/components/Popper';

import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const [chatNotice, setChatNotice] = useState([]);
    const [notifyNotice, setNotifyNotice] = useState([]);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('leftside')}>
                <h2>Header</h2>
            </div>
            <div className={cx('rightside')}>
                <div className={cx('control')}>
                    <Tippy content="Thông báo" delay={[200, 0]}>
                        <Button rounded className={cx('btn')}>
                            <FontAwesomeIcon icon={faBell} />
                            {chatNotice.length > 0 && (
                                <span className={cx('notice')}>
                                    {chatNotice.length <= 9 ? chatNotice.length : '9+'}
                                </span>
                            )}
                        </Button>
                    </Tippy>
                    <Tippy content="Tin nhắn" delay={[200, 0]}>
                        <Button rounded className={cx('btn')}>
                            <FontAwesomeIcon icon={faComment} />
                            {notifyNotice.length > 0 && (
                                <span className={cx('notice')}>
                                    {notifyNotice.length <= 9 ? notifyNotice.length : '9+'}
                                </span>
                            )}
                        </Button>
                    </Tippy>
                    <Tippy content="Tài khoản" delay={[200, 0]}>
                        <Button rounded className={cx('btn', 'avatar')}>
                            <img src="https://avatars.githubusercontent.com/u/96950844?s=40&v=4" alt="" />
                        </Button>
                    </Tippy>
                </div>
            </div>
        </header>
    );
}

export default Header;
