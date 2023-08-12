import { Link} from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axios-client";
import { userStateContext } from "../contexts/ContextProvider";

export default function Signup (){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = userStateContext()

    const onSubmit = (ev)=>{
        ev.preventDefault()

        const payLoad = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value,
            password_confirmation : passwordConfirmationRef.current.value
        }

        console.log(payLoad)

        axiosClient.post('/signup', payLoad)
            .then(({data}) => {

                console.log (data)

                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {

                console.log(err)
                const response = err.response
                if (response && response.status == 422){
                    console.log(response.data.errors)
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Sign up for free</h1>
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="text" placeholder="Email Address" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Registered ? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div> 
    )
}