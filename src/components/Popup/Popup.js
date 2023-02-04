import classNames from 'classnames/bind';

import styles from './Popup.module.scss';

const cx = classNames.bind(styles);

function Popup({ children, small = true, medium, lager }) {
    const className = cx({
        small,
        medium,
        lager,
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', className)}>
                <div className={cx('header')}>header</div>
                <div className={cx('body')}>{children}</div>
                <div className={cx('footer')}>
                    <button className={cx('close-btn')}></button>
                </div>
            </div>
            <div className={cx('overlay')}></div>
        </div>
    );
}

export default Popup;
