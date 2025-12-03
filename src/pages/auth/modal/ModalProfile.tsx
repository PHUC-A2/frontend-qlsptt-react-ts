import { Drawer, Avatar, Descriptions, Divider, Typography } from 'antd';
import { UserOutlined, MailOutlined, CalendarOutlined, IdcardOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../redux/hooks';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const { Title } = Typography;

interface IProps {
    openModalProfile: boolean;
    setOpenModalProfile: (v: boolean) => void;
}

const ModalProfile = ({ openModalProfile, setOpenModalProfile }: IProps) => {
    const profile = useAppSelector(state => state.profile.profile);

    return (
        <Drawer
            title={<Title level={4} style={{ margin: 0 }}>Thông tin tài khoản</Title>}
            placement="right"
            closable
            onClose={() => setOpenModalProfile(false)}
            open={openModalProfile}
            style={{ width: 420 }} // width cố định, đẹp
        >
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
                style={{ padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}
            >
                {/* Avatar + Name */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Title level={4} style={{ marginTop: 12 }}>{profile?.name}</Title>
                    {/* <Tag
                        color={profile?.email_verified_at ? 'green' : 'orange'}
                        icon={profile?.email_verified_at ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                    >
                        {profile?.email_verified_at ? 'Đã xác thực' : 'Chưa xác thực'}
                    </Tag> */}
                </div>

                <Divider />

                {/* User Details */}
                <Descriptions
                    column={1}
                    size="middle"
                    bordered
                    styles={{
                        label: { fontWeight: 500, width: 150 },
                        content: { color: '#555' },
                    }}
                >
                    <Descriptions.Item label={<><MailOutlined /> Email</>}>
                        {profile?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label={<><CalendarOutlined /> Ngày tạo</>}>
                        {profile?.created_at ? dayjs(profile.created_at).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Cập nhật lần cuối">
                        {profile?.updated_at ? dayjs(profile.updated_at).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label={<><IdcardOutlined /> ID</>}>{profile?.id}</Descriptions.Item>
                </Descriptions>
            </motion.div>
        </Drawer>
    );
};

export default ModalProfile;
