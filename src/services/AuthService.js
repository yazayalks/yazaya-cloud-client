import api from "../http";
import {setLoading, setUser} from "../redusers/sliceUserReducer";
import axios from "axios";

const url = process.env.REACT_APP_API_HOST

export default class AuthService{

    static registration = (email, password) => {
        return async dispatch => {
            try {
                const response = await api.post('api/auth/registration',
                    {
                        email,
                        password
                    })
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.accessToken)
                console.log(response)
            } catch (e) {
                console.log(e)
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
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.accessToken)
                console.log(response.data)
            } catch (e) {
                console.log(e)
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
            } catch (e) {
                console.log(e)
            }
            finally {
                dispatch(setLoading(false))
            }
        }
    }

}

