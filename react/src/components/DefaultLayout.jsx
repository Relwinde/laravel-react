import { Link, Navigate, Outlet } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout (){
    
    const {user, token, notification} = userStateContext ()

    const {setUser, setToken} = userStateContext()

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
        .then(() => {
            setToken(null)
            setUser({})
        })
        .catch(err => {
            const response = err.response

             

        }) 
    }

    // useEffect ( () => {
    //     axiosClient.get('/user')
    //     .then(({data}) => {
    //         setUser(data.user)
    //     })
    // })
    
    if (!token) {
        return <Navigate to="/login"/>
    }


    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        HEADER
                    </div>
                    <div>
                        {user.name}
                        <a href="" className="btn-logout" onClick={onLogout}> LogOut </a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>

           {notification && <div className="notification">
                {notification}
            </div>
            }
        </div>
    )
} 