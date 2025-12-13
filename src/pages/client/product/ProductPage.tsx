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
    Typography,
    // Cập nhật Imports: Xóa InputNumber, THÊM Slider
    Select,
    // InputNumber, // Đã xóa
    Slider, // Đã thêm
    Button
} from "antd";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
// Sửa import Link về đúng package
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { productSelectors } from "../../../redux/selectors/productSelectors";
import { fetchProducts } from "../../../redux/thunks/productThunks";
import type { IProduct } from "../../../types/product";
import { ClearOutlined } from "@ant-design/icons";

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
    const searchTerm = useAppSelector((state: any) => state.search.searchTerm || "");

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);

    // --- XÁC ĐỊNH PHẠM VI GIÁ TUYỆT ĐỐI (Dùng cho Slider min/max) ---
    const priceBounds = useMemo(() => {
        if (listProducts.length === 0) return { min: 0, max: 1000000 };
        const prices = listProducts.map(p => p.price ?? 0);
        // Làm tròn xuống 1k gần nhất
        const min = Math.min(...prices, 0);
        // Làm tròn lên 100k gần nhất để có khoảng đệm
        const max = Math.max(...prices, 1000000);
        // Đảm bảo max > min
        return {
            min,
            max: max > min ? max : min + 1000000
        };
    }, [listProducts]);

    // --- STATE CHO BỘ LỌC MỚI ---
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    // Thay thế minPrice/maxPrice bằng Range Array [min, max]
    const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null);
    // State cục bộ để quản lý giá trị Slider trong khi kéo
    const [localPriceRange, setLocalPriceRange] = useState<[number, number] | null>(null);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchProducts())
            .finally(() => setLoading(false));
    }, [dispatch]);

    // Khởi tạo/Reset giá trị Slider khi dữ liệu được tải hoặc bounds thay đổi
    useEffect(() => {
        if (priceBounds.max > priceBounds.min && selectedPriceRange === null) {
            setSelectedPriceRange([priceBounds.min, priceBounds.max]);
            setLocalPriceRange([priceBounds.min, priceBounds.max]);
        }
    }, [priceBounds, selectedPriceRange]);


    // --- LẤY DANH SÁCH TYPE DUY NHẤT ---
    const uniqueTypes = useMemo(() => {
        const types = listProducts.map(p => p.type).filter(Boolean) as string[];
        return ["Tất cả", ...Array.from(new Set(types))];
    }, [listProducts]);

    // --- HÀM CLEAR BỘ LỌC CẬP NHẬT ---
    const handleClearFilters = () => {
        setSelectedType(undefined);
        // Reset phạm vi giá về min/max tuyệt đối
        setSelectedPriceRange([priceBounds.min, priceBounds.max]);
        setLocalPriceRange([priceBounds.min, priceBounds.max]);
        setCurrentPage(1);
    };

    // --- HÀM XỬ LÝ KHI NGƯỜI DÙNG KẾT THÚC KÉO SLIDER ---
    const handleSliderAfterChange = (value: number[]) => {
        // Kiểm tra an toàn, mặc dù Range Slider luôn trả về mảng 2 phần tử
        if (value.length === 2) {
            // Ép kiểu mảng number[] thành tuple [number, number] để cập nhật state
            setSelectedPriceRange(value as [number, number]);
            setCurrentPage(1);
        }
    }

    // Hàm format giá cho hiển thị
    const formatPrice = (price?: number): string => {
        if (price == null) return '';
        return Math.round(price)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
    };


    // --- LOGIC LỌC (Cập nhật sử dụng selectedPriceRange) ---
    const filteredListProducts = useMemo(() => {
        let filtered = listProducts;
        const term = searchTerm?.toLowerCase() || "";

        // 1. Lọc theo Search Term (Name, Price, Quantity)
        if (term) {
            filtered = filtered.filter((p: IProduct) => {
                return (
                    (p.name ?? "").toLowerCase().includes(term) ||
                    p.price?.toString().includes(term) ||
                    p.quantity?.toString().includes(term) ||
                    (p.type ?? "").toLowerCase().includes(term)
                );
            });
        }

        // 2. Lọc theo Type
        if (selectedType && selectedType !== "Tất cả") {
            filtered = filtered.filter(p => p.type === selectedType);
        }

        // 3. Lọc theo Price Range (Sử dụng Range Slider)
        if (selectedPriceRange && priceBounds.min !== priceBounds.max) {
            const [min, max] = selectedPriceRange;

            // Chỉ lọc nếu phạm vi được chọn không phải là phạm vi tuyệt đối (để tránh lọc vô ích)
            if (min > priceBounds.min || max < priceBounds.max) {
                filtered = filtered.filter(p => {
                    const price = p.price ?? 0;
                    return price >= min && price <= max;
                });
            }
        }

        return filtered;
    }, [listProducts, searchTerm, selectedType, selectedPriceRange, priceBounds]); // Thêm priceBounds vào dependencies

    // Tổng số sản phẩm ĐÃ LỌC
    const totalFilteredProducts = filteredListProducts.length;

    // --- BƯỚC PHÂN TRANG (Sử dụng dữ liệu đã lọc) ---
    const currentProducts = useMemo(() => {
        // Điều chỉnh trang hiện tại nếu kết quả lọc quá ít
        if (currentPage > 1 && filteredListProducts.length <= (currentPage - 1) * pageSize) {
            setCurrentPage(1);
            return filteredListProducts.slice(0, pageSize);
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredListProducts.slice(startIndex, endIndex);
    }, [filteredListProducts, currentPage, pageSize]);

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
                        marginBottom: 16,
                        textTransform: "uppercase",
                        color: TITLE_COLOR
                    }}>
                        {searchTerm ? `Kết Quả Tìm Kiếm (${totalFilteredProducts} sản phẩm)` : "Tất Cả Sản Phẩm"}
                    </Title>

                    {/* ---------------------- KHUNG LỌC SẢN PHẨM ---------------------- */}
                    <div style={{ marginBottom: 24, padding: 16, border: `1px solid ${TITLE_COLOR}`, borderRadius: 8, background: 'rgba(255, 255, 255, 0.1)' }}>
                        <Row gutter={[16, 16]} align="bottom">
                            {/* Lọc theo Loại (Type) */}
                            <Col xs={24} sm={12} md={6}>
                                <Typography.Text style={{ color: TITLE_COLOR, display: 'block', marginBottom: 4 }}>
                                    Lọc theo Loại
                                </Typography.Text>
                                <Select
                                    placeholder="Chọn loại sản phẩm"
                                    style={{ width: '100%' }}
                                    value={selectedType}
                                    onChange={(value) => {
                                        setSelectedType(value);
                                        setCurrentPage(1);
                                    }}
                                    options={uniqueTypes.map(type => ({
                                        value: type,
                                        label: type
                                    }))}
                                />
                            </Col>

                            {/* Lọc theo Khoảng Giá (SỬ DỤNG SLIDER) */}
                            <Col xs={24} sm={12} md={12}>
                                <Typography.Text style={{ color: TITLE_COLOR, display: 'block', marginBottom: 4 }}>
                                    Lọc theo Khoảng Giá:
                                    <span style={{ fontWeight: 'bold', marginLeft: 8 }}>
                                        {/* Hiển thị giá trị đang được chọn (localPriceRange) */}
                                        {localPriceRange ? `${formatPrice(localPriceRange[0])} - ${formatPrice(localPriceRange[1])}` : "Đang tải..."}
                                    </span>
                                </Typography.Text>
                                {
                                    // Kiểm tra điều kiện để render Slider
                                    localPriceRange && priceBounds.min !== priceBounds.max ? (
                                        <Slider
                                            range
                                            min={priceBounds.min}
                                            max={priceBounds.max}
                                            step={10000}
                                            value={localPriceRange}
                                            onChange={(value: number[]) => {
                                                setLocalPriceRange(value as [number, number]);
                                            }}
                                            onChangeComplete={handleSliderAfterChange}
                                            tooltip={{ formatter: formatPrice }}
                                            style={{ margin: '8px 0', color: TITLE_COLOR }}
                                        />
                                    ) : (
                                        <Typography.Text style={{ color: TEXT_COLOR }}>Đang tải phạm vi giá...</Typography.Text>
                                    )
                                }
                            </Col>

                            {/* Nút Xóa Bộ Lọc */}
                            <Col xs={24} md={6} style={{ textAlign: 'right', paddingTop: 8 }}>
                                <Button icon={<ClearOutlined />} onClick={handleClearFilters}>
                                    Xóa Bộ Lọc
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    {/* ------------------------------------------------------------------- */}

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
                                                                    {formatPrice(product.price)}
                                                                </span>
                                                                <div style={{ marginTop: 8 }}>
                                                                    <span style={{
                                                                        color: TITLE_COLOR,
                                                                        fontSize: "18px",
                                                                        // fontWeight: "bold"
                                                                    }}>
                                                                        Còn lại: {product.quantity}
                                                                    </span>
                                                                </div>
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
                                                    <span style={{ color: TEXT_COLOR }}>
                                                        Không tìm thấy sản phẩm nào
                                                        {(searchTerm || selectedType || (selectedPriceRange && (selectedPriceRange[0] > priceBounds.min || selectedPriceRange[1] < priceBounds.max))) && " phù hợp với bộ lọc."}
                                                    </span>
                                                }
                                            />
                                        </Space>
                                    </motion.div>
                                </Col>
                            )}
                        </Row>
                    </motion.div>
                </Spin>

                {totalFilteredProducts > 0 && (
                    <Row justify="center" style={{ marginTop: 32, marginBottom: 32 }}>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalFilteredProducts}
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

export default ProductPage;