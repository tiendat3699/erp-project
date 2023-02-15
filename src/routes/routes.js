import Home from '~/pages/Home';
import Projects from '~/pages/Projects';
import DefaultLayout from '~/Layouts/DefaultLayout';
import { Login, SignUp, ForgetPass, ResetPass } from '~/pages/Authentication';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/forgetpass', component: ForgetPass },
    { path: '/resetpass', component: ResetPass },
];

const privateRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/projects', component: Projects, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
