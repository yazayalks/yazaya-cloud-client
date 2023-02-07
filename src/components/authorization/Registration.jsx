import React, {useRef, useState} from 'react';
import Input from "../utils/Input";
import AuthService from "../../services/AuthService";
import {registration} from "../../http";
import {useDispatch, useSelector} from "react-redux";
import {setServerMessageConfirmRegister} from "../../redusers/sliceAppReducer";

const Registration = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const dispatch = useDispatch()
    const serverMessage = useSelector(state => state.app.serverMessageRegister)
    const serverMessageConfirmRegister = useSelector(state => state.app.serverMessageConfirmRegister)


    async function handleFormSubmit(evt) {
        evt.preventDefault();

        if (password !== passwordConfirm) {
            setError(true)
            return
        } else {
            setError(false)
        }
        dispatch(AuthService.registration(email, password, firstName, lastName, clearForm ))

    }

    function clearForm() {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
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
                {error &&
                    <p style={{color: 'red'}}>Passwords do not match</p>

                }
                <p style={{color: 'red'}}>{serverMessage}</p>
                <p style={{color: 'green'}}>{serverMessageConfirmRegister}</p>
                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <input type="submit" className="button is-primary" value="Register"/>
                    </div>
                </div>

            </form>
        </div>);
};

export default Registration;