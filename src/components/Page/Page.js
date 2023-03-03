import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { usePageTitle } from '~/hooks';
import { authService } from '~/services';
import { login, logOut } from '~/stores/auth';

function Page({ children, title = 'Erp Project', requriesAuth }) {
    usePageTitle(title);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const [authentiacted, setAuthentiacted] = useState(!requriesAuth || isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (requriesAuth) {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return authentiacted ? children : <Navigate to="/login" replace />;
}

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    requriesAuth: PropTypes.bool,
};

export default Page;
