import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {auth} from "./http";
import AuthService from "./services/AuthService";
import {store} from "./redusers";
import Disk from "./components/disk/Disk";
import {toast, ToastContainer} from "react-toastify";
import Profile from "./components/profile/Profile";

import SizeBar from "./components/SizeBar";
import Hero from "./components/hero/Hero";




function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const isLoading = useSelector(state => state.user.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {

            if (localStorage.getItem('token')) {
                dispatch(AuthService.checkAuth())
            }

    }, [])


    if (isLoading) {
        return <div>Загрузка</div>
    }
    return (

        <BrowserRouter>

            <Navbar/>
            {isAuth && <SizeBar/>}
            {!isAuth ?
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes> :
                <Routes>
                    <Route path="/" element={<Disk/>}/>
                    <Route path="/profile" element={<Profile/>}/>
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
