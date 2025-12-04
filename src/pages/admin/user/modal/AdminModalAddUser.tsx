// import { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import type { ICreateUserReq } from '../../../../types/user';
import { useAppDispatch } from '../../../../redux/hooks';
import { handleCreateUser } from '../../../../redux/thunks/userThunks';

interface IProps {
    openModalAddUser: boolean;
    setOpenModalAddUser: (v: boolean) => void;
}

const AdminModalAddUser = (props: IProps) => {
    const { openModalAddUser, setOpenModalAddUser } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();


    const handleAddUser = async (data: ICreateUserReq) => {
        try {
            await dispatch(handleCreateUser(data)).unwrap();
            toast.success('Thêm mới người dùng thành công')
            setOpenModalAddUser(false);
            form.resetFields(); // dùng để xóa các giá trị sau khi đã submit
        } catch (error: any) {
            toast.error(error || "Lỗi khi tạo người dùng");
        }
    }

    return (
        <>
            <Modal
                title="Tạo mới người dùng"
                maskClosable={false}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openModalAddUser}
                okText="Save"
                onOk={() => form.submit()}
                onCancel={() => setOpenModalAddUser(false)}
            >
                <div>
                    <hr />
                    <Form
                        form={form}
                        onFinish={handleAddUser}
                        layout='vertical'
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: "email", message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}
export default AdminModalAddUser;