import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import getSizeFormat from "./utils/sizeFormat";
import AuthService from "../services/AuthService";
import FileService from "../services/FileService";

const SizeBar = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const usedSpace =  useSelector(state => state.user.currentUser.usedSpace)
    const diskSpace = currentUser.diskSpace;
    useEffect(() => {

    }, [usedSpace])
    return (
        <div className="container is-justify-content-center p-4">

            {(usedSpace > 8053063680) ?
                <progress className="progress is-danger progress-container"
                          data-text={getSizeFormat(usedSpace)} value={usedSpace}
                          max={diskSpace}></progress>
                :
                <progress className="progress is-primary progress-container"
                          data-text={getSizeFormat(usedSpace) + '/' + getSizeFormat(diskSpace)} value={usedSpace}
                          max={diskSpace}></progress>
            }
        </div>
    );
};

export default SizeBar;