import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const authenticated = false;
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
