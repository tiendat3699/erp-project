import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '~/store/page';

function usePageTitle(title) {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = `${title} – ERP Project`;
        dispatch(setTitle(title));
    }, [dispatch, title]);
}

export default usePageTitle;
