import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.jsx";

const router = createBrowserRouter([
    {
        path: '/home',
        element: <HomePage />,
    }

]

    
);

export default router;