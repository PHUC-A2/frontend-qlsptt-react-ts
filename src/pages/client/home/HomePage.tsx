import { Carousel, Layout } from "antd";
import { Content } from "antd/es/layout/layout";

const HomePage = () => {
    return (
        <>
            <Layout style={{ marginTop: 103 }}>
                <Content style={{ padding: "24px" }}>
                    {/* Carousel */}
                    {/* Carousel Responsive */}
                    <Carousel autoplay arrows autoplaySpeed={2500} style={{ marginBottom: 24 }}>
                        {[1, 2, 3, 5, 6, 7, 8, 9, 10, 1].map((i) => (
                            <div key={i}>
                                <img
                                    src={`https://picsum.photos/seed/slide${i}/1200/600`}
                                    alt={`slide-${i}`}
                                    style={{
                                        width: "100%",
                                        height: "50vh",       // chiều cao theo % màn hình
                                        maxHeight: "400px",   // không quá cao ở PC
                                        minHeight: "200px",   // không quá thấp ở mobile
                                        objectFit: "cover",   // giữ tỉ lệ
                                        borderRadius: 12,
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>

                    <h3 style={{ marginBottom: 16 }}>DANH MỤC</h3>

                </Content>
            </Layout>
        </>
    )
}

export default HomePage;