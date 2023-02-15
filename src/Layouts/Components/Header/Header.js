import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('leftside')}>
                <h2>Header</h2>
            </div>
            <div className={cx('rightside')}></div>
        </header>
    );
}

export default Header;
