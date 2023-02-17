import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment } from '@fortawesome/free-regular-svg-icons';
import { Button } from '~/components/Input';

import styles from './Header.module.scss';
import { useState } from 'react';

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
                    <Button rounded className={cx('btn')}>
                        <FontAwesomeIcon icon={faBell} />
                        {chatNotice.length > 0 && (
                            <span className={cx('notice')}>{chatNotice.length <= 9 ? chatNotice.length : '9+'}</span>
                        )}
                    </Button>
                    <Button rounded className={cx('btn')}>
                        <FontAwesomeIcon icon={faComment} />
                        {notifyNotice.length > 0 && (
                            <span className={cx('notice')}>
                                {notifyNotice.length <= 9 ? notifyNotice.length : '9+'}
                            </span>
                        )}
                    </Button>
                    <Button rounded className={cx('btn', 'avatar')}>
                        <img src="https://avatars.githubusercontent.com/u/96950844?s=40&v=4" alt="" />
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
