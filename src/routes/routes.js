import Home from '~/pages/Home';
import Projects from '~/pages/Projects';
import { Login, SignUp, ForgetPass, ResetPass } from '~/pages/Authentication';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/forgetpass', component: ForgetPass },
    { path: '/resetpass', component: ResetPass },
];

const privateRoutes = [{ path: '/projects', component: Projects }];

export { publicRoutes, privateRoutes };
