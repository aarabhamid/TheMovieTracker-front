import { createBrowserRouter } from "react-router-dom";
import SliderComponent from "./pages/homepage/homepage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import MoviePage from "./pages/moviepage/moviepage.jsx";
import TvShowPage from "./pages/tvshowpage/tvshowpage.jsx";
import PersonPage from "./pages/personpage/personpage.jsx";
import UpcomingMovies from "./pages/upcomingmovies/upcomingmovies.jsx";
import UpcomingTVShows from "./pages/upcomingtvshow/ontheairtvshow.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <SliderComponent />,
            },
            {
                path: '/movies/:id',
                element: <MoviePage />,
            }, 
            { 
                path: '/tv/:id',
                element: <TvShowPage />,
            },
            {
                path: '/person/:id',
                element: <PersonPage />,
            },
            {
                path: '/upcoming-movies',
                element: <UpcomingMovies />,
            },
            {
                path: '/tvshows/airing-today',
                element: <UpcomingTVShows />,
            }
        ],
    },
]);

export default router;  
  