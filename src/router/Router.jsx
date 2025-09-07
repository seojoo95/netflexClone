import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
export default function Router(){
    const router = createBrowserRouter([
        {
            path : '/',
            element: <Home/>,
            errorElement : <NotFound/>,
        }
    ])
    return <RouterProvider router={router}/>
}
