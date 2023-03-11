import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Input';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({
    title,
    children,
    size = 'sm',
    onClose,
    onAcceptClick,
    acceptBtnText = 'Lưu',
    disabled = false,
    className,
    staticBackDrop,
    modalRef,
}) {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);

    const closeModalHandler = () => {
        if (!disabled) {
            setClosing(true);
            setTimeout(() => {
                setOpen(false);
                setClosing(false);
                onClose();
            }, 300);
        }
    };

    useImperativeHandle(modalRef, () => ({
        open() {
            if (!closing) {
                setOpen(true);
            }
        },
        close() {
            closeModalHandler();
        },
    }));

    const classes = cx({
        [size]: size,
        className,
    });
    return createPortal(
        <>
            {open && (
                <>
                    <div className={cx('root', { open, closing })}>
                        <div className={cx('wrapper', classes)}>
                            <div className={cx('header')}>
                                <p className={cx('title')}>{title}</p>
                                <button className={cx('close-btn')} onClick={closeModalHandler}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <div className={cx('body')}>{children}</div>
                            <div className={cx('footer')}>
                                <Button
                                    disabled={disabled}
                                    className={cx('btn', 'close')}
                                    size="md"
                                    onClick={closeModalHandler}
                                >
                                    Đóng
                                </Button>
                                <Button
                                    disabled={disabled}
                                    className={cx('btn', 'accept')}
                                    size="md"
                                    primary
                                    onClick={onAcceptClick}
                                >
                                    {acceptBtnText}
                                </Button>
                            </div>
                            {disabled && <div className={cx('disabled-layout')}></div>}
                        </div>
                        <div
                            className={cx('overlay', { open, closing })}
                            onClick={() => staticBackDrop || closeModalHandler()}
                        ></div>
                    </div>
                </>
            )}
        </>,
        document.querySelector('body'),
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
    onClose: PropTypes.func,
    onAcceptClick: PropTypes.func.isRequired,
    acceptBtnText: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    staticBackDrop: PropTypes.bool,
    modalRef: PropTypes.object,
};

export default Modal;
