import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';
import PrivateRoute from '~/components/PrivateRoute';
import Page from './components/Page';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}

                    {/* private router */}
                    <Route element={<PrivateRoute />}>
                        {privateRoutes.map((route, index) => {
                            const Comp = route.component;
                            const Layout = route.layout ?? Fragment;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page title={route.title}>
                                                <Comp />
                                            </Page>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
