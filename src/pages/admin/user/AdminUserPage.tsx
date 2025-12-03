import { Empty, message, Popconfirm, type PopconfirmProps } from "antd";
import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUsers, handleFindUserById, handleRemoveUser } from "../../../redux/thunks/userThunks";
import { useEffect, useState } from "react";
import AdminModalAddUser from "./modal/AdminModalAddUser";
import { userSelectors } from "../../../redux/selectors/userSelectors";
import { toast } from "react-toastify";
import AdminModalGetUserDetails from "./modal/AdminModalGetUserDetails";
import type { IUser } from "../../../types/backend";

const AdminUserPage = () => {
    const listUsers = useAppSelector(userSelectors.selectAll);
    const dispatch = useAppDispatch();
    const [openModalAddUser, setOpenModalAddUser] = useState<boolean>(false);
    const [openModalGetUserDetails, setOpenModalGetUserDetails] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    // xóa user
    const handleDeleteUser = async (id: number) => {
        try {
            await dispatch(handleRemoveUser(id)).unwrap();
            toast.success("Xóa người dùng thành công")
        } catch (error: any) {
            toast.error(error || "Lỗi khi xóa người dùng")
        }
    }

    // lấy user 
    const handleGetUserDetails = async (id: number) => {
        try {
            setOpenModalGetUserDetails(true);
            const data = await dispatch(handleFindUserById(id)).unwrap();
            setUser(data);
            // console.log("User vừa lấy:", data);
        } catch (error: any) {
            toast.error(error || "Lỗi khi lấy người dùng")
            console.error("Lấy user thất bại:", error);
        }
    }


    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Click on No');
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Bảng Người Dùng</h2>
                <div>
                    <Button className="d-flex align-items-center"
                        variant="outline-primary"
                        onClick={() => setOpenModalAddUser(true)}
                    >
                        <AiOutlineUserAdd /> Thêm mới
                    </Button>
                </div>
            </div>
            <hr />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.length > 0 ?
                        (
                            listUsers.map((item, index) => (
                                <tr key={item.id + 1}>
                                    <td>{index}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <div className="d-flex justify-content-evenly">
                                            <Button
                                                variant="outline-success"
                                                onClick={() => handleGetUserDetails(item.id)}
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
                                                title="Delete the user"
                                                description="Are you sure to delete this user?"
                                                onConfirm={() => handleDeleteUser(item.id)}
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
            <AdminModalAddUser
                openModalAddUser={openModalAddUser}
                setOpenModalAddUser={setOpenModalAddUser}
            />
            {/* details */}
            <AdminModalGetUserDetails
                openModalGetUserDetails={openModalGetUserDetails}
                setOpenModalGetUserDetails={setOpenModalGetUserDetails}
                user={user}
            />
        </>
    )
}

export default AdminUserPage;