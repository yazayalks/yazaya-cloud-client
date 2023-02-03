import React, {useState} from 'react';
import Input from "../utils/Input";
import AuthService from "../../services/AuthService";
import {registration} from "../../http";
import {useDispatch} from "react-redux";

const Registration = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const dispatch = useDispatch()



    async function handleFormSubmit(evt) {
        evt.preventDefault();
        if (password !== passwordConfirm) {
            setError(true)
            return
        }
        dispatch(AuthService.registration(email, password))
    }

    return (
        <div style={{maxWidth: "500px", top: "100px"}} className="container is-justify-content-center">
            <form onSubmit={handleFormSubmit} className="box">

                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                        <Input value={firstName} setValue={setFirstName} type="text" placeholder="Enter First Name"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <Input value={lastName} setValue={setLastName} type="text" placeholder="Enter Last Name"/>
                    </div>
                </div>

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

                <div className="field">
                    <label className="label">Password confirm</label>
                    <div className="control">
                        <Input value={passwordConfirm} setValue={setPasswordConfirm} type="password"
                               placeholder="Enter password confirm"/>
                    </div>
                </div>
                {error&&<div>
                    <p style={{color: 'red'}}>Passwords do not match</p>
                </div>}
                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <input type="submit" className="button is-primary" value="Register"/>
                    </div>
                </div>

            </form>
        </div>);
};

export default Registration;