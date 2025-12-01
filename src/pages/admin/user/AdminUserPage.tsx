import { Empty, message, Popconfirm, type PopconfirmProps } from "antd";
import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUsers, handleRemoveUser } from "../../../redux/thunks/userThunks";
import { useEffect, useState } from "react";
import AdminModalAddUser from "./modal/AdminModalAddUser";

const AdminUserPage = () => {
    const listUsers = useAppSelector(state => state.user.data) || [];
    const dispatch = useAppDispatch();
    const [openModalAddUser, setOpenModalAddUser] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    // xóa user
    const handleDeleteUser = (id: number) => {
        dispatch(handleRemoveUser(id));
        dispatch(fetchUsers());
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
        </>
    )
}

export default AdminUserPage;