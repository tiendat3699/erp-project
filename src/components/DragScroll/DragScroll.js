import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';

import styles from './DragScroll.module.scss';

const cx = classNames.bind(styles);

const initState = {
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
    clientY: 0,
    scrollY: 0,
};
function DragSroll({ className, children, horizontal = true, vertical = true }) {
    const [scrollState, SetScroll] = useState(initState);
    const ref = useRef();

    useEffect(() => {
        const ele = ref.current;

        const mouseMoveHandler = (e) => {
            if (scrollState.isScrolling) {
                let x, y;
                if (horizontal) {
                    x = scrollState.scrollX - e.clientX + scrollState.clientX;
                    ele.scrollLeft = x;
                }

                if (vertical) {
                    y = scrollState.scrollY - e.clientY + scrollState.clientY;
                    ele.scrollTop = y;
                }

                SetScroll((prevState) => ({
                    ...prevState,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    scrollX: ele.scrollLeft,
                    scrollY: ele.scrollTop,
                }));
            }
        };

        const mouseupHandler = (e) => {
            if (scrollState.isScrolling) {
                SetScroll((prevState) => ({
                    ...prevState,
                    isScrolling: false,
                    clientX: e.clientX,
                    clientY: e.clientY,
                }));
            }
        };
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseupHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseupHandler);
        };
    }, [horizontal, vertical, ref, scrollState]);

    const mouseDownHandler = (e) => {
        SetScroll((prevState) => ({
            ...prevState,
            isScrolling: true,
            clientX: e.clientX,
            clientY: e.clientY,
        }));
    };

    const scrollHandler = (e) => {
        const ele = ref.current;
        SetScroll((prevState) => ({
            ...prevState,
            scrollX: ele.scrollLeft,
            scrollY: ele.scrollTop,
        }));
    };

    const classes = cx('wrapper', { scrolling: scrollState.isScrolling }, className);

    return (
        <div className={classes} ref={ref} onMouseDown={mouseDownHandler} onScroll={scrollHandler}>
            {children}
        </div>
    );
}

DragSroll.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
};

export default DragSroll;
