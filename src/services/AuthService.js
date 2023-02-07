import api from "../http";
import {setLoading, setUser} from "../redusers/sliceUserReducer";
import axios from "axios";
import {
    setServerMessageConfirmRegister,
    setServerMessageLogin,
    setServerMessageRegister
} from "../redusers/sliceAppReducer";
import emailjs from '@emailjs/browser'
import {useSelector} from "react-redux";

const url = process.env.REACT_APP_API_HOST

export default class AuthService{

    static registration = (email, password, firstName, lastName) => {
        const isActivated = useSelector(state => state.user.currentUser.isActivated)
        const isAuth = useSelector(state => state.user.isAuth)
        return async dispatch => {
            try {
                const response = await api.post('api/auth/registration',
                    {
                        email,
                        password,
                        firstName,
                        lastName
                    })
                if (response === undefined) {
                    dispatch(setServerMessageRegister("The server is not working, contact the administrator to enable it and fix the error"));
                    return
                }

                this.sendActivationMail(email, `${process.env.REACT_APP_API_HOST}api/auth/activate/${response.data.user.activationLink}`)
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.accessToken)
                dispatch(setServerMessageRegister(""));
                if(isAuth && !isActivated) {
                    dispatch(setServerMessageConfirmRegister("Registration successful, please verify your email"));
                }
            } catch (e) {
                console.log(e)
                dispatch(setServerMessageRegister(e.response.data.message));
            }
        }
    }
    static sendActivationMail = (to, link) => {
        console.log("sendActivationMail")
        let templateParams = {
            to: to,
            link: link
        };

        console.log(to, link)
         emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
    }

    static fetchUsers() {
        return api.get('api/auth/users')
    }

    static login = (email, password) => {
        return async dispatch => {
            try {

                const response = await api.post('api/auth/login',
                    {
                        email,
                        password
                    })
                if (response === undefined) {
                    dispatch(setServerMessageLogin("The server is not working, contact the administrator to enable it and fix the error"));
                    return
                }
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.accessToken)
                dispatch(setServerMessageLogin(""));
                dispatch(setServerMessageConfirmRegister(""));
                dispatch(setServerMessageRegister(""));
            } catch (e) {
                console.log(e)
                dispatch(setServerMessageLogin(e.response.data.message));
            }
        }
    }

    static checkAuth = () => {
        return async dispatch => {
            dispatch(setLoading(true))
            try {
                const response = await axios.get(`${url}api/auth/refresh`, {withCredentials: true,})
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.accessToken)
                console.log("ААВВТОРИЗОВАН")
            } catch (e) {
                console.log(e)
                console.log("НЕААВВТОРИЗОВАН")
            }
            finally {
                dispatch(setLoading(false))
            }
        }
    }

}

