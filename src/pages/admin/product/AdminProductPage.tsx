import { Empty, Image, Input, message, Popconfirm, type PopconfirmProps } from "antd";
import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { productSelectors } from "../../../redux/selectors/productSelectors";
import { useEffect, useState } from "react";
import { fetchProducts, handleFindProductById, handleRemoveProduct } from "../../../redux/thunks/productThunks";
import AdminModalAddProduct from "./modal/AdminModalAddProduct";
import { toast } from "react-toastify";
import AdminModalGetProductDetails from "./modal/AdminModalGetProductDetails";
import type { IProduct } from "../../../types/product";
import AdminModalUpdateProduct from "./modal/AdminModalUpdateProduct";
import PermissionWrapper from "../../../components/wrapper/PermissionWrapper";
import { usePermission } from "../../../hooks/common/usePermission";
const { TextArea } = Input;

const AdminProductPage = () => {
    const listProducts = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
    const [openModalGetProductDetails, setOpenModalGetProductDetails] = useState<boolean>(false);
    const [openModalUpdateProduct, setOpenModalUpdateProduct] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [productUpdate, setProductUpdate] = useState<IProduct | null>(null);
    const canGetProduct = usePermission("GET_PRODUCT");
    const canGetProductDetail = usePermission("GET_PRODUCT_DETAIL");
    const canPostProduct = usePermission("POST_PRODUCT");
    const canPutProduct = usePermission("PUT_PRODUCT");
    const canDeleteProduct = usePermission("DELETE_PRODUCT");
    const [loading, setLoading] = useState<boolean>(false);


    // tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const term = searchTerm.toLowerCase();

    const filteredProducts = listProducts.filter((p: IProduct) => {
        return (
            (p.name ?? "").toLowerCase().includes(term) ||
            (p.type ?? "").toLowerCase().includes(term) ||
            p.price?.toString().includes(term) ||
            p.quantity?.toString().includes(term)
        );
    });

    // xóa product
    const handleDeleteProduct = async (id: number) => {
        try {
            await dispatch(handleRemoveProduct(id)).unwrap();
            toast.success("Xóa sản phẩm thành công")
        } catch (error: any) {
            toast.error(error || "Lỗi khi xóa sản phẩm")
        }
    }

    // lấy product 
    const handleGetProductDetails = async (id: number) => {
        try {
            setLoading(true);
            setProduct(null);
            setOpenModalGetProductDetails(true);
            const data = await dispatch(handleFindProductById(id)).unwrap();
            setProduct(data);
        } catch (error: any) {
            toast.error(error || "Lỗi khi lấy sản phẩm")
            console.error("Lấy sản phẩm thất bại:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleEditProduct = (data: IProduct) => {
        setProductUpdate(data);
        setOpenModalUpdateProduct(true);
    }

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Hủy thao tác');
    };

    useEffect(() => {
        if (canGetProduct) {
            dispatch(fetchProducts());
        }
    }, [canGetProduct]);

    return (
        <>
            <PermissionWrapper required={"GET_PRODUCT"}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan={8}>
                                <TextArea
                                    placeholder="Tìm kiếm theo name, type, price, quantity..."
                                    autoSize
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={8}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2>Danh sách sản phẩm</h2>
                                    <div>
                                        {
                                            canPostProduct &&
                                            <Button className="d-flex align-items-center"
                                                variant="outline-primary"
                                                onClick={() => setOpenModalAddProduct(true)}
                                            >
                                                <AiOutlineUserAdd /> Thêm mới
                                            </Button>
                                        }
                                    </div>
                                </div>
                                <hr />
                            </th>
                        </tr>
                        <tr>
                            <th>STT</th>
                            <th>ID</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Ảnh</th>
                            <th>Loại</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ?
                            (
                                filteredProducts.map((item: IProduct, index: number) => (
                                    <tr key={item.id}>
                                        <th>{index + 1}</th>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {item?.image_url ? (
                                                <Image
                                                    src={item?.image_url}
                                                    alt={item.name}
                                                    width={60}
                                                    height={60}
                                                    style={{ objectFit: "cover", borderRadius: 8 }}
                                                />
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td>{item.type}</td>
                                        <td>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(item.price)}
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <div className="d-flex justify-content-evenly">
                                                {
                                                    canGetProductDetail &&
                                                    <Button
                                                        variant="outline-success"
                                                        onClick={() => handleGetProductDetails(item.id)}
                                                    >
                                                        <FaRegEye />
                                                    </Button>
                                                }
                                                {
                                                    canPutProduct &&
                                                    <Button
                                                        variant="outline-dark"
                                                        onClick={() => handleEditProduct(item)}
                                                    >
                                                        <CiEdit />
                                                    </Button>
                                                }
                                                {
                                                    canDeleteProduct &&
                                                    <Popconfirm
                                                        title="Xóa sản phẩm"
                                                        description="Bạn có chắc muốn xóa sản phẩm này không?"
                                                        onConfirm={() => handleDeleteProduct(item.id)}
                                                        onCancel={cancel}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button variant="outline-danger">
                                                            <MdDelete />
                                                        </Button>
                                                    </Popconfirm>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                            : (
                                <tr>
                                    <td colSpan={8} style={{ textAlign: "center", fontStyle: "italic" }}>
                                        <Empty description="Không có người dùng nào" />
                                    </td>
                                </tr>
                            )}

                    </tbody>
                </Table>
            </PermissionWrapper>

            {/* add */}
            <AdminModalAddProduct
                openModalAddProduct={openModalAddProduct}
                setOpenModalAddProduct={setOpenModalAddProduct}
            />

            {/* details */}
            <AdminModalGetProductDetails
                openModalGetProductDetails={openModalGetProductDetails}
                setOpenModalGetProductDetails={setOpenModalGetProductDetails}
                product={product}
                loading={loading}
            />

            {/* update */}
            <AdminModalUpdateProduct
                openModalUpdateProduct={openModalUpdateProduct}
                setOpenModalUpdateProduct={setOpenModalUpdateProduct}
                productUpdate={productUpdate}
            />
        </>
    )
}

export default AdminProductPage;