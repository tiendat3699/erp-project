import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { usePageTitle } from '~/hooks';
import { authService, usersService } from '~/services';

function Page({ children, title = 'Erp Project', requriesAuth }) {
    usePageTitle(title);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const [authentiacted, setAuthentiacted] = useState(!requriesAuth || isLoggedIn);

    useEffect(() => {
        if (requriesAuth) {
            const HandelLogOut = async () => {
                await authService.logOut();
                setAuthentiacted(false);
            };

            const fetchUser = async () => {
                try {
                    await usersService.getCurrentUser();
                } catch (error) {
                    HandelLogOut();
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
