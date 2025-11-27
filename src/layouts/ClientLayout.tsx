import { Outlet } from "react-router";
import '../styles/ClientLayout.scss'
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import '../styles/ClientLayout.scss'
const ClientLayout = () => {
    return (
        <div className="client-layout-container">
            <div className="client-header-container">
                <Header />
            </div>
            <div className="client-main-container">
                <Outlet />
            </div>
            <div className="client-footer-container">
                <Footer />
            </div>
        </div>
    )
}

export default ClientLayout;