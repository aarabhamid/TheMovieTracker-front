import { createBrowserRouter } from "react-router-dom";
import SliderComponent from "./pages/homepage/homepage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import MoviePage from "./pages/moviepage/moviepage.jsx";
import TvShowPage from "./pages/tvshowpage/tvshowpage.jsx";
import PersonPage from "./pages/personpage/personpage.jsx";
import UpcomingMovies from "./pages/upcomingmovies/upcomingmovies.jsx";
import UpcomingTVShows from "./pages/upcomingtvshow/ontheairtvshow.jsx";
import SearchPage from "./pages/searchpage/searchpage.jsx";
import ErrorPage from "./pages/errorpage/errorpage.jsx";

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
            },
            {
                path: '/search',
                element: <SearchPage />,
            },
            {
                path: '*',
                element: <ErrorPage />,
            }
        ],
    },
]);

export default router;  
  