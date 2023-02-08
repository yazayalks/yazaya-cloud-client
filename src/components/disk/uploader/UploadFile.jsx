import React from 'react';
import styles from './uploadFile.css'
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../redusers/sliceUploadReduser";
const UploadFile = (props) => {
    const dispatch = useDispatch()
    return (
        <div>
            <div className="box is-grouped is-flex is-flex-wrap-wrap mb-3">

                <div className="control mb-3">
                    <div style={{width: "190px"}} className="title is-4">{props.file.name}</div>
                </div>
                <div className="control">
                    <button className="delete" aria-label="delete" onClick={() => dispatch(removeUploadFile(props.file.id))}></button>
                </div>
                <progress className="progress is-primary progress-container" data-text= {props.file.progress + '%'}   value={props.file.progress} max="100"></progress>

            </div>
        </div>
    );
};

export default UploadFile;