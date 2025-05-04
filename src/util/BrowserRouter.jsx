import { createBrowserRouter, Outlet } from "react-router-dom";
import Error from "../components/Error";
import Chat from "../components/Chat";
import Login from "../components/Login";

export const browserRouter = createBrowserRouter([
    {
        path:'/',
        element: <Outlet/>,
        errorElement:<Error/>,
        children:[
            {
                path: '/',
                element:<Login/>
            },
            {
                path: '/chat',
                element:<Chat/>
            },
        ]
    }
])