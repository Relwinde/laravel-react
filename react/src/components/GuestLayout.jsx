import { Navigate, Outlet } from "react-router-dom"
import { userStateContext } from "../contexts/ContextProvider"

export default function GuestLayout (){
    const {token} = userStateContext ()

    if (token) {
        return <Navigate to="/"/>
    }
    return (
        <div>

            FOR GUEST USER ONLY
            <Outlet/>
        </div>
    )
}