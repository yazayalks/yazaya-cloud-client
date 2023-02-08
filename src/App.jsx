import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import AuthService from "./services/AuthService";
import Disk from "./components/disk/Disk";
import {ToastContainer} from "react-toastify";
import Profile from "./components/profile/Profile";
import SizeBar from "./components/SizeBar";
import Hero from "./components/hero/Hero";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const isActivated = useSelector(state => state.user.currentUser.isActivated)
    const isLoading = useSelector(state => state.user.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {

        if (localStorage.getItem('token')) {
            dispatch(AuthService.checkAuth())
        }

    }, [])


    if (isLoading) {
        return <div className="loader-container">
            <div className="lds-dual-ring"></div>
        </div>
    }
    return (

        <BrowserRouter>

            <Navbar/>
            {isAuth && isActivated && <SizeBar/>}
            {isAuth && isActivated ?
                <Routes>
                    <Route path="/" element={<Disk/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>

            }
            <Routes>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    );
}

export default App;
