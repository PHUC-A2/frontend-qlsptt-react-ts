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
import { MdFeaturedPlayList, MdOutlineSecurity } from 'react-icons/md';
import { FaCircleUser } from 'react-icons/fa6';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../config/Api';
import { setLogoutUser } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
import { FaUserCog } from 'react-icons/fa';
import { AiOutlineProduct } from 'react-icons/ai';
import ModalProfile from '../../pages/auth/modal/ModalProfile';

const AdminSidebar = () => {

    // code
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [openModalProfile, setOpenModalProfile] = useState<boolean>(false);

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
            getItem(<Link to="/admin/user" style={{ color: "white", textDecoration: "none" }}>QL Người Dùng</Link>, '2', <UserOutlined />),
            getItem(<Link to="/admin/product" style={{ color: "white", textDecoration: "none" }}>QL Sản Phẩm</Link>, '3', <AiOutlineProduct />),
            getItem(<Link to="/admin/role" style={{ color: "white", textDecoration: "none" }}>QL Vai Trò</Link>, '4', <FaUserCog />),
            getItem(<Link to="/admin/permission" style={{ color: "white", textDecoration: "none" }}>QL Quyền Hạn</Link>, '5', <MdOutlineSecurity />),

        ]),
        getItem('Settings', 'sub2', <SettingOutlined />, [
            getItem(<Link to="/" style={{ color: "white", textDecoration: "none" }}>Client</Link>, '8', <UserOutlined />),
            getItem(<span onClick={() => setOpenModalProfile(true)}>Profile</span>, '9', <FaCircleUser />),
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

    // Chuỗi hiển thị
    const breadcrumbText = `path: ${breadcrumbItems.map(i => i.title).join(" / ")}`;

    return (
        <>
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
                        <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: breadcrumbText }]} />
                        {/* <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbText} /> */}
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
            <ModalProfile
                openModalProfile={openModalProfile}
                setOpenModalProfile={setOpenModalProfile}
            />
        </>
    )
}
export default AdminSidebar;