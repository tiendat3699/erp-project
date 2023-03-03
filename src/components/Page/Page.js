import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { usePageTitle } from '~/hooks';
import { authService } from '~/services';
import { login, logOut } from '~/store/auth';

function Page({ children, title = 'Erp Project', requriesAuth }) {
    usePageTitle(title);

    const auth = useSelector((state) => state.auth);
    const [authentiacted, setAuthentiacted] = useState(auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        const HandelLogOut = async () => {
            await authService.logOut();
            setAuthentiacted(false);
            dispatch(logOut());
        };
        const fetchUser = async () => {
            const res = await authService.getCurrentUser();
            if (res.isError) {
                HandelLogOut();
            } else {
                dispatch(login(res));
            }
        };

        fetchUser();
    }, [dispatch]);

    if (requriesAuth) {
        if (!authentiacted) {
            return <Navigate to="/login" />;
        }
    }

    return children;
}

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

export default Page;
