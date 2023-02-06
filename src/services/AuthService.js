import api from "../http";
import {setLoading, setUser} from "../redusers/sliceUserReducer";
import axios from "axios";
import {setServerMessageLogin, setServerMessageRegister} from "../redusers/sliceAppReducer";

const url = process.env.REACT_APP_API_HOST

export default class AuthService{

    static registration = (email, password, firstName, lastName) => {
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
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.accessToken)
                dispatch(setServerMessageRegister(""));
            } catch (e) {
                console.log(e)
                dispatch(setServerMessageRegister(e.response.data.message));
            }
        }
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

