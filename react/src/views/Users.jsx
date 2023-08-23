import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { Link } from "react-router-dom"

export default function Users (){

    const [users, setUsers] = useState([])
    // bloqué pendant deux jours ici parceque => const [users, setUsers] = useState(null)

    //A loading text untill the users are actually loaded
    const [loading, setLoading] = useState(false)
    
    useEffect(() =>{
        getUsers()
    }, [])

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete this user ?")){
            return
        }

        axiosClient.delete(`/users/${u.id}`)
        .then(()=>{
            //TODO show notification

            getUsers()
        })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({data})=> {
                setLoading(false)
                setUsers(data.data)
                // console.log(data)
                
            })
            .catch(()=>{
                setLoading(false)
            })
    }


    // Because of strict mode in development mode this code will be executed twice

//    debugger



    return (
        <div>           
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <h1>Users</h1>
                <Link to= '/users/new' className="btn-add">Add new</Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>}
                        {users.map(u => (
                                <tr>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td><Link className="btn-edit" to={'/users/'+u.id}>Edit</Link></td>                                 
                                    <button onClick={ev => onDelete (u)}  className="btn-delete">DELETE</button>
                                </tr>
                            ))
                        }
                       
                    </tbody>
                </table>

            </div>
        </div>
    )
} 