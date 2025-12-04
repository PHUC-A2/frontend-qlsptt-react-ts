import {
    Card,
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
import type { IProduct } from "../../../types/product";

const PRIMARY_BACKGROUND = "#a6b4c2ff";
const TITLE_COLOR = "#faad14";
const TEXT_COLOR = "#faad14";

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


const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;


const ProductPage = () => {
    const dispatch = useAppDispatch();
    const listProducts = useAppSelector(productSelectors.selectAll);
    const searchTerm = useAppSelector(state => state.search.term);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const totalProducts = listProducts.length;

    useEffect(() => {
        setLoading(true);
        dispatch(fetchProducts())
            .finally(() => setLoading(false));
    }, [dispatch]);

    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return listProducts.slice(startIndex, endIndex);
    }, [listProducts, currentPage, pageSize]);

    const handlePageChange = (page: number, newSize: number) => {
        if (newSize !== pageSize) {
            setPageSize(newSize);
            setCurrentPage(1);
        } else {
            setCurrentPage(page);
        }
        window.scrollTo({ top: 350, behavior: 'smooth' });
    };

    // tìm kiếm
    const filteredProducts = currentProducts.filter((p: IProduct) => {
        return (
            (p.name ?? "").toLowerCase().includes(searchTerm) ||
            (p.type ?? "").toLowerCase().includes(searchTerm) ||
            p.price?.toString().includes(searchTerm) ||
            p.quantity?.toString().includes(searchTerm)
        );
    });

    return (
        <Layout style={{
            marginTop: 103,
            minHeight: "100vh",
            background: PRIMARY_BACKGROUND
        }}>
            <Content
                style={{
                    padding: "24px 15px 15px 15px",
                    maxWidth: 1500,
                    margin: "0 auto",
                    width: "100%",
                    color: TEXT_COLOR
                }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Title level={2} style={{
                        marginBottom: 24,
                        textTransform: "uppercase",
                        color: TITLE_COLOR
                    }}>
                        Tất Cả Sản Phẩm
                    </Title>
                </motion.div>

                <Spin spinning={loading} size="large">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Row gutter={[24, 24]}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
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
                                                    background: "#2C3E50"
                                                }}
                                                styles={{ body: { padding: "16px" } }}
                                                cover={
                                                    <div style={{ overflow: "hidden", height: 200, padding: 12, background: 'white' }}>
                                                        <Image
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            preview={{ mask: "Xem chi tiết" }}
                                                            height={"100%"}
                                                            width={"100%"}
                                                            style={{ objectFit: "contain" }}
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
                                                                color: TEXT_COLOR
                                                            }}>
                                                                {product.name}
                                                            </div>
                                                        }
                                                        description={
                                                            <div style={{ marginTop: 8 }}>
                                                                <span style={{
                                                                    color: TITLE_COLOR,
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
                                                    <Rate
                                                        disabled
                                                        defaultValue={4}
                                                        style={{ fontSize: 12, color: TITLE_COLOR }}
                                                    />
                                                    <span style={{ fontSize: 12, color: TEXT_COLOR }}>Đã bán 1k+</span>
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
                                            <Empty
                                                description={
                                                    <span style={{ color: TEXT_COLOR }}>Không tìm thấy sản phẩm nào</span>
                                                }
                                            />
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
                            style={{ color: TEXT_COLOR }}
                        />
                    </Row>
                )}
            </Content>
        </Layout>
    );
};

export default ProductPage;