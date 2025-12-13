import { Empty, Input, message, Popconfirm, type PopconfirmProps } from "antd";
import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { roleSelectors } from "../../../redux/selectors/roleSelectors";
import type { IRole } from "../../../types/role";
import { fetchRoles, handleFindRoleById, handleRemoveRole } from "../../../redux/thunks/roleThunks";
import AdminModalGetRoleDetails from "./modal/AdminModalGetRoleDetails";
import AdminModalAddRole from "./modal/AdminModalAddRole";
import AdminModalUpdateRole from "./modal/AdminModalUpdateRole";
import AdminModalAssignPermission from "./modal/AdminModalAssignPermisison";
import { CgAdd } from "react-icons/cg";
import { fetchPermissions } from "../../../redux/thunks/permissionThunks";
import { usePermission } from "../../../hooks/common/usePermission";
import PermissionWrapper from "../../../components/wrapper/PermissionWrapper";
const { TextArea } = Input;

const AdminRolePage = () => {

    const listRoles = useAppSelector(roleSelectors.selectAll);
    const [openModalAddRole, setOpenModalAddRole] = useState<boolean>(false);
    const [openModalUpdateRole, setOpenModalUpdateRole] = useState<boolean>(false);
    const [openModalGetRoleDetails, setOpenModalGetRoleDetails] = useState<boolean>(false);
    const [openModalAssignPermisison, setOpenModalAssignPermisison] = useState<boolean>(false);
    const [role, setRole] = useState<IRole | null>(null);
    const [roleUpdate, setRoleUpdate] = useState<IRole | null>(null);
    const [roleAssignPermission, setRoleAssignPermission] = useState<IRole | null>(null);
    const dispatch = useAppDispatch();
    const canGetRole = usePermission("GET_ROLE");
    const canGetRoleDetail = usePermission("GET_ROLE_DETAIL");
    const canPostRole = usePermission("POST_ROLE");
    const canPutRole = usePermission("PUT_ROLE");
    const canDeleteRole = usePermission("DELETE_ROLE");
    const canAssignPermission = usePermission("POST_ASSIGN_PERMISSION");

    // tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const term = searchTerm.toLowerCase();

    const filteredRoles = listRoles.filter((u: IRole) => {
        return (
            (u.name ?? "").toLowerCase().includes(term)
        );
    });

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Hủy thao tác');
    };

    // assign permission
    const handleAssignPermisison = async (data: IRole) => {
        setRoleAssignPermission(data);
        setOpenModalAssignPermisison(true);
        await dispatch(fetchPermissions()).unwrap();
    }

    // detail
    const handleGetRoleDetails = async (id: number) => {
        try {
            setOpenModalGetRoleDetails(true);
            const data = await dispatch(handleFindRoleById(id)).unwrap();
            setRole(data);
        } catch (error: any) {
            toast.error(error || "Lỗi khi lấy role")
            console.error("Lấy user thất bại:", error);
        }
    }

    // delete
    const handleDeleteRole = async (id: number) => {
        try {
            await dispatch(handleRemoveRole(id)).unwrap();
            toast.success("Xóa role thành công")
        } catch (error: any) {
            toast.error(error || "Lỗi khi xóa role")
        }
    }

    // update
    const handleEditRole = (data: IRole) => {
        setOpenModalUpdateRole(true);
        setRoleUpdate(data);
    }

    useEffect(() => {
        if (canGetRole) {
            dispatch(fetchRoles());
        }
    }, [canGetRole]);

    return (
        <>

            <PermissionWrapper required={"GET_ROLE"}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan={5}>
                                <TextArea
                                    placeholder="Tìm kiếm theo tên..."
                                    autoSize
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={5}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2>Danh sách vai trò</h2>
                                    <div>
                                        {
                                            canPostRole &&
                                            <Button className="d-flex align-items-center"
                                                variant="outline-primary"
                                                onClick={() => setOpenModalAddRole(true)}
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
                            <th>Tên Role</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRoles.length > 0 ?
                            (
                                filteredRoles.map((item: IRole, index: number) => (
                                    <tr key={item.id + 1}>
                                        <th>{index}</th>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <div className="d-flex justify-content-evenly">
                                                {
                                                    canGetRoleDetail &&
                                                    <Button
                                                        variant="outline-success"
                                                        onClick={() => handleGetRoleDetails(item.id)}
                                                    >
                                                        <FaRegEye />
                                                    </Button>
                                                }
                                                {
                                                    canPutRole &&
                                                    <Button
                                                        variant="outline-dark"
                                                        onClick={() => handleEditRole(item)}
                                                    >
                                                        <CiEdit />
                                                    </Button>
                                                }
                                                {
                                                    canDeleteRole &&
                                                    <Popconfirm
                                                        title="Xóa vai trò"
                                                        description="Bạn có chắc muốn xóa vai trò này không?"
                                                        onConfirm={() => handleDeleteRole(item.id)}
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
                                                    canAssignPermission &&
                                                    <Button
                                                        variant="outline-dark"
                                                        onClick={() => handleAssignPermisison(item)}
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
                                        <Empty description="Không role nào" />
                                    </td>
                                </tr>
                            )}

                    </tbody>
                </Table>
            </PermissionWrapper>

            {/* add */}

            <AdminModalAddRole
                openModalAddRole={openModalAddRole}
                setOpenModalAddRole={setOpenModalAddRole}
            />

            <AdminModalUpdateRole
                openModalUpdateRole={openModalUpdateRole}
                setOpenModalUpdateRole={setOpenModalUpdateRole}
                roleUpdate={roleUpdate}
            />

            {/* detail */}
            <AdminModalGetRoleDetails
                openModalGetRoleDetails={openModalGetRoleDetails}
                setOpenModalGetRoleDetails={setOpenModalGetRoleDetails}
                role={role}
                setRole={setRole}
            />

            {/* assign permission */}

            <AdminModalAssignPermission
                openModalAssignPermisison={openModalAssignPermisison}
                setOpenModalAssignPermisison={setOpenModalAssignPermisison}
                roleAssignPermission={roleAssignPermission}
            />
        </>
    )
}

export default AdminRolePage;