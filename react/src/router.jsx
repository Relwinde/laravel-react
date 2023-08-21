import {Navigate, createBrowserRouter} from "react-router-dom";
import Login from "./views/Login";
import Users from "./views/Users";
import Signup from "./views/Signup";
import NotFound from "./views/notfound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";


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
                path: '/users/new',
                element : <UserForm/>,
            },
            {
                path: '/users/:id',
                element : <UserForm/>,
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