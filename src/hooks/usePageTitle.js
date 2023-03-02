import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTile } from '~/app/pageSlice';

function usePageTitle(title) {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = `${title} – ERP Project`;
        dispatch(setTile(title));
    }, [dispatch, title]);
}

export default usePageTitle;
