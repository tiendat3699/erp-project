import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { usePageTitle } from '~/hooks';
import { authService, userService } from '~/services';

function Page({ children, title = 'Erp Project', requriesAuth }) {
    usePageTitle(title);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn, shallowEqual);
    const [authentiacted, setAuthentiacted] = useState(!requriesAuth || isLoggedIn);

    useEffect(() => {
        if (requriesAuth) {
            const HandelLogOut = async () => {
                setAuthentiacted(false);
                await authService.logOut();
            };

            const fetchUser = async () => {
                try {
                    await userService.getCurrentUser();
                } catch (error) {
                    HandelLogOut();
                }
            };
            fetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return true ? children : <Navigate to="/login" replace />;
}

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    requriesAuth: PropTypes.bool,
};

export default Page;
