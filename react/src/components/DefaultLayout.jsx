import { Link, Navigate, Outlet } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout (){
    
    const {user, token} = userStateContext ()

    const onLogout = (ev) => {
        ev.DefaultLayout()
    }
    
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
        </div>
    )
} 