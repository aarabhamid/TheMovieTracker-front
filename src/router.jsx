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
import TrendingMovieWeek from "./pages/trendingmovieweek/trendingmovieweek.jsx";
import TrendingTvWeek from "./pages/trendingtvweek/trendingtvweek.jsx";
import TrendingPersonWeek from "./pages/trendingpersonweek/trendingpersonweek.jsx";

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
                path: '/movies/upcoming',
                element: <UpcomingMovies />,
            },
            {
                path: '/movies/trending',
                element: <TrendingMovieWeek />,
            },
            {
                path: '/tvshows/airing-today',
                element: <UpcomingTVShows />,
            },
            {
                path: '/tvshows/trending',
                element: <TrendingTvWeek />,
            },
            {
                path: '/trending/people',
                element: <TrendingPersonWeek />,
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
  