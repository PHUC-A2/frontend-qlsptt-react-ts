import { Layout, Row, Col, Typography, Space } from "antd";
import { AiFillTikTok, AiFillYoutube } from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { SiZalo } from "react-icons/si";
import { Link } from "react-router";

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

const Footer = () => {
    return (
        <AntFooter
            style={{
                backgroundColor: "#1A2733",  // Xanh navy dịu
                color: "wheat",
                padding: "50px 60px",
            }}
        >
            <Row gutter={[32, 32]}>
                {/* Cột 1 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#faad14", marginBottom: 16 }}>
                        Về chúng tôi
                    </Title>
                    <Paragraph style={{ color: "wheat" }}>
                        FashionStore là một sàn thương mại điện tử mang đến trải nghiệm hiện đại,
                        tốc độ và thân thiện cho người dùng.
                    </Paragraph>
                </Col>

                {/* Cột 2 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#faad14", marginBottom: 16 }}>
                        Liên hệ
                    </Title>
                    <Space orientation="vertical" size="small">
                        <Text style={{ color: "wheat" }}>📍 123 Đường ABC, Sơn La</Text>
                        <Text style={{ color: "wheat" }}>📞 0123 456 789</Text>
                        <Text style={{ color: "wheat" }}>✉️ contact@email.com</Text>
                    </Space>
                </Col>

                {/* Cột 3 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#faad14", marginBottom: 16 }}>
                        Liên kết nhanh
                    </Title>
                    <Space orientation="vertical" size="small">
                        <Link to="/" style={{ color: "wheat" }}>Trang chủ</Link>
                        <Link to="/product" style={{ color: "wheat" }}>Sản phẩm</Link>
                        <Link to="/service" style={{ color: "wheat" }}>Dịch vụ</Link>
                        <Link to="/contact" style={{ color: "wheat" }}>Liên hệ</Link>
                        <Link to="/about" style={{ color: "wheat" }}>Giới thiệu</Link>
                    </Space>
                </Col>

                {/* Cột 4 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#faad14", marginBottom: 16 }}>
                        Mạng xã hội
                    </Title>
                    <Space size="middle" style={{ fontSize: 28 }}>
                        <Link to="https://web.facebook.com/" style={{ color: "wheat" }}>
                            <BiLogoFacebookCircle />
                        </Link>
                        <Link to="https://chat.zalo.me/" style={{ color: "wheat" }}>
                            <SiZalo />
                        </Link>
                        <Link to="https://www.tiktok.com/" style={{ color: "wheat" }}>
                            <AiFillTikTok />
                        </Link>
                        <Link to="https://www.youtube.com/" style={{ color: "wheat" }}>
                            <AiFillYoutube />
                        </Link>
                    </Space>
                </Col>
            </Row>

            <hr style={{ borderColor: "#faad14", margin: "30px 0" }} />

            <div style={{ textAlign: "center", color: "#faad14" }}>
                © {new Date().getFullYear()} Nhom 03.
                <span style={{ color: "#faad14" }}> All rights reserved.</span>
            </div>
        </AntFooter>
    );
};

export default Footer;