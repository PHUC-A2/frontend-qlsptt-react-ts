import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import './Login.scss';

const LoginPage = () => {
    const [form] = Form.useForm();
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const [loading, setLoading] = useState<boolean>(false);

    // const handleLogin = async (values: ILogin) => {
    //     try {
    //         setLoading(true);

    //         const minDelay = new Promise(resolve => setTimeout(resolve, 2000));

    //         const res = await login(values.username.trim(), values.password.trim()); // trim lần cuối

    //         await minDelay; // chạy spin 2s

    //         if (res?.data?.statusCode === 200) {
    //             const { access_token, user } = res.data.data;

    //             localStorage.setItem('access_token', access_token);
    //             dispatch(setUserLoginInfo({ access_token, user, isAuthenticated: true }));
    //             form.resetFields();

    //             const emailLogin = res?.data?.data?.user?.email;
    //             navigate(emailLogin === "admin@gmail.com" ? "/admin" : "/");
    //             toast.success('Đăng nhập thành công');
    //         }
    //     } catch (error: any) {
    //         const m = error?.response?.data?.message ?? "unknown";
    //         toast.error(
    //             <div>
    //                 <div><strong>Có lỗi xảy ra!</strong></div>
    //                 <div>{m}</div>
    //             </div>
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="login-container">
            <div className="overlay"></div>

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="login-form-wrapper"
            >
                <Form
                    form={form}
                    className="login-form"
                    // onFinish={handleLogin}
                    layout="vertical"
                >
                    <h1 className="login-title">Sign in</h1>

                    <Form.Item
                        name="username"
                        normalize={(value) => value?.trim()} // auto trim
                        rules={[
                            { type: "email", message: 'Email không hợp lệ!' },
                            { required: true, message: 'Vui lòng nhập Email!' }
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined />}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        normalize={(value) => value?.trim()} // auto trim
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined />}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            size="large"
                            htmlType="submit"
                            className="btn-login"
                        // loading={loading}
                        >
                            <span>Log in</span>
                        </Button>
                        <Flex className="mt-2" justify="space-between" align="center">
                            <Link to="/register">Sign up now!</Link>
                            <Link to="#">Forgot password?</Link>
                        </Flex>
                    </Form.Item>
                </Form>
            </motion.div>
        </div>
    );
};

export default LoginPage;