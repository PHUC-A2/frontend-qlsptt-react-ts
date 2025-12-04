import {
    Card,
    Carousel,
    Col,
    Empty,
    Image,
    Layout,
    Rate,
    Row,
    Space,
    Spin,
    Typography
} from "antd";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router"; // Lưu ý: kiểm tra lại import này, thường là 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { productSelectors } from "../../../redux/selectors/productSelectors";
import { fetchProducts } from "../../../redux/thunks/productThunks";

const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;

// --- 1. Định nghĩa các Variants cho Animation ---

// Hiệu ứng cho container chứa danh sách (để kích hoạt stagger children)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Mỗi con xuất hiện cách nhau 0.1s
            delayChildren: 0.2,
        },
    },
};

// Hiệu ứng cho từng thẻ sản phẩm (Item)
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15, // Giảm độ rung để mượt hơn
        },
    },
};

const HomePage = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const listProducts = useAppSelector(productSelectors.selectAll);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchProducts())
            .finally(() => setLoading(false));
    }, [dispatch]);

    return (
        <Layout style={{ marginTop: 103, minHeight: "100vh", background: "#f5f5f5" }}>
            <Content style={{ padding: "24px", maxWidth: 1400, margin: "0 auto", width: "100%" }}>

                {/* ---------------------- CAROUSEL ---------------------- */}
                {/* Thêm hiệu ứng fade-in nhẹ cho Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Carousel autoplay arrows autoplaySpeed={3000} style={{ marginBottom: 32 }}>
                        {[1, 2, 3, 5, 33].map((i) => (
                            <div key={i}>
                                <div style={{ padding: "0 4px" }}> {/* Tạo khoảng hở nhỏ nếu cần */}
                                    <img
                                        src={`https://picsum.photos/seed/slide${i}/1200/600`}
                                        alt={`slide-${i}`}
                                        style={{
                                            width: "100%",
                                            height: "50vh",
                                            maxHeight: "450px",
                                            minHeight: "250px",
                                            objectFit: "cover",
                                            borderRadius: 20, // Bo tròn mềm mại hơn
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)", // Đổ bóng nhẹ
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </motion.div>

                {/* ---------------------- DANH MỤC ---------------------- */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Title level={3} style={{ marginBottom: 24, textTransform: "uppercase", color: "#2c3e50" }}>
                        Danh Mục Sản Phẩm
                    </Title>
                </motion.div>

                <Spin spinning={loading} size="large">
                    {/* Áp dụng containerVariants vào Row (thông qua motion.div wrapper hoặc prop nếu tương thích) */}
                    {/* Cách an toàn nhất với Antd Grid là bọc Row bằng motion.div để kích hoạt variants */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Row gutter={[24, 24]}>
                            {listProducts.length > 0 ? (
                                listProducts.map((product) => (
                                    <Col xs={12} sm={12} md={8} lg={6} xl={4} key={product.id}>
                                        <motion.div
                                            variants={cardVariants} // Kế thừa từ container
                                            whileHover={{
                                                y: -10, // Bay lên 10px
                                                scale: 1.03, // Phóng to nhẹ
                                                boxShadow: "0px 15px 30px rgba(0,0,0,0.15)", // Bóng đậm hơn
                                                transition: { duration: 0.3 }
                                            }}
                                            whileTap={{ scale: 0.95 }} // Hiệu ứng nhấn xuống
                                            style={{ height: "100%" }}
                                        >
                                            <Card
                                                hoverable
                                                variant="borderless" // Bỏ viền cứng để dùng shadow của motion đẹp hơn
                                                style={{
                                                    height: "100%",
                                                    borderRadius: 16,
                                                    overflow: "hidden", // Để ảnh không tràn ra khi bo góc
                                                }}
                                                styles={{ body: { padding: "16px" } }}
                                                cover={
                                                    <div style={{ overflow: "hidden", height: 200, padding: 12 }}>
                                                        <Image
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            preview={{ mask: "Xem chi tiết" }} // Thêm text cho mask
                                                            height={"100%"}
                                                            width={"100%"}
                                                            style={{
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                    </div>
                                                }
                                            >
                                                <Link to={`/product-details/${product.id}`} style={{ textDecoration: 'none' }}>
                                                    <Meta
                                                        title={
                                                            <div style={{
                                                                fontSize: "16px",
                                                                fontWeight: "600",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                color:"red"
                                                            }}>
                                                                {product.name}
                                                            </div>
                                                        }
                                                        description={
                                                            <div style={{ marginTop: 8 }}>
                                                                <span style={{
                                                                    color: "#faad14",
                                                                    fontSize: "18px",
                                                                    fontWeight: "bold"
                                                                }}>
                                                                    {product.price.toLocaleString()} ₫
                                                                </span>
                                                            </div>
                                                        }
                                                    />
                                                </Link>

                                                <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Rate disabled defaultValue={4} style={{ fontSize: 12 }} />
                                                    <span style={{ fontSize: 12, color: "#888" }}>Đã bán 1k+</span>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </Col>
                                ))
                            ) : (
                                <Col span={24}>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Space
                                            style={{
                                                width: "100%",
                                                height: 300,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Empty description="Không tìm thấy sản phẩm nào" />
                                        </Space>
                                    </motion.div>
                                </Col>
                            )}
                        </Row>
                    </motion.div>
                </Spin>
            </Content>
        </Layout>
    );
};

export default HomePage;
