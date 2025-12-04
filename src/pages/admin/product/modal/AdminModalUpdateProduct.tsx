import { InputNumber, Modal } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import { useAppDispatch } from '../../../../redux/hooks';
import { handleUpdateProduct } from '../../../../redux/thunks/productThunks';
import type { IProduct } from '../../../../types/product';
import { useEffect } from 'react';

interface IProps {
    openModalUpdateProduct: boolean;
    setOpenModalUpdateProduct: (v: boolean) => void;
    productUpdate: IProduct | null;
}

const AdminModalUpdateProduct = (props: IProps) => {
    const { openModalUpdateProduct, setOpenModalUpdateProduct, productUpdate } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();


    const handleEditProduct = async () => {
        try {
            if (!productUpdate?.id) {
                toast.error("ID sản phẩm không hợp lệ");
                return;
            }

            const values = form.getFieldsValue(); // chỉ lấy các field của form
            await dispatch(
                handleUpdateProduct({
                    id: productUpdate.id,
                    data: values
                })
            ).unwrap();

            toast.success('Cập nhật sản phẩm thành công');
            setOpenModalUpdateProduct(false);
            form.resetFields();

        } catch (error: any) {
            toast.error(error || "Lỗi khi cập nhật sản phẩm");
        }
    };

    useEffect(() => {
        if (openModalUpdateProduct && productUpdate) {
            form.setFieldsValue({
                name: productUpdate.name,
                image_url: productUpdate.image_url,
                description: productUpdate.description,
                type: productUpdate.type,
                price: productUpdate.price,
                quantity: productUpdate.quantity,
            });
        }
    }, [openModalUpdateProduct, productUpdate]);

    return (
        <>
            <Modal
                title=" Cập nhật sản phẩm"
                maskClosable={false}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openModalUpdateProduct}
                okText="Save"
                onOk={() => form.submit()}
                onCancel={() => setOpenModalUpdateProduct(false)}
            >
                <div>
                    <hr />
                    <Form
                        form={form}
                        onFinish={handleEditProduct}
                        layout='vertical'
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh"
                            name="image_url"
                            rules={[{ required: true, message: 'Vui lòng thêm ảnh!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phân loại"
                            name="type"
                            rules={[{ required: true, message: 'Vui lòng nhập phân loại!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}

                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}
export default AdminModalUpdateProduct;