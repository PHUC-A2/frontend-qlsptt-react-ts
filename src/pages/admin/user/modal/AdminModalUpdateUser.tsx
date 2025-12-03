// import { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import type { IUser } from '../../../../types/user';
import { useAppDispatch } from '../../../../redux/hooks';
import { handleUpdateUser } from '../../../../redux/thunks/userThunks';
import { useEffect } from 'react';

interface IProps {
    openModalUpdateUser: boolean;
    setOpenModalUpdateUser: (v: boolean) => void;
    userUpdate: IUser | null;
}

const AdminModalUpdateUser = (props: IProps) => {
    const { openModalUpdateUser, setOpenModalUpdateUser, userUpdate } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();


    // const handleEditUser = async () => {
    //     try {
    //         if (!userUpdate?.id) {
    //             toast.error("ID người dùng không hợp lệ");
    //             return;
    //         }
    //         await dispatch(handleUpdateUser({ id: userUpdate.id, data: userUpdate })).unwrap();
    //         toast.success('Cập nhật người dùng thành công')
    //         setOpenModalUpdateUser(false);
    //         form.resetFields(); // dùng để xóa các giá trị sau khi đã submit
    //     } catch (error: any) {
    //         toast.error(error || "Lỗi khi cập nhật người dùng");
    //     }
    // }
    const handleEditUser = async () => {
        try {
            if (!userUpdate?.id) {
                toast.error("ID người dùng không hợp lệ");
                return;
            }

            const values = form.getFieldsValue(); // chỉ lấy name + email
            await dispatch(
                handleUpdateUser({
                    id: userUpdate.id,
                    data: values
                })
            ).unwrap();

            toast.success('Cập nhật người dùng thành công');
            setOpenModalUpdateUser(false);
            form.resetFields();

        } catch (error: any) {
            toast.error(error || "Lỗi khi cập nhật người dùng");
        }
    };

    useEffect(() => {
        if (openModalUpdateUser && userUpdate) {
            form.setFieldsValue({
                name: userUpdate.name,
                email: userUpdate.email
            });
        }
    }, [openModalUpdateUser, userUpdate]);

    return (
        <>
            <Modal
                title="Create a user"
                maskClosable={false}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openModalUpdateUser}
                okText="Save"
                onOk={() => form.submit()}
                onCancel={() => setOpenModalUpdateUser(false)}
            >
                <div>
                    <hr />
                    <Form
                        form={form}
                        onFinish={handleEditUser}
                        layout='vertical'
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: "email", message: 'Email is not valid!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}
export default AdminModalUpdateUser;