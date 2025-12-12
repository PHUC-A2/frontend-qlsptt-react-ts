import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ClientLayout from "../layouts/ClientLayout";
import HomePage from "../pages/client/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/error/NotFoundPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
import AdminUserPage from "../pages/admin/user/AdminUserPage";
import AdminProductPage from "../pages/admin/product/AdminProductPage";
import ProductPage from "../pages/client/product/ProductPage";
import AboutPage from "../pages/client/about/AboutPage";
import AdminPermissionPage from "../pages/admin/permission/AdminPermissionPage";
import AdminRolePage from "../pages/admin/role/AdminRolePage";

const router = createBrowserRouter([
    // client
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/product", element: <ProductPage /> },
            { path: "/about", element: <AboutPage /> },
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
            { path: "/admin/user", element: <AdminUserPage /> },
            { path: "/admin/product", element: <AdminProductPage /> },
            { path: "/admin/role", element: <AdminRolePage /> },
            { path: "/admin/permission", element: <AdminPermissionPage /> },
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