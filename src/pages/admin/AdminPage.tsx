import PermissionWrapper from "../../components/wrapper/PermissionWrapper";

const AdminPage = () => {
    return (
        <>
            <div>
                {/* Nút Thêm sản phẩm chỉ hiển thị nếu user có quyền CREATE_PRODUCT */}
                <PermissionWrapper required="POST_PRODUCT">
                    <button className="btn btn-primary">Thêm sản phẩm</button>
                </PermissionWrapper>

                {/* Nút Xóa người dùng chỉ hiển thị nếu user có quyền DELETE_USER */}
                <PermissionWrapper required="DELETE_USER">
                    <button className="btn btn-danger">Xóa người dùng</button>
                </PermissionWrapper>
            </div>
        </>
    )
}
export default AdminPage;
