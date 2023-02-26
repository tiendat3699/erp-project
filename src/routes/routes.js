import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faPager, faHandshake, faUsers } from '@fortawesome/free-solid-svg-icons';

import DefaultLayout from '~/Layouts/DefaultLayout';
import Home from '~/pages/Home';
import Projects from '~/pages/Projects';
import Customers from '~/pages/Customers';
import Partners from '~/pages/Partners';
import { Login, SignUp, ForgetPass, ResetPass } from '~/pages/Authentication';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/forgetpass', component: ForgetPass },
    { path: '/resetpass', component: ResetPass },
];

const privateRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
        title: 'Tổng quan',
        icon: <FontAwesomeIcon icon={faPager} />,
    },
    {
        path: '/projects',
        component: Projects,
        layout: DefaultLayout,
        title: 'Dự án',
        icon: <FontAwesomeIcon icon={faFolderOpen} />,
    },
    {
        path: '/customers',
        component: Customers,
        layout: DefaultLayout,
        title: 'Khách hàng',
        icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
        path: '/partners',
        component: Partners,
        layout: DefaultLayout,
        title: 'Đối tác',
        icon: <FontAwesomeIcon icon={faHandshake} />,
    },
];

export { publicRoutes, privateRoutes };
