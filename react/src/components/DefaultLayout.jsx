import { Link, Navigate, Outlet } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout (){
    
    const {user, token} = userStateContext ()

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
                        USER INFO
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
} 