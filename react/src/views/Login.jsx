import { useRef, useState } from "react";
import { Link} from "react-router-dom";
import axiosClient from "../axios-client";
import { userStateContext } from "../contexts/ContextProvider";

export default function Login (){

    const [errors, setErrors] = useState(null)

    const {setUser, setToken} = userStateContext()

    const emailRef = useRef()
    const passwordRef = useRef()

    const onSubmit = (ev)=>{
        ev.preventDefault()

        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        setErrors(null)

        axiosClient.post('/login', payLoad)
            .then(({data})=>{
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                
                const response = err.response

                if (response && response.status == 422){

                    if (response.data.errors){
                        setErrors(response.data.errors)
                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
        

                }
            })

    }

    return (
           <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form action="" onSubmit={onSubmit}>
                        <h1 className="title">Loging into your account</h1>
                        {errors && <dir className="alert" >
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </dir> }
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <button className="btn btn-block" onSubmit={onSubmit}>Login</button>
                        <p className="message">
                            Not Registered ? <Link to="/signup">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div> 
    )
}