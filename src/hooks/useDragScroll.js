import { useState, useEffect } from 'react';

function useDragScroll(ref) {
    const [scrollState, SetScroll] = useState({ isScrolling: false, clientX: 0, scrollX: 0 });

    useEffect(() => {
        const ele = ref.current;

        const mouseDownHandler = (e) => {
            ele.setAttribute('scrolling', true);
            SetScroll((prevState) => ({
                ...prevState,
                isScrolling: true,
                clientX: e.clientX,
            }));
        };

        const mouseMoveHandler = (e) => {
            if (scrollState.isScrolling) {
                // e.preventDefault();
                const x = scrollState.scrollX - e.clientX + scrollState.clientX;
                ele.scrollLeft = x;
                SetScroll((prevState) => ({
                    ...prevState,
                    scrollX: x,
                    clientX: e.clientX,
                }));
            }
        };

        const mouseupHandler = (e) => {
            if (scrollState.isScrolling) {
                ele.removeAttribute('scrolling');
                SetScroll((prevState) => ({
                    ...prevState,
                    isScrolling: false,
                    clientX: e.clientX,
                }));
            }
        };
        ele.addEventListener('mousedown', mouseDownHandler);
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseupHandler);
        return () => {
            ele.removeEventListener('mousedown', mouseDownHandler);
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseupHandler);
        };
    }, [ref, scrollState]);
}

export default useDragScroll;
