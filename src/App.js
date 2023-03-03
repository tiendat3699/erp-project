import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';
import Page from './components/Page';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Comp = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Page title={route.title}>
                                        <Comp />
                                    </Page>
                                }
                            />
                        );
                    })}

                    {/* private router */}
                    {privateRoutes.map((route, index) => {
                        const Comp = route.component;
                        const Layout = route.layout || Fragment;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page title={route.title} requriesAuth>
                                            <Comp />
                                        </Page>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
