// src/pages/admin/AdminPage.tsx
import { Card, Col, Row, Statistic } from "antd";
import {
    FiUsers,
    FiPackage,
    FiShoppingCart,
    FiDollarSign,
} from "react-icons/fi";
import CountUp from "react-countup";
import { useAppSelector } from "../../redux/hooks";
import { productSelectors } from "../../redux/selectors/productSelectors";

const AdminPage = () => {
    const products = useAppSelector(productSelectors.selectAll);

    const productCount = products.length;

    const totalSold = products.reduce(
        (total, item) => total + Number(item.quantity),
        0
    );

    const totalRevenue = products.reduce(
        (total, item) =>
            total + Number(item.price) * Number(item.quantity),
        0
    );

    const numberFormatter = (value: number | string) => (
        <CountUp end={Number(value)} separator="," duration={1.2} />
    );

    const vndFormatter = (value: number | string) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(Number(value));

    const cards = [
        {
            title: "Người dùng",
            value: 112893,
            icon: <FiUsers size={28} color="#1890ff" />,
            color: "#e6f7ff",
        },
        {
            title: "Sản phẩm",
            value: productCount,
            icon: <FiPackage size={28} color="#faad14" />,
            color: "#fffbe6",
        },
        {
            title: "Số lượng đã bán",
            value: totalSold,
            icon: <FiShoppingCart size={28} color="#52c41a" />,
            color: "#f6ffed",
        },
        {
            title: "Doanh thu",
            value: totalRevenue,
            icon: <FiDollarSign size={28} color="#f5222d" />,
            color: "#fff1f0",
        },
    ];

    return (
        <div style={{ padding: 16 }}>
            <Row gutter={[16, 16]}>
                {cards.map((card) => (
                    <Col key={card.title} xs={24} sm={12} md={12} lg={6}>
                        <Card
                            hoverable
                            variant="borderless"
                            style={{
                                borderRadius: 12,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            }}
                            styles={{
                                body: {
                                    padding: 24,
                                    backgroundColor: card.color,
                                },
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                {card.icon}
                                <Statistic
                                    title={card.title}
                                    value={card.value}
                                    formatter={
                                        card.title === "Doanh thu"
                                            ? vndFormatter
                                            : numberFormatter
                                    }
                                />
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AdminPage;
