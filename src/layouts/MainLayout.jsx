import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/header/header.jsx";
import Footer from "../components/footer/footer.jsx";

function MainLayout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); // Déclenché à chaque changement de route

    return (
        <div>
            <div>
                <Header />
            </div>
            <main>
                <Outlet />
            </main>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
