import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';
import './Register.scss';
import { useState } from 'react';
import { register } from '../../config/Api';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';
import { fetchUsers } from '../../redux/thunks/userThunks';
import type { IRegisterReq } from '../../types/auth';


const RegisterPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleRegister = async (data: IRegisterReq) => {
        // Trim toàn bộ dữ liệu trước khi gửi API
        const cleanedData: IRegisterReq = {
            ...data,
            name: data.name?.trim(),
            email: data.email?.trim(),
            password: data.password, // password giữ nguyên
        };

        setIsLoading(true);
        const minDelay = new Promise(resolve => setTimeout(resolve, 2000)); // tối thiểu 2 giây
        try {
            const res = await register(cleanedData);
            await minDelay;
            setIsLoading(false);
            if (res?.data?.status) {
                dispatch(fetchUsers());
                toast.success(res.data?.message);
                form.resetFields();
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error(
                    <div>
                        <div><strong>Có lỗi xảy ra!</strong></div>
                        <div>Đăng ký tài khoản thất bại!</div>
                    </div>
                );
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='register-container'>
            <div className="overlay"></div>

            <Form
                className='register-form'
                form={form}
                style={{ maxWidth: 460 }}
                onFinish={handleRegister}
                layout="vertical"
            >
                <Form.Item>
                    <Flex justify='center'>
                        <h1 className="register-title">ĐĂNG KÝ</h1>
                    </Flex>
                </Form.Item>

                <Form.Item
                    name="name"
                    // normalize={(v) => v.trim()}
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
                </Form.Item>

                <Form.Item
                    name="email"
                    normalize={(v) => v.trim()}
                    rules={[
                        { type: "email", message: 'Email không hợp lệ!' },
                        { required: true, message: 'Vui lòng nhập email!' }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type='primary'
                        block
                        htmlType="submit"
                        loading={isLoading}
                        className="btn-register"
                    >
                        Đăng ký
                    </Button>
                    <Flex className='mt-2' justify='space-between' align='center'>
                        <Link to={"/login"}>Đăng nhập nhanh!</Link>
                        <Link to={"#"}>Quên mật khẩu</Link>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterPage;