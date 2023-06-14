import {createBrowserRouter, redirect} from "react-router-dom";

import {routes} from "constants/routes";
import Cookies from "js-cookie";
import DashboardPage from "pages/DashboardPage";
import ListEditPage from "pages/List/ListEditPage";
import CodePage from "pages/Unauthorized/CodePage";
import ForgotPasswordPage from "pages/Unauthorized/ForgotPasswordPage";
import LoginPage from "pages/Unauthorized/LoginPage";
import RegisterPage from "pages/Unauthorized/RegisterPage";

import PasswordResetPage from "pages/Unauthorized/PasswordResetPage";
import {ReactNode} from 'react';

function loginCheck({auth, unauth}: {auth?: ReactNode | Response, unauth?: ReactNode | Response}): ReactNode | Response {
    return Cookies.get('token') ?
        auth ? auth : <></> :
        unauth ? unauth : <></>
}

const authRoutes = [
    {
        path: routes.LOGIN,
        loader: () => loginCheck({auth: redirect('/dashboard')}),
        element: <LoginPage />
    },
    {
        path: routes.REGISTER,
        loader: () => loginCheck({auth: redirect('/dashboard')}),
        element: <RegisterPage />
    },
    {
        path: routes.FORGOT_PASSWORD,
        loader: () => loginCheck({auth: redirect('/dashboard')}),
        element: <ForgotPasswordPage />
    },
    {
        path: routes.PASSWORD_RESET,
        loader: () => loginCheck({auth: redirect('/dashboard')}),
        element: <PasswordResetPage />
    }
];

const listRoutes = [
    {
        path: routes.LIST_EDIT,
        loader: () => loginCheck({unauth: redirect('/login')}),
        element: <ListEditPage />
    },
    {
        path: routes.LIST_VIEW,
        loader: () => loginCheck({unauth: redirect('/login')}),
        element: <>test</>
    }
];

export const router = createBrowserRouter([
    ...authRoutes,
    ...listRoutes,
    {
        path: routes.CODE,
        loader: () => loginCheck({unauth: redirect('/dashboard')}),
        element: <CodePage />
    },
    {
        path: routes.DASHBOARD,
        loader: () => loginCheck({unauth: redirect('/dashboard')}),
        element: <DashboardPage />
    },
    {
        path: routes.WILDCARD,
        loader: () => loginCheck({auth: redirect('/dashboard'), unauth: redirect('/login')})
    }
]);
