import { Suspense, lazy } from 'react';
const { createBrowserRouter } = require('react-router-dom');

const Loading = <div>Loading....</div>;
const Main = lazy(() => import('../pages/Main'));
const About = lazy(() => import('../pages/About'));
const FindStore = lazy(() => import('../pages/Find_store'));
const Ranking = lazy(() => import('../pages/Ranking'));
const PickCrew = lazy(() => import('../pages/Pick_crew'));
const Sign_up = lazy(() => import('../pages/Sign_up'));
const Login = lazy(() => import('../pages/Login'));
const root = createBrowserRouter([
    {
        path: '',
        element: (
            <Suspense fallback={Loading}>
                <Main />
            </Suspense>
        ),
    },
    {
        path: '/about',
        element: (
            <Suspense fallback={Loading}>
                <About />
            </Suspense>
        ),
    },
    {
        path: '/find_store',
        element: (
            <Suspense fallback={Loading}>
                <FindStore />
            </Suspense>
        ),
    },
    {
        path: '/ranking',
        element: (
            <Suspense fallback={Loading}>
                <Ranking />
            </Suspense>
        ),
    },
    {
        path: '/pick_crew',
        element: (
            <Suspense fallback={Loading}>
                <PickCrew />
            </Suspense>
        ),
    },
    {
        path: '/sign_up',
        element: (
            <Suspense fallback={Loading}>
                <Sign_up />
            </Suspense>
        ),
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={Loading}>
                <login />
            </Suspense>
        ),
    },
]);

export default root;
