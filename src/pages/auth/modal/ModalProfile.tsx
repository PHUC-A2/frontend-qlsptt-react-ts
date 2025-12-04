import { Drawer, Avatar, Descriptions, Divider, Typography } from 'antd';
import { UserOutlined, MailOutlined, CalendarOutlined, IdcardOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../redux/hooks';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

interface IProps {
    openModalProfile: boolean;
    setOpenModalProfile: (v: boolean) => void;
}

const PRIMARY_COLOR = '#faad14';
const DRAWER_BACKGROUND_COLOR = '#f0f2f5'; // Màu nền xám nhạt cho Drawer

const ModalProfile = ({ openModalProfile, setOpenModalProfile }: IProps) => {
    const profile = useAppSelector(state => state.profile.profile);

    return (
        <Drawer
            title={<Title level={4} style={{ margin: 0, color: PRIMARY_COLOR }}>Thông tin tài khoản</Title>}
            placement="right"
            closable
            onClose={() => setOpenModalProfile(false)}
            open={openModalProfile}
            style={{ width: 420 }}
            // Đặt màu nền cho phần content của Drawer
            styles={{
                body: {
                    padding: 0,
                    backgroundColor: DRAWER_BACKGROUND_COLOR // Màu nền xám nhạt
                }
            }}
        >
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
                // Giữ background trắng bên trong motion.div để nội dung nổi bật
                style={{ padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', margin: 16 }}
            >
                {/* Avatar + Name */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                    <Avatar
                        size={100}
                        icon={<UserOutlined style={{ color: PRIMARY_COLOR }} />}
                        style={{ backgroundColor: '#2C3E50' }}
                    />
                    <Title level={4} style={{ marginTop: 12, color: '#333' }}>{profile?.name}</Title>
                </div>

                <Divider style={{ borderColor: PRIMARY_COLOR, margin: '16px 0' }} />

                {/* User Details */}
                <Descriptions
                    column={1}
                    size="middle"
                    bordered
                    styles={{
                        label: {
                            fontWeight: 600,
                            width: 150,
                            color: PRIMARY_COLOR,
                            backgroundColor: '#fffbe6'
                        },
                        content: { color: '#555' },
                    }}
                >
                    <Descriptions.Item
                        label={<Text style={{ color: PRIMARY_COLOR }}><MailOutlined /> Email</Text>}
                    >
                        {profile?.email}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label={<Text style={{ color: PRIMARY_COLOR }}><CalendarOutlined /> Ngày tạo</Text>}
                    >
                        {profile?.created_at ? dayjs(profile.created_at).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label={<Text style={{ color: PRIMARY_COLOR }}>Cập nhật lần cuối</Text>}
                    >
                        {profile?.updated_at ? dayjs(profile.updated_at).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label={<Text style={{ color: PRIMARY_COLOR }}><IdcardOutlined /> ID</Text>}
                    >
                        {profile?.id}
                    </Descriptions.Item>
                </Descriptions>
            </motion.div>
        </Drawer>
    );
};

export default ModalProfile;