import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ClientLayout from "../layouts/ClientLayout";
import HomePage from "../pages/client/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/error/NotFoundPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";

const router = createBrowserRouter([
    // client
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/news", element: "" },
            { path: "/feedback", element: "" },
            { path: "/cart", element: "" },
        ]
    },

    // admin
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminPage /> },
        ]
    },


    // auth
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },

    /* cấu hình cho lỗi sai đường dẫn */
    {
        path: "*", // bất kỳ đường dẫn nào không match
        element: <NotFoundPage />
    }
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;