import { Empty, Input, message, Popconfirm, type PopconfirmProps } from "antd";
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
import type { IUser } from "../../../types/user";
import AdminModalUpdateUser from "./modal/AdminModalUpdateUser";
import { CgAdd } from "react-icons/cg";
import AdminModalAssignRole from "./modal/AdminModalAssignRole";
import { fetchRoles } from "../../../redux/thunks/roleThunks";
import PermissionWrapper from "../../../components/wrapper/PermissionWrapper";
import { usePermission } from "../../../hooks/common/usePermission";
const { TextArea } = Input;

const AdminUserPage = () => {
    const listUsers = useAppSelector(userSelectors.selectAll);
    const dispatch = useAppDispatch();
    const [openModalAddUser, setOpenModalAddUser] = useState<boolean>(false);
    const [openModalUpdateUser, setOpenModalUpdateUser] = useState<boolean>(false);
    const [openModalGetUserDetails, setOpenModalGetUserDetails] = useState<boolean>(false);
    const [openModalAssignRole, setOpenModalAssignRole] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [userUpdate, setUserUpdate] = useState<IUser | null>(null);
    const [roleAssignRole, setRoleAssignRole] = useState<IUser | null>(null);
    const canGetUser = usePermission("GET_USER");
    const canGetUserDetail = usePermission("GET_USER_DETAIL");
    const canPostUser = usePermission("POST_USER");
    const canPutUser = usePermission("PUT_USER");
    const canDeleteUser = usePermission("DELETE_USER");
    const canAssignRole = usePermission("PUT_ASSIGN_ROLE");

    // assign role
    const handleAssignRole = async (data: IUser) => {
        setRoleAssignRole(data);
        setOpenModalAssignRole(true);
        await dispatch(fetchRoles()).unwrap();
    }

    // tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const term = searchTerm.toLowerCase();

    const filteredUsers = listUsers.filter((u: IUser) => {
        return (
            (u.name ?? "").toLowerCase().includes(term) ||
            (u.email ?? "").toLowerCase().includes(term)

        );
    });

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

    const handleEditUser = (data: IUser) => {
        setUserUpdate(data);
        setOpenModalUpdateUser(true);
    }

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Hủy thao tác');
    };

    useEffect(() => {
        if (canGetUser) {
            dispatch(fetchUsers());
        }
    }, [canGetUser]);
    return (
        <>
            {/* <PermissionWrapper required={["GET_USER","POST_USER"]}> */}
            <PermissionWrapper required={"GET_USER"}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan={5}>
                                <TextArea
                                    placeholder="Tìm kiếm theo name,email..."
                                    autoSize
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={5}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2>Danh sách người dùng</h2>
                                    <div>
                                        {
                                            canPostUser &&
                                            <Button className="d-flex align-items-center"
                                                variant="outline-primary"
                                                onClick={() => setOpenModalAddUser(true)}
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
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ?
                            (
                                filteredUsers.map((item: IUser, index: number) => (
                                    <tr key={item.id + 1}>
                                        <th>{index}</th>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <div className="d-flex justify-content-evenly">
                                                {
                                                    canGetUserDetail &&
                                                    <Button
                                                        variant="outline-success"
                                                        onClick={() => handleGetUserDetails(item.id)}
                                                    >
                                                        <FaRegEye />
                                                    </Button>
                                                }
                                                {
                                                    canPutUser &&
                                                    <Button
                                                        variant="outline-dark"
                                                        onClick={() => handleEditUser(item)}
                                                    >
                                                        <CiEdit />
                                                    </Button>
                                                }
                                                {
                                                    canDeleteUser &&
                                                    <Popconfirm
                                                        title="Xóa người dùng"
                                                        description="Bạn có chắc muốn xóa người dùng này không?"
                                                        onConfirm={() => handleDeleteUser(item.id)}
                                                        onCancel={cancel}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button variant="outline-danger">
                                                            <MdDelete />
                                                        </Button>
                                                    </Popconfirm>
                                                }
                                                {
                                                    canAssignRole &&
                                                    <Button
                                                        variant="outline-dark"
                                                        onClick={() => handleAssignRole(item)}
                                                    >
                                                        <CgAdd /> Gắn quyền
                                                    </Button>
                                                }
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
            </PermissionWrapper>

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

            <AdminModalUpdateUser
                openModalUpdateUser={openModalUpdateUser}
                setOpenModalUpdateUser={setOpenModalUpdateUser}
                userUpdate={userUpdate}
            />

            <AdminModalAssignRole
                openModalAssignRole={openModalAssignRole}
                setOpenModalAssignRole={setOpenModalAssignRole}
                roleAssignRole={roleAssignRole}
            />
        </>
    )
}

export default AdminUserPage;