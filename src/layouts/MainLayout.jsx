import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/header/header.jsx";
import Footer from "../components/footer/footer.jsx";

function MainLayout() {
    const { pathname } = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        if (navType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [pathname, navType]);

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
