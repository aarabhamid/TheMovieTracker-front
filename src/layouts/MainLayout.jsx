import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/header/header.jsx";
import Footer from "../components/footer/footer.jsx";

function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
