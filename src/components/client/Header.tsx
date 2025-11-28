import { useState } from 'react';
import {
    LogoutOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Col, Input, Layout, Menu, Row, Space } from 'antd';
import { HiHome } from 'react-icons/hi';
import { IoMdLogIn, IoMdNotifications } from 'react-icons/io';
import { FaCircleUser, FaUserPlus } from 'react-icons/fa6';
import { AiFillDashboard } from 'react-icons/ai';
import { Link } from 'react-router';
import { FaShoppingBag, FaTshirt, FaUserCircle } from 'react-icons/fa';
import { RiInfoCardLine } from 'react-icons/ri';
import { SiImessage } from 'react-icons/si';
import './Header.scss'

type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {
    const items: MenuItem[] = [
        {
            label: <Link className='text-decoration-none' to={"/"}>Trang Chủ</Link>,
            key: 'home',
            icon: <HiHome className='header-home-icon' style={{ fontSize: 16 }} />,
        },
        {
            label: <Link className='text-decoration-none' to={"#product"}>Sản Phẩm</Link>,
            key: 'product',
            icon: <FaTshirt className='header-product-icon' style={{ fontSize: 16 }} />,
        },
        {
            label: <Link className='text-decoration-none' to={"#about"}>Giới thiệu</Link>,
            key: 'about',
            icon: <RiInfoCardLine className='header-about-icon' style={{ fontSize: 16 }} />,
        },
        {
            label: '',
            key: 'message',
            icon: (
                <Space size={24} >
                    <Badge size='small' count={2}>
                        <SiImessage className='header-message-icon' size={24} />
                    </Badge>
                </Space>
            ),
            className: 'header-message'
        },
        {
            label: '',
            key: 'notification',
            icon: (
                <Space size={24} >
                    <Badge size='small' count={2}>
                        <IoMdNotifications className='header-notification-icon' size={24} />
                    </Badge>
                </Space>
            ),
            className: 'header-notification'
        },
        {
            label: '',
            key: 'cart',
            icon: (
                <Space size={24}>
                    <Badge size='small' count={3}>
                        <Link to={"#cart"} className='nav-link'><FaShoppingBag className='header-cart-icon' size={24} /></Link>
                    </Badge>
                </Space>
            ),
            className: 'header-cart'
        },
        {
            label: '',
            key: 'setting',
            icon: (
                <Space size={24}>
                    <FaUserCircle className='header-setting-icon' size={24} />
                </Space>
            ),
            className: "header-setting",
            children: [
                {
                    type: 'group',
                    children: [
                        { label: <Link to={'/login'} className='text-decoration-none'>Đăng nhập</Link>, key: 'signin', icon: <IoMdLogIn /> },
                        { label: <Link to={'/register'} className='text-decoration-none'>Đăng ký</Link>, key: 'signup', icon: < FaUserPlus /> },
                        { label: <Link to={'/admin'} className='text-decoration-none'>Trang quản trị</Link>, key: 'admin', icon: <AiFillDashboard /> },
                        { label: <span>Tài khoản</span>, key: 'profile', icon: <FaCircleUser /> },
                        { label: <span >Đăng xuất</span>, key: 'logout', icon: <LogoutOutlined /> },
                    ],
                },
            ],
        },
    ];

    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };
    return (
        <div>
            <Layout>
                <Menu
                    style={{ display: "flex", flex: 1 }}
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal" items={items} />

                <Row style={{ padding: '1rem' }} justify="space-between" align="middle">
                    <Col>
                        <h2><Link to={'/'} style={{ margin: 0, color: "#faad14", textDecoration: 'none' }}>FashionStore</Link></h2>
                    </Col>
                    <Col span={12}>
                        <Input.Search
                            placeholder="Tìm kiếm sản phẩm..."
                            allowClear
                            size='large'
                            // onSearch={onSearch}
                            enterButton={<SearchOutlined />}
                        />
                    </Col>
                </Row>
            </Layout>
        </div>
    )
}
export default Header;