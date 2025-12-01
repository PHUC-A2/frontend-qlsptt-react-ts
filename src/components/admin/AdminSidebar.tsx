import React, { useState } from 'react';
import {
    DashboardOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { MdFeaturedPlayList } from 'react-icons/md';
import { AiOutlineProduct, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaBoxesPacking, FaCartPlus, FaCircleUser } from 'react-icons/fa6';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../config/Api';
import { setLogoutUser } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';

const AdminSidebar = () => {

    // code
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res?.data?.status) {
                dispatch(setLogoutUser())
                toast.success('Đăng xuất thành công');
                navigate('/');
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><b>Có Lỗi xảy ra!</b></div>
                    <div>{m}</div>
                </div>
            )
        }

    }

    const handleProfile = async () => {
        // console.log("Profile: ", profile);
    }

    const { Header, Content, Footer, Sider } = Layout;
    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem(<Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>, '1', <DashboardOutlined />),
        getItem('Feature', 'sub1', <MdFeaturedPlayList />, [
            getItem(<Link to="/admin/user" style={{ color: "white", textDecoration: "none" }}>QL User</Link>, '2', <UserOutlined />),
            getItem(<Link to="/admin/product" style={{ color: "white", textDecoration: "none" }}>QL Product</Link>, '3', <AiOutlineProduct />),
            getItem(<Link to="/admin/cart" style={{ color: "white", textDecoration: "none" }}>QL Cart</Link>, '4', <FaCartPlus />),
            getItem(<Link to="/admin/cart-item" style={{ color: "white", textDecoration: "none" }}>QL Cart Item</Link>, '5', <AiOutlineShoppingCart />),
            getItem(<Link to="/admin/order" style={{ color: "white", textDecoration: "none" }}>QL Order</Link>, '6', <BsFillJournalBookmarkFill />),
            getItem(<Link to="/admin/order-item" style={{ color: "white", textDecoration: "none" }}>QL Order Item</Link>, '7', <FaBoxesPacking />),

        ]),
        getItem('Settings', 'sub2', <SettingOutlined />, [
            getItem(<Link to="/" style={{ color: "white", textDecoration: "none" }}>Client</Link>, '8', <UserOutlined />),
            getItem(<span onClick={handleProfile}>Profile</span>, '9', <FaCircleUser />),
            getItem(<span onClick={handleLogout}>Log out</span>, '10', <LogoutOutlined />),
        ]),
    ];

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const location = useLocation();

    // Tách path theo dấu "/"
    const pathSnippets = location.pathname.split("/").filter(i => i);

    // Tạo mảng breadcrumb (chỉ text)
    const breadcrumbItems = pathSnippets.map((snippet) => ({
        title: snippet, // chỉ text, không bọc Link
    }));

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <h3>Chào mừng bạn đến với trang quản trị !</h3>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'admin/user' }]} /> */}
                    <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            overflowX: 'auto',
                            // overflowY:'auto'
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    )
}
export default AdminSidebar;