import {createBrowserRouter, redirect} from "react-router-dom";

import {routes} from "constants/routes";
import CodePage from "pages/CodePage";
import DashboardPage from "pages/DashboardPage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import ListEditPage from "pages/List/ListEditPage";
import ListPage from "pages/List/ListPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";

const authRoutes = [
  {
    path: routes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: routes.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: routes.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
];

const listRoutes = [
  {
    path: routes.LIST,
    element: <ListPage />,
  },
  {
    path: routes.LIST_EDIT,
    element: <ListEditPage />,
  },
];

export const router = createBrowserRouter([
  ...authRoutes,
  ...listRoutes,
  {
    path: routes.CODE,
    element: <CodePage />,
  },
  {
    path: routes.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: routes.WILDCARD,
    loader: () => redirect("/login"),
  },
]);
