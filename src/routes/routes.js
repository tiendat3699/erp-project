import Home from '~/pages/Home';
import Projects from '~/pages/Projects';
import { Login, SignIn } from '~/pages/Authentication';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signin', component: SignIn },
];

const privateRoutes = [{ path: '/projects', component: Projects }];

export { publicRoutes, privateRoutes };
