import { Image, InputNumber, Modal, Upload, type GetProp, type UploadFile, type UploadProps } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import { useAppDispatch } from '../../../../redux/hooks';
import { handleCreateProduct } from '../../../../redux/thunks/productThunks';
import type { ICreateProductReq } from '../../../../types/product';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { uploadImageProduct } from '../../../../config/Api';

interface IProps {
    openModalAddProduct: boolean;
    setOpenModalAddProduct: (v: boolean) => void;
}


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


const AdminModalAddProduct = (props: IProps) => {
    const { openModalAddProduct, setOpenModalAddProduct } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );


    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        try {
            const res = await uploadImageProduct(file);
            const image_url = res.url;

            // Cập nhật form field "imageUrl"
            form.setFieldValue('image_url', image_url);

            // Cập nhật lại danh sách file
            setFileList([
                {
                    uid: file.uid || Date.now(),
                    name: file.name,
                    status: 'done',
                    url: image_url,
                    originFileObj: file,
                },
            ]);

            onSuccess?.();
            toast.success('Upload ảnh thành công');
        } catch (err) {
            console.error(err);
            onError?.(err);
            toast.error('Upload ảnh thất bại');
        }
    };

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

                        {/*Upload ảnh */}
                        <Form.Item label="Ảnh Sản Phẩm" required>
                            <Upload
                                listType="picture-circle"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                customRequest={handleUpload}
                                accept=".jpg,.jpeg,.png,.webp"
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                                {/* {fileList.length >= 8 ? null : uploadButton} */}
                            </Upload>
                            {previewImage && (
                                <Image
                                    style={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Form.Item>

                        <Form.Item
                            name="image_url"
                            hidden
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