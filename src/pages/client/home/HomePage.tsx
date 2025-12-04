import {
    Card,
    Carousel,
    Col,
    Empty,
    Image,
    Layout,
    Pagination,
    Rate,
    Row,
    Space,
    Spin,
    Typography
} from "antd";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { productSelectors } from "../../../redux/selectors/productSelectors";
import { fetchProducts } from "../../../redux/thunks/productThunks";

// --- Hàm tiện ích: Tạo số nguyên ngẫu nhiên trong khoảng [min, max] ---
const createRandomInt = (min: number, max: number): number => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    // Công thức tạo số nguyên ngẫu nhiên
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

// --- Hàm tiện ích: Tạo mảng N số ngẫu nhiên ---
const generateRandomArray = (length: number, min: number, max: number): number[] => {
    return Array.from({ length }, () => createRandomInt(min, max));
};


const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;

// --- 1. Định nghĩa các Variants cho Animation ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

const HomePage = () => {
    const dispatch = useAppDispatch();
    const listProducts = useAppSelector(productSelectors.selectAll);

    // --- Bổ sung State cho Phân trang (Giữ nguyên) ---
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const totalProducts = listProducts.length;

    // --- TẠO MẢNG NGẪU NHIÊN CHO CAROUSEL ---
    const randomCarouselIndexes = useMemo(() => {
        // Tạo mảng 10 số ngẫu nhiên, ví dụ từ 1 đến 50 (để đảm bảo đa dạng ảnh)
        // Bạn có thể điều chỉnh phạm vi (min, max) này.
        return generateRandomArray(10, 1, 50);
    }, []); // Dependency rỗng: chỉ chạy MỘT LẦN khi component được mount

    useEffect(() => {
        setLoading(true);
        dispatch(fetchProducts())
            .finally(() => setLoading(false));
    }, [dispatch]);

    // --- Tính toán dữ liệu hiển thị trên trang hiện tại (Giữ nguyên) ---
    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return listProducts.slice(startIndex, endIndex);
    }, [listProducts, currentPage, pageSize]);

    // --- Hàm xử lý thay đổi trang/pageSize (Giữ nguyên) ---
    const handlePageChange = (page: number, newSize: number) => {
        if (newSize !== pageSize) {
            setPageSize(newSize);
            setCurrentPage(1);
        } else {
            setCurrentPage(page);
        }
        window.scrollTo({ top: 350, behavior: 'smooth' });
    };

    return (
        <Layout style={{ marginTop: 103, minHeight: "100vh", background: "#f5f5f5" }}>
            <Content
                style={{
                    padding: "24px 15px 15px 15px",
                    maxWidth: 1500,
                    margin: "0 auto",
                    width: "100%"
                }}
            >

                {/* ---------------------- CAROUSEL (ĐÃ DÙNG MẢNG NGẪU NHIÊN) ---------------------- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Carousel autoplay arrows autoplaySpeed={2500} style={{ marginBottom: 24 }}>
                        {/* SỬ DỤNG MẢNG NGẪU NHIÊN Ở ĐÂY */}
                        {randomCarouselIndexes.map((i) => (
                            <div key={i}>
                                <img
                                    src={`https://picsum.photos/seed/slide${i}/1200/600`}
                                    alt={`slide-${i}`}
                                    style={{
                                        width: "100%",
                                        height: "50vh",
                                        maxHeight: "400px",
                                        minHeight: "200px",
                                        objectFit: "cover",
                                        borderRadius: 12,
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </motion.div>

                {/* ---------------------- CÁC PHẦN KHÁC (Giữ nguyên) ---------------------- */}
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
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Row gutter={[24, 24]}>
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <Col xs={12} sm={12} md={8} lg={6} xl={4} key={product.id}>
                                        <motion.div
                                            variants={cardVariants}
                                            whileHover={{
                                                y: -10,
                                                scale: 1.03,
                                                boxShadow: "0px 15px 30px rgba(0,0,0,0.15)",
                                                transition: { duration: 0.3 }
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ height: "100%" }}
                                        >
                                            <Card
                                                hoverable
                                                variant="borderless"
                                                style={{
                                                    height: "100%",
                                                    borderRadius: 16,
                                                    overflow: "hidden",
                                                }}
                                                styles={{ body: { padding: "16px" } }}
                                                cover={
                                                    <div style={{ overflow: "hidden", height: 200, padding: 12 }}>
                                                        <Image
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            preview={{ mask: "Xem chi tiết" }}
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
                                                                color: "#2c3e50"
                                                            }}>
                                                                {product.name}
                                                            </div>
                                                        }
                                                        description={
                                                            <div style={{ marginTop: 8 }}>
                                                                <span style={{
                                                                    color: "#ff4d4f",
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

                {totalProducts > 0 && (
                    <Row justify="center" style={{ marginTop: 32, marginBottom: 32 }}>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalProducts}
                            showSizeChanger
                            pageSizeOptions={[4, 8, 12, 16, 20, 24]}
                            onChange={handlePageChange}
                            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`}
                        />
                    </Row>
                )}
            </Content>
        </Layout>
    );
};

export default HomePage;