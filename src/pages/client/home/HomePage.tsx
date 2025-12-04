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
    Spin
} from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { productSelectors } from "../../../redux/selectors/productSelectors";
import { fetchProducts } from "../../../redux/thunks/productThunks";

const { Content } = Layout;
const { Meta } = Card;

const HomePage = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const listProducts = useAppSelector(productSelectors.selectAll);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchProducts())
            .finally(() => setLoading(false));
    }, []);

    return (
        <Layout style={{ marginTop: 103 }}>
            <Content style={{ padding: "24px" }}>

                {/* ---------------------- CAROUSEL ---------------------- */}
                <Carousel autoplay arrows autoplaySpeed={2500} style={{ marginBottom: 24 }}>
                    {[1, 2, 3, 5, 33].map((i) => (
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

                {/* ---------------------- DANH MỤC ---------------------- */}
                <h3 style={{ marginBottom: 16 }}>DANH MỤC</h3>

                <Spin spinning={loading}>
                    <Row gutter={[16, 16]}>
                        {listProducts.length > 0 ? (
                            listProducts.map((product, index) => (
                                <Col xs={12} sm={8} md={6} lg={6} xl={4} key={product.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                    >
                                        <Card
                                            hoverable
                                            style={{
                                                height: "100%",
                                                borderRadius: 12,
                                                border: "1px solid #f0f0f0",
                                            }}
                                            styles={{ body: { padding: 12 } }}
                                            cover={
                                                <Image
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    preview
                                                    style={{
                                                        objectFit: "contain",
                                                        height: 200,
                                                        padding: 8,
                                                    }}
                                                />
                                            }
                                        >
                                            {/* Click vào tên + giá để xem chi tiết */}
                                            <Link to={`/product-details/${product.id}`} className="nav-link">
                                                <Meta
                                                    title={<span className="card-title">{product.name}</span>}
                                                    description={
                                                        <span style={{ color: "#389e0d", fontWeight: 500 }}>
                                                            {product.price.toLocaleString()} VND
                                                        </span>
                                                    }
                                                />
                                            </Link>

                                            {/* Rating để ngoài Link để click được */}
                                            <div style={{ margin: "8px 0" }}>
                                                <Rate defaultValue={4} />
                                            </div>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))
                        ) : (
                            <Col span={24}>
                                <Space
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 200,
                                    }}
                                >
                                    <Empty description="Không có sản phẩm" />
                                </Space>
                            </Col>
                        )}
                    </Row>
                </Spin>
            </Content>
        </Layout>
    );
};

export default HomePage;
