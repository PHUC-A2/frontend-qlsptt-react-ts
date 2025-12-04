import { Layout, Typography, Row, Col, Card, Space } from "antd";
import { motion, type Variants } from "framer-motion";
import { UserOutlined, CodeOutlined, DatabaseOutlined, TeamOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// --- 1. ĐỊNH NGHĨA MÀU SẮC CHỦ ĐẠO ---
const COLORS = {
    BACKGROUND: "#a6b4c2ff",
    HEADING: "#faad14",
    TEXT: "wheat", // Màu chữ nhạt
    CARD_BG: "#2c3e50", // Màu nền Card tối hơn nền chính để tạo độ sâu
};

// --- 2. Định nghĩa Variants cho Animation ---
const pageVariants: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } },
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Thời gian trễ giữa các children
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
};

// --- 3. Component AboutPage ---

const AboutPage = () => {
    // --- Dữ liệu thành viên và công nghệ ---
    const teamMembers = [
        { id: 1, name: "Bàn Văn Phúc", role: "Nhóm trưởng, Full-stack Developer", icon: <UserOutlined /> },
        { id: 2, name: "Điêu Chính Sim", role: "Full-stack Developer", icon: <UserOutlined /> },
        { id: 3, name: "Tóc Ly Phôm Phon", role: "Full-stack Developer", icon: <UserOutlined /> },
    ];

    const techStack = [
        { id: 1, name: "Backend", detail: "Laravel (PHP)", icon: <CodeOutlined /> },
        { id: 2, name: "Frontend", detail: "React", icon: <CodeOutlined /> },
        { id: 3, name: "Database", detail: "MySQL", icon: <DatabaseOutlined /> },
    ];

    return (
        <Layout style={{ marginTop: 103, minHeight: "100vh", background: COLORS.BACKGROUND }}>
            <Content
                style={{
                    padding: "24px 15px 15px 15px",
                    maxWidth: 1200,
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                {/* ---------------------- TIÊU ĐỀ CHÍNH (MOTION) ---------------------- */}
                <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    style={{ textAlign: "center", marginBottom: 48 }}
                >
                    <Title level={1} style={{ color: COLORS.HEADING, fontSize: 48, letterSpacing: 2 }}>
                        GIỚI THIỆU NHÓM 03
                    </Title>
                    <Paragraph style={{ fontSize: 20, color: COLORS.TEXT, opacity: 0.8 }}>
                        Dự án: Xây dựng Hệ thống Sản phẩm Thời trang
                    </Paragraph>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* ---------------------- PHẦN 1: MÔ TẢ DỰ ÁN ---------------------- */}
                    <Row justify="center" style={{ marginBottom: 48 }}>
                        <Col xs={24} lg={18}>
                            <motion.div variants={itemVariants}>
                                <Card
                                    variant="borderless"
                                    style={{
                                        borderRadius: 16,
                                        background: COLORS.CARD_BG,
                                        borderBottom: `4px solid ${COLORS.HEADING}`,
                                        padding: "20px 0",
                                    }}
                                >
                                    <Title level={3} style={{ color: COLORS.HEADING, textAlign: "center", marginBottom: 24 }}>
                                        <CodeOutlined style={{ marginRight: 10 }} /> TỔNG QUAN DỰ ÁN
                                    </Title>
                                    <Paragraph style={{ color: COLORS.TEXT, fontSize: 16, lineHeight: 1.8, padding: "0 20px" }}>
                                        Dự án này tập trung xây dựng một hệ thống thương mại điện tử chuyên biệt về sản phẩm thời trang. Mục tiêu là tạo ra một nền tảng **hiệu suất cao** và **trải nghiệm người dùng mượt mà**. Hệ thống được thiết kế theo kiến trúc hiện đại, tách biệt hoàn toàn **Backend (API)** và **Frontend (UI)** để dễ dàng mở rộng và bảo trì.
                                    </Paragraph>
                                    <Paragraph style={{ color: COLORS.TEXT, fontSize: 16, lineHeight: 1.8, padding: "0 20px", borderTop: `1px dashed ${COLORS.TEXT}`, paddingTop: 16, opacity: 0.7 }}>
                                        <strong style={{ color: COLORS.HEADING }}>Thách thức:</strong> Đảm bảo khả năng xử lý dữ liệu sản phẩm lớn, tối ưu hóa tốc độ tải trang trên React và bảo mật giao dịch thông qua Laravel.
                                    </Paragraph>
                                </Card>
                            </motion.div>
                        </Col>
                    </Row>

                    {/* ---------------------- PHẦN 2: THÀNH VIÊN NHÓM ---------------------- */}
                    <Title level={2} style={{ color: COLORS.HEADING, textAlign: "center", marginTop: 40, marginBottom: 32 }}>
                        <TeamOutlined style={{ marginRight: 10 }} /> THÀNH VIÊN ĐỘI NGŨ
                    </Title>
                    <Row gutter={[24, 24]} justify="center">
                        {teamMembers.map(member => (
                            <Col xs={24} sm={12} md={8} key={member.id}>
                                <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: `0 10px 20px rgba(250, 173, 20, 0.2)` }}>
                                    <Card
                                        hoverable
                                        variant="borderless"
                                        style={{
                                            borderRadius: 12,
                                            textAlign: "center",
                                            background: COLORS.CARD_BG,
                                            minHeight: 180,
                                        }}
                                    >
                                        <Space orientation="vertical" size="middle">
                                            <div style={{ fontSize: 32, color: COLORS.HEADING }}>
                                                {member.icon}
                                            </div>
                                            <Title level={4} style={{ color: COLORS.TEXT, margin: 0 }}>
                                                {member.name}
                                            </Title>
                                            <Paragraph style={{ color: COLORS.HEADING, opacity: 0.9, fontWeight: 600, borderTop: `1px solid ${COLORS.HEADING}40`, paddingTop: 8 }}>
                                                {member.role}
                                            </Paragraph>
                                        </Space>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>

                    {/* ---------------------- PHẦN 3: CÔNG NGHỆ SỬ DỤNG ---------------------- */}
                    <Title level={2} style={{ color: COLORS.HEADING, textAlign: "center", marginTop: 56, marginBottom: 32 }}>
                        <DatabaseOutlined style={{ marginRight: 10 }} /> CÔNG NGHỆ CỐT LÕI
                    </Title>
                    <Row gutter={[24, 24]} justify="center">
                        {techStack.map(tech => (
                            <Col xs={24} sm={12} md={8} key={tech.id}>
                                <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: `0 10px 20px rgba(250, 173, 20, 0.2)` }}>
                                    <Card
                                        variant="borderless"
                                        style={{
                                            borderRadius: 12,
                                            textAlign: "center",
                                            background: COLORS.CARD_BG,
                                            minHeight: 120
                                        }}
                                    >
                                        <Title level={4} style={{ color: COLORS.HEADING, margin: 0 }}>
                                            {tech.name}
                                        </Title>
                                        <Paragraph style={{ color: COLORS.TEXT, fontSize: 18, fontWeight: 700, marginTop: 8 }}>
                                            {tech.detail}
                                        </Paragraph>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </motion.div>
            </Content>
        </Layout>
    );
};

export default AboutPage;