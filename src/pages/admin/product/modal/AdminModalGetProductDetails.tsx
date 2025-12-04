import { Descriptions, Drawer, Image } from "antd";
import dayjs from "dayjs";
import type { IProduct } from "../../../../types/product";
interface IProps {
    setOpenModalGetProductDetails: (v: boolean) => void;
    openModalGetProductDetails: boolean;
    product: IProduct | null;
}

const AdminModalGetProductDetails = (props: IProps) => {

    const { openModalGetProductDetails, setOpenModalGetProductDetails, product } = props;
    return (
        <Drawer
            title="Chi tiết sản phẩm"
            placement="right"
            closable={false}
            onClose={() => setOpenModalGetProductDetails(false)}
            open={openModalGetProductDetails}
        >
            <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="ID">{product?.id}</Descriptions.Item>
                <Descriptions.Item label="Tên">{product?.name ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Ảnh">{product?.image_url ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Ảnh">
                    {product?.image_url ? (
                        <Image
                            src={product?.image_url}
                            alt={product.name}
                            width={60}
                            height={60}
                            style={{ objectFit: "cover", borderRadius: 8 }}
                        />
                    ) : (
                        "N/A"
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Mô tả">{product?.description ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Giá">{product?.price ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Phân loại">{product?.type ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Số lượng">{product?.quantity ?? "N/A"}</Descriptions.Item>

                <Descriptions.Item label="Ngày tạo">
                    {product?.created_at ? dayjs(product.created_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày cập nhật">
                    {product?.updated_at ? dayjs(product.updated_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    )
}

export default AdminModalGetProductDetails;