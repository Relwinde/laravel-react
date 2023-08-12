import {Navigate, createBrowserRouter} from "react-router-dom";
import Login from "./views/login";
import Users from "./views/users";
import Signup from "./views/signup";
import NotFound from "./views/notfound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";


const router = createBrowserRouter ([
    {
        path : '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element : <Navigate to='/users'/>,
            },
            {
                path: '/users',
                element : <Users/>,
            },
            {
                path: '/dashboard',
                element : <Dashboard/>,
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element : <Login/>,
            },
            {
                path: '/signup',
                element : <Signup/>,
            },
        ]
    },
    {
        path: '*',
        element : <NotFound/>,
    },
])

export default router;