import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../pages/Main";
import NotFfound from '../pages/NotFound';

export default function Router(){
    const router = createBrowserRouter([
        {
            path : '/',
            element: <Home/>,
            errorElement : <NotFfound/>,
            children:[
                {index : true, element: <Main/>},
                {path : '/:movieId', element : <Main/>}
                //:유동적인 경로(id 같은 것)
            ]
        }
    ])
    return <RouterProvider router={router}/>
}
