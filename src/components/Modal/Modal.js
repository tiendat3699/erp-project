import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Modal({ children, size = 'sm', isOpen = false, onClose, className }) {
    const [open, setOpen] = useState(isOpen);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const closeModalHandler = () => {
        setClosing(true);
        setTimeout(() => {
            setOpen(false);
            onClose();
            setClosing(false);
        }, 300);
    };

    const classes = cx({
        [size]: size,
        className,
    });

    return createPortal(
        <>
            {open && (
                <div className={cx('root', { open, closing })}>
                    <div className={cx('wrapper', classes)}>
                        <div className={cx('header')}>header</div>
                        <div className={cx('body')}>{children}</div>
                        <div className={cx('footer')}>
                            <button className={cx('close-btn')} onClick={closeModalHandler}>
                                đóng
                            </button>
                        </div>
                    </div>
                    <div className={cx('overlay')} onClick={closeModalHandler}></div>
                </div>
            )}
        </>,
        document.querySelector('body'),
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

export default Modal;
