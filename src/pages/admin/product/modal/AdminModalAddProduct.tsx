import { InputNumber, Modal } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import { useAppDispatch } from '../../../../redux/hooks';
import { handleCreateProduct } from '../../../../redux/thunks/productThunks';
import type { ICreateProductReq } from '../../../../types/product';

interface IProps {
    openModalAddProduct: boolean;
    setOpenModalAddProduct: (v: boolean) => void;
}

const AdminModalAddProduct = (props: IProps) => {
    const { openModalAddProduct, setOpenModalAddProduct } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();


    const handleAddProduct = async (data: ICreateProductReq) => {
        try {
            await dispatch(handleCreateProduct(data)).unwrap();
            toast.success('Thêm mới sản phẩm thành công')
            setOpenModalAddProduct(false);
            form.resetFields(); // dùng để xóa các giá trị sau khi đã submit
        } catch (error: any) {
            toast.error(error || "Lỗi khi tạo sản phẩm");
        }
    }

    return (
        <>
            <Modal
                title="Thêm mới sản phẩm"
                maskClosable={false}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openModalAddProduct}
                okText="Save"
                onOk={() => form.submit()}
                onCancel={() => setOpenModalAddProduct(false)}
            >
                <div>
                    <hr />
                    <Form
                        form={form}
                        onFinish={handleAddProduct}
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
export default AdminModalAddProduct;