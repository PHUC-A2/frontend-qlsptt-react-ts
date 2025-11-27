import AdminSidebar from '../components/admin/AdminSidebar';
import '../styles/AdminLayout.scss'

const AdminLayout = () => {
    return (
        <div className="admin-layout-container">
            <div className="admin-sidebar-container">
                <AdminSidebar />
            </div>
        </div>
    )
}
export default AdminLayout;