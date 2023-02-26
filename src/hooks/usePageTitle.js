import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '~/actions/pageTitleAction';

function usePageTitle(title) {
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `${title} – ERP Project`;
        dispatch(setTitle(title));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title]);
}

export default usePageTitle;
