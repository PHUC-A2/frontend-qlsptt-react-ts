import {
    Col,
    Image,
    Layout,
    Row,
    Typography,
    Divider,
    Space,
    Rate,
} from "antd";
import {
    ShoppingCartOutlined,
    ThunderboltOutlined,
    CheckCircleOutlined,
    AppstoreAddOutlined,
    BgColorsOutlined,
    InboxOutlined,
    StarFilled,
} from "@ant-design/icons";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "./ProductDetails.scss";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IProduct } from "../../../types/product";
import { getProductDetails } from "../../../config/Api";

const { Title, Text } = Typography;

const ProductPageDetails = () => {

    const [product, setProduct] = useState<IProduct | null>(null);

    // dùng param lấy id thay vì dùng Contex API
    const { id } = useParams<string>();

    const handleBuyNow = () => {
        toast.info("Chuyển sang trang thanh toán")
    }

    const fetchProductDetails = async () => {
        const res = await getProductDetails(Number(id));
        if (res?.data?.status === 200) {
            setProduct(res?.data?.data);
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const formatPrice = (price?: number): string => {
        if (price == null) return '';
        return Math.round(price)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
    };

    return (
        <>
            <div className="product-details-container">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Layout
                        style={{
                            background: "white",
                            padding: "24px",
                            borderRadius: "16px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                    >
                        <Row gutter={[32, 24]}>
                            {/* Cột trái: Ảnh sản phẩm */}
                            <Col xs={24} md={12}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Image
                                        src={product?.image_url || "https://picsum.photos/400/300?random=1"}
                                        preview={true}
                                        width={"100%"}
                                        style={{
                                            borderRadius: "12px",
                                            objectFit: "cover",
                                            height: 400,
                                        }}
                                        alt={product?.name}
                                    />
                                </motion.div>
                                <Row style={{ marginTop: "12px" }}>
                                    <Text strong>
                                        <CheckCircleOutlined style={{ color: "#389e0d" }} /> Địa chỉ:{" "}
                                    </Text>
                                    <Text style={{ marginLeft: "8px" }}>Hà Nội</Text>
                                </Row>
                            </Col>

                            {/* Cột phải: Thông tin sản phẩm */}
                            <Col xs={24} md={12}>
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    style={{ padding: "0 8px" }}
                                >
                                    <Title level={3} style={{ marginBottom: "12px", color: "#001529" }}>
                                        {product?.name}
                                    </Title>

                                    <Title level={4} style={{ color: "#faad14", marginBottom: "12px" }}>
                                        {formatPrice(product?.price)}
                                    </Title>

                                    {/* Đánh giá sao */}
                                    <Space orientation="horizontal" size="middle">
                                        <Rate defaultValue={4} character={<StarFilled />} style={{ color: "#faad14" }} />
                                        <Text type="secondary">(128 đánh giá)</Text>
                                    </Space>

                                    <Divider />

                                    <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
                                        <Text>
                                            <AppstoreAddOutlined style={{ color: "#faad14" }} />{" "}
                                            <strong>Loại:</strong> {product?.type || "Không xác định"}
                                        </Text>

                                        <Text>
                                            <BgColorsOutlined style={{ color: "#faad14" }} />{" "}
                                            <strong>Màu sắc:</strong> {"Không xác định"}
                                        </Text>

                                        <Text>
                                            <CheckCircleOutlined style={{ color: "#389e0d" }} />{" "}
                                            <strong>Tình trạng:</strong> {product ? "Mới 100%" : "Không xác định"}
                                        </Text>

                                        <Text>
                                            <ThunderboltOutlined style={{ color: "#faad14" }} />{" "}
                                            <strong>Trạng thái:</strong> {product?.quantity && product.quantity > 0 ? "Còn hàng" : "Hết hàng"}
                                        </Text>

                                        <Text>
                                            <InboxOutlined style={{ color: "#001529" }} />{" "}
                                            <strong>Số lượng tồn kho:</strong> {product?.quantity ?? 0}
                                        </Text>
                                    </Space>

                                    <Divider />

                                    {/* Nút thêm vào giỏ và mua ngay */}
                                    <Space size="large" wrap>
                                        <motion.div whileHover={{ scale: 1.05 }}>
                                            <Button
                                                onClick={() => toast.success("Thêm vào giỏ hàng thành công")}
                                                variant="dark"
                                                style={{
                                                    padding: "10px 24px",
                                                    borderRadius: "8px",
                                                    background: "#389e0d",
                                                    border: "none",
                                                    fontWeight: "500",
                                                    color: "white",
                                                    transition: "all 0.3s ease",
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.background = "#237804")}
                                                onMouseOut={(e) => (e.currentTarget.style.background = "#389e0d")}
                                            >
                                                <ShoppingCartOutlined /> Thêm Vào Giỏ
                                            </Button>
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.05 }}>
                                            <Button
                                                onClick={() => handleBuyNow()}
                                                variant="outline-dark"
                                                style={{
                                                    padding: "10px 24px",
                                                    borderRadius: "8px",
                                                    border: "2px solid #faad14",
                                                    background: "white",
                                                    color: "#faad14",
                                                    fontWeight: "500",
                                                    transition: "all 0.3s ease",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = "#faad14";
                                                    e.currentTarget.style.color = "white";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = "white";
                                                    e.currentTarget.style.color = "#faad14";
                                                }}
                                            >
                                                <ThunderboltOutlined /> Mua Ngay
                                            </Button>
                                        </motion.div>
                                    </Space>
                                </motion.div>
                            </Col>

                        </Row>

                        {/* Mô tả sản phẩm */}
                        <Divider style={{ margin: "32px 0" }} />
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Title level={4} style={{ color: "#001529" }}>
                                        Mô tả sản phẩm
                                    </Title>
                                    <Text
                                        type="secondary"
                                        style={{ fontSize: "15px", lineHeight: 1.7 }}
                                    >
                                        {product?.description}
                                        <br />
                                        Sản phẩm này được thiết kế tinh tế, kết hợp giữa chất liệu cao cấp và màu sắc hiện đại, mang lại trải nghiệm sử dụng thoải mái và bền bỉ. Với kiểu dáng sang trọng và chức năng
                                    </Text>
                                </Col>
                            </Row>
                        </motion.div>
                    </Layout>
                </motion.div>
            </div>
        </>
    );
};

export default ProductPageDetails;