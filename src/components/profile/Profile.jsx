import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import FileService from "../../services/FileService";
import avatarLogo from "../../assets/img/avatarLogo.svg";
import styles from './profile.css'
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${process.env.REACT_APP_API_HOST + currentUser.avatar}` : avatarLogo
    const navigate = useNavigate();

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(FileService.uploadAvatar(file))
    }

    return (
        <div>
            <div className="box">
                <div className="is-grouped is-flex is-flex-wrap-wrap">
                    <div className="control m-2">
                        <button className="button" onClick={() => {
                            navigate('/')
                        }}>Back
                        </button>
                    </div>
                </div>
            </div>

            <div className="container is-flex is-max-desktop is-justify-content-center is-align-items-center">
                <div style={{width: "300px", height: "350px", top: "50px"}} className="box m-3">
                    <div>
                        <img src={avatar} className="profile-avatar-image" alt=""/>
                    </div>
                    <p>
                        First name: {currentUser.firstName}
                    </p>
                    <p>
                        Last name: {currentUser.lastName}
                    </p>
                    <p>
                        Email: {currentUser.email}
                    </p>
                    <div className="columns is-centered is-mobile mt-3">
                        <div className="column p-1">
                            <div className="button  ">
                                <label htmlFor="file__upload-input" className="file-label">Choose a file…</label>
                                <input accept="image/*" multiple={false} className="file-input" type="file"
                                       id="file__upload-input"
                                       onChange={(event) => changeHandler(event)}/>
                                <i className="fa fa-upload"></i>
                            </div>
                        </div>
                        <div className="column p-1">
                            <button className="button is-fullwidth is-danger"
                                    onClick={() => dispatch(FileService.deleteAvatar())}>Delete avatar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;