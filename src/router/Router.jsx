import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Intro from "../pages/Intro";
import Main from "../pages/Main";
import NotFfound from '../pages/NotFound';
import SearchResult from "../pages/SearchResult";

export default function Router(){
    const router = createBrowserRouter([
        {
            path : '/',
            element: <Home/>,
            errorElement : <NotFfound/>,
            children:[
                {index : true, element: <Intro/>},
                {path : '/:movieId', element : <Main/>},
                //:유동적인 경로(id 같은 것)
                {path : '/search', element : <SearchResult/>},
                {path : '/search/:movieId', element : <SearchResult/>}
            ]
        }
    ])
    return <RouterProvider router={router}/>
}
