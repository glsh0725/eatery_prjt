import { Suspense, lazy } from 'react';
import UserProfile from "../pages/UserProfile";
const { createBrowserRouter } = require('react-router-dom');

const Loading = <div>Loading....</div>;
const Main = lazy(() => import('../pages/Main'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Login'));
const FindStore = lazy(() => import('../pages/Find_store'));
const Ranking = lazy(() => import('../pages/Ranking'));
const PickCrew = lazy(() => import('../pages/Pick_crew'));
const Sign_up = lazy(() => import('../pages/Sign_up'));
const Userinfo = lazy(() => import('../pages/Userinfo'));
const Find_userinfo = lazy(() => import('../pages/Find_userinfo'));
const MyPage = lazy(() => import('../pages/MyPage'));
const RestaurantDetail = lazy(() => import('../components/find_store/RestaurantDetail'));

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
        path: '/login',
        element: (
            <Suspense fallback={Loading}>
                <Login />
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
        path: '/find_store/:name',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <RestaurantDetail />
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
        path: '/userinfo',
        element: (
            <Suspense fallback={Loading}>
                <Userinfo />
            </Suspense>
        ),
    },
    {
        path: '/find_userinfo',
        element: (
            <Suspense fallback={Loading}>
                <Find_userinfo />
            </Suspense>
        ),
    },
    {
        path: '/myPage',
        element: (
            <Suspense fallback={Loading}>
                <MyPage />
            </Suspense>
        ),
    },
    {
        path: '/userprofile',
        element: (
            <Suspense fallback={Loading}>
                <UserProfile />
            </Suspense>
        ),
    },
]);

export default root;
