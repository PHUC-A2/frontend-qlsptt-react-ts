import { Empty, Input, message, Popconfirm, type PopconfirmProps } from "antd";
import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import type { IPermission } from "../../../types/permission";
import { toast } from "react-toastify";
import AdminModalAddPermission from "./modal/AdminModalAddPermission";
import AdminModalUpdatePermission from "./modal/AdminModalUpdatePermission";
import AdminModalGetPermissionDetails from "./modal/AdminModalGetPermissionDetails";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { permissionSelectors } from "../../../redux/selectors/permissionSelectors";
import { fetchPermissions, handleFindPermissionById, handleRemovePermissison } from "../../../redux/thunks/permissionThunks";
import { usePermission } from "../../../hooks/common/usePermission";
import PermissionWrapper from "../../../components/wrapper/PermissionWrapper";
const { TextArea } = Input;

const AdminPermissionPage = () => {

    const listPermissions = useAppSelector(permissionSelectors.selectAll);
    const [openModalAddPermission, setOpenModalAddPermission] = useState<boolean>(false);
    const [openModalUpdatePermission, setOpenModalUpdatePermission] = useState<boolean>(false);
    const [openModalGetPermissionDetails, setOpenModalGetPermissionDetails] = useState<boolean>(false);
    const [permission, setPermission] = useState<IPermission | null>(null);
    const [permissionUpdate, setPermissionUpdate] = useState<IPermission | null>(null);
    const dispatch = useAppDispatch();
    const canGetPermission = usePermission("GET_PERMISSION");
    const canGetPermissionDetail = usePermission("GET_PERMISSION_DETAIL");
    const canPostPermission = usePermission("POST_PERMISSION");
    const canPutPermission = usePermission("PUT_PERMISSION");
    const canDeletePermission = usePermission("DELETE_PERMISSION");

    // tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const term = searchTerm.toLowerCase();

    const filteredPermissisons = listPermissions.filter((u: IPermission) => {
        return (
            (u.name ?? "").toLowerCase().includes(term) ||
            (u.description ?? "").toLowerCase().includes(term)

        );
    });

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Hủy thao tác');
    };

    // detail
    const handleGetPermissionDetails = async (id: number) => {
        try {
            setOpenModalGetPermissionDetails(true);
            const data = await dispatch(handleFindPermissionById(id)).unwrap();
            setPermission(data);
        } catch (error: any) {
            toast.error(error || "Lỗi khi lấy permission")
            console.error("Lấy user thất bại:", error);
        }
    }

    // delete
    const handleDeletePermission = async (id: number) => {
        try {
            await dispatch(handleRemovePermissison(id)).unwrap();
            toast.success("Xóa permission thành công")
        } catch (error: any) {
            toast.error(error || "Lỗi khi xóa permission")
        }
    }

    // update
    const handleEditPermission = (data: IPermission) => {
        setOpenModalUpdatePermission(true);
        setPermissionUpdate(data);
    }

    useEffect(() => {
        if (canGetPermission) {
            dispatch(fetchPermissions());
        }
    }, [canGetPermission]);

    return (
        <>

            <PermissionWrapper required={"GET_PERMISSION"}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan={5}>
                                <TextArea
                                    placeholder="Tìm kiếm theo tên,mô tả..."
                                    autoSize
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={5}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2>Danh sách quyền hạn</h2>
                                    <div>
                                        {
                                            canPostPermission &&
                                            <Button className="d-flex align-items-center"
                                                variant="outline-primary"
                                                onClick={() => setOpenModalAddPermission(true)}
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
                            <th>Tên Permission</th>
                            <th>Mô tả</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPermissisons.length > 0 ?
                            (
                                filteredPermissisons.map((item: IPermission, index: number) => (
                                    <tr key={item.id + 1}>
                                        <th>{index}</th>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <div className="d-flex justify-content-evenly">
                                                {
                                                    canGetPermissionDetail &&
                                                    <Button
                                                        variant="outline-success"
                                                        onClick={() => handleGetPermissionDetails(item.id)}
                                                    >
                                                        <FaRegEye />
                                                    </Button>
                                                }
                                                {
                                                    canPutPermission &&
                                                    <Button
                                                        variant="outline-dark"
                                                        onClick={() => handleEditPermission(item)}
                                                    >
                                                        <CiEdit />
                                                    </Button>
                                                }
                                                {
                                                    canDeletePermission &&
                                                    <Popconfirm
                                                        title="Xóa quyền hạn"
                                                        description="Bạn có chắc muốn xóa quyền hạn này không?"
                                                        onConfirm={() => handleDeletePermission(item.id)}
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
                                    <td colSpan={5} style={{ textAlign: "center", fontStyle: "italic" }}>
                                        <Empty description="Không permission nào" />
                                    </td>
                                </tr>
                            )}

                    </tbody>
                </Table>
            </PermissionWrapper>

            {/* add */}

            <AdminModalAddPermission
                openModalAddPermission={openModalAddPermission}
                setOpenModalAddPermission={setOpenModalAddPermission}
            />

            <AdminModalUpdatePermission
                openModalUpdatePermission={openModalUpdatePermission}
                setOpenModalUpdatePermission={setOpenModalUpdatePermission}
                permissionUpdate={permissionUpdate}
            />

            {/* detail */}
            <AdminModalGetPermissionDetails
                openModalGetPermissionDetails={openModalGetPermissionDetails}
                setOpenModalGetPermissionDetails={setOpenModalGetPermissionDetails}
                permission={permission}
                setPermission={setPermission}
            />
        </>
    )
}

export default AdminPermissionPage;