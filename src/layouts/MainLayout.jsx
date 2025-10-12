import { Outlet } from "react-router-dom";
import Header from "../components/header/header.jsx";


function MainLayout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
