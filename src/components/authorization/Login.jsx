import React, {useState} from 'react';
import Input from "../utils/Input";
import {useDispatch} from "react-redux";
import {login} from "../../http";
import AuthService from "../../services/AuthService";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    async function handleFormSubmit(evt) {
        evt.preventDefault();
        dispatch(AuthService.login(email, password))
    }

    return (
        <div style={{maxWidth: "500px", top: "100px"}} className="container is-justify-content-center">
            <form onSubmit={handleFormSubmit} className="box">
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <Input value={email} setValue={setEmail} type="email" placeholder="Enter Email"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <Input value={password} setValue={setPassword} type="password" placeholder="Enter password"/>
                    </div>
                </div>

                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <input type="submit" className="button is-primary" value="Login"/>
                    </div>
                </div>

            </form>
        </div>);
};

export default Login;