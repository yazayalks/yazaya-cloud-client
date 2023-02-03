import React from 'react';
import {setPopupDisplay} from "../../../redusers/sliceFileReducer";
import Input from "../../utils/Input";
import UploadFile from "./UploadFile";
import styles from './uploader.css'
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../../redusers/sliceUploadReduser";

const Uploader = () => {

    const files = useSelector(state => state.uploader.files)
    const isVisible = useSelector(state => state.uploader.isVisible)
    const dispatch = useDispatch()
    return (isVisible &&
        <article
            className="message is-primary message-container">
            <div className="message-header">
                <p>Downloads</p>
                <button className="delete"
                        aria-label="delete"
                onClick={() => dispatch(hideUploader())}></button>
            </div>

                <div className="message-body message-body-container">
                    {files.map(file => <UploadFile key={file.id} file={file}/>)}
                </div>

        </article>
    );
};

export default Uploader;