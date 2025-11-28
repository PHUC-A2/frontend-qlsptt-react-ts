import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link } from 'react-router';
import './Register.scss';
import { GrPhone } from 'react-icons/gr';


const RegisterPage = () => {
    // const navigate = useNavigate();
    const [form] = Form.useForm();
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    // const handleRegister = async (data: ICreateUserReq) => {
    //     // Trim toàn bộ dữ liệu trước khi gửi API
    //     const cleanedData: ICreateUserReq = {
    //         ...data,
    //         name: data.name?.trim(),
    //         fullName: data.fullName?.trim(),
    //         email: data.email?.trim(),
    //         password: data.password, // password giữ nguyên
    //         phoneNumber: data.phoneNumber?.trim()
    //     };

    //     setIsLoading(true);
    //     const minDelay = new Promise(resolve => setTimeout(resolve, 2000)); // tối thiểu 2 giây
    //     try {
    //         const res = await register(cleanedData);
    //         await minDelay;
    //         setIsLoading(false);
    //         if (res?.data?.statusCode === 201) {
    //             toast.success('Đăng ký tài khoản thành công');
    //             form.resetFields();
    //             setTimeout(() => {
    //                 navigate('/login');
    //             }, 2000);
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
    //         setIsLoading(false);
    //     }
    // };

    return (
        <div className='register-container'>
            <div className="overlay"></div>

            <Form
                className='register-form'
                form={form}
                style={{ maxWidth: 460 }}
                // onFinish={handleRegister}
                layout="vertical"
            >
                <Form.Item>
                    <Flex justify='center'>
                        <h1 className="register-title">Sign up</h1>
                    </Flex>
                </Form.Item>

                <Form.Item
                    name="name"
                    // normalize={(v) => v.trim()}
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    normalize={(v) => v.trim()}
                    rules={[
                        { type: "email", message: 'The input is not valid E-mail!' },
                        { required: true, message: 'Please input your Email!' }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    normalize={(v) => v.trim()}
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input prefix={<GrPhone />} placeholder="Phone number" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type='primary'
                        block
                        htmlType="submit"
                        // loading={isLoading}
                        className="btn-register"
                    >
                        Register
                    </Button>
                    <Flex className='mt-2' justify='space-between' align='center'>
                        <Link to={"/login"}>Sign in now!</Link>
                        <Link to={"#"}>Forgot password</Link>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterPage;