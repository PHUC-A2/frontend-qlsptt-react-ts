import { Empty, message, Popconfirm, type PopconfirmProps } from "antd";
import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { productSelectors } from "../../../redux/selectors/productSelectors";
import { useEffect, useState } from "react";
import { fetchProducts, handleRemoveProduct } from "../../../redux/thunks/productThunks";
import AdminModalAddProduct from "./modal/AdminModalAddProduct";
import { toast } from "react-toastify";

const AdminProductPage = () => {
    const listProducts = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    // xóa product
    const handleDeleteProduct = async (id: number) => {
        try {
            await dispatch(handleRemoveProduct(id)).unwrap();
            toast.success("Xóa sản phẩm thành công")
        } catch (error: any) {
            toast.error(error || "Lỗi khi xóa sản phẩm")
        }
    }

    // // lấy user 
    // const handleGetUserDetails = async (id: number) => {
    //     try {
    //         setOpenModalGetUserDetails(true);
    //         const data = await dispatch(handleFindUserById(id)).unwrap();
    //         setUser(data);
    //         // console.log("User vừa lấy:", data);
    //     } catch (error: any) {
    //         toast.error(error || "Lỗi khi lấy người dùng")
    //         console.error("Lấy user thất bại:", error);
    //     }
    // }

    // const handleEditUser = (data:IUser) => {
    //     setUserUpdate(data);
    //     setOpenModalUpdateUser(true);
    // }

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Hủy thao tác');
    };

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th colSpan={8}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h2>Bảng Sản Phẩm</h2>
                                <div>
                                    <Button className="d-flex align-items-center"
                                        variant="outline-primary"
                                        onClick={() => setOpenModalAddProduct(true)}
                                    >
                                        <AiOutlineUserAdd /> Thêm mới
                                    </Button>
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
                    {listProducts.length > 0 ?
                        (
                            listProducts.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{index + 1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.image_url}</td>
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
                                            <Button
                                                variant="outline-success"
                                            // onClick={() => handleGetUserDetails(item.id)}
                                            >
                                                <FaRegEye />
                                            </Button>
                                            <Button
                                                variant="outline-dark"
                                            // onClick={() => handleEditUser(item)}
                                            >
                                                <CiEdit />
                                            </Button>
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
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                        : (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center", fontStyle: "italic" }}>
                                    <Empty description="Không có người dùng nào" />
                                </td>
                            </tr>
                        )}

                </tbody>
            </Table>

            {/* add */}
            <AdminModalAddProduct
                openModalAddProduct={openModalAddProduct}
                setOpenModalAddProduct={setOpenModalAddProduct}
            />
        </>
    )
}

export default AdminProductPage;