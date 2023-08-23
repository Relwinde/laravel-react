import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"

export default function UserForm (){

    const {id} = useParams()

    const navigate = useNavigate ();

    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState(null)
    
    const [user, setUser] = useState({
        id: null,
        name: '',
        email:'',
        password: '',
        password_confirmation: ''
    })

    

    if (id){
        useEffect ( () =>{
            setLoading(true)

            axiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    console.log(data)                    
                    // console.log(data.data)
                    setUser(data)                
                    // setUser(data.data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = (ev) =>{
        ev.preventDefault()
        if (user.id)
        {
            setLoading(true)
            
            axiosClient.put(`users/${user.id}`, user)
                .then(() => {
                    //TODO Show notification

                    setLoading(false)
                })
                .catch(err => {
                    const response = err.response

                    if (response && response.status == 422){
                        setErrors(response.data.errors)
                        setLoading(false)                
                    }
                })
        }
        else{
            setLoading(true)

            axiosClient.post(`users/`, user)
                .then(() => {
                    //TODO send notification

                    navigate('/users')
                    setLoading(false)
                })
                .catch(err => {
                    const response = err.response

                    if (response && response.status == 422){

                        setErrors(response.data.errors)
                        setLoading(false)
                    
                    }
                })
        }
    }   

    return (
        <>
            {user.id &&
                <h1>Update User: {user.name}</h1>
                }

            {!user.id &&
                <h1>New User</h1>
                }

            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading... </div>
                )}

                {errors && <dir className="alert" >
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </dir>}


                {   !loading && (

                    <form onSubmit={onSubmit}>
                        <input onChange={ev => setUser({...user, name: ev.target.value})} value={user.name} placeholder="Name" type="text"/>
                        <input onChange={ev => setUser({...user, email: ev.target.value})} value={user.email}placeholder="Email" type="email"/>
                        <input onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password" type="password"/>
                        <input onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation" type="password"/>

                        <button className="btn btn-block">Save</button>
                    </form>
                    
                    )

                }


            </div>
        </>
    )
}