import { Outlet } from "react-router-dom";
import Header from "../components/header/header.jsx";
import Footer from "../components/footer/footer.jsx";


function MainLayout() {
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
