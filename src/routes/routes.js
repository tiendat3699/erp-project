import Home from '~/pages/Home';
import Projects from '~/pages/Projects';
// import { Login, SignIn } from '~/pages/Authentication';
import Authentication from '~/pages/Authentication';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Authentication },
    { path: '/signin', component: Authentication },
];

const privateRoutes = [{ path: '/projects', component: Projects }];

export { publicRoutes, privateRoutes };
