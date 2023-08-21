import { useEffect, useState } from "react"
import axiosClient from "../axios-client"

export default function Users (){

    const [users, setUsers] = useState(null)
    //A loading text untill the users are actually loaded
    const [loading, setLoading] = useState(false)


    // Because of strict mode in development mode this code will be executed twice
    useEffect(() =>{
        getUsers()
    }, [])

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({data})=> {
                setLoading(false)
                console.log(data)
            })
            .catch(()=>{
                setLoading(false)
            })
    }



    return (
        <div>           
            <div>
                <h1>Users</h1>

                <Link to= >Add new</Link>
            </div>
        </div>
    )
} 