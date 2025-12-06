import { Button, Result } from "antd";

// pages/error/Forbidden.tsx
const Forbidden = () => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Bạn không có quyền truy cập trang này."
            extra={<Button variant="outlined">Back Home</Button>}
        />
    );
};

export default Forbidden;
