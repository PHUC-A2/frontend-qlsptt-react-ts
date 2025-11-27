import { Result, Button } from "antd";
import { Link } from "react-router";
import { motion } from "framer-motion";

const NotFoundPage = () => {
    return (
        <div
            style={{
                background: "#001529",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Decorative floating circles */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15, scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                    background: "#faad14",
                    top: "10%",
                    left: "10%",
                    filter: "blur(60px)",
                }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15, scale: [1, 0.9, 1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: "#389e0d",
                    bottom: "10%",
                    right: "10%",
                    filter: "blur(80px)",
                }}
            />

            {/* Animated Result */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                style={{ zIndex: 1 }}
            >
                <Result
                    status="404"
                    title={
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                            style={{ color: "#faad14" }}
                        >
                            404
                        </motion.div>
                    }
                    subTitle={
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            style={{ color: "#389e0d", fontWeight: 500 }}
                        >
                            Ôi không! Trang bạn tìm kiếm không tồn tại.
                        </motion.div>
                    }
                    extra={
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                type="primary"
                                style={{
                                    background: "linear-gradient(135deg, #42503cff , #53b52aff)",
                                    border: "none",
                                    fontWeight: 600,
                                }}
                            >
                                <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Quay về Trang chủ</Link>
                            </Button>
                        </motion.div>
                    }
                />
            </motion.div>
        </div>
    );
};

export default NotFoundPage;