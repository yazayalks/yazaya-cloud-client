import React from 'react';
import styles from './confirmDeleteFile.css'
import {useDispatch, useSelector} from "react-redux";
import {setConfirmDeleteFile, setPopupDisplay} from "../../redusers/sliceFileReducer";
import FileService from "../../services/FileService";

const ConfirmDeleteFile = () => {
    const confirmDisplay = useSelector(state => state.files.confirmDeleteFile)
    const nameFile = useSelector(state => state.files.nameFileForDelete)
    const nameDir = useSelector(state => state.files.nameFileForDelete)
    const idFile = useSelector(state => state.files.idFileForDelete)
    const dispatch = useDispatch()

    function deleteClickHandler(e) {
        dispatch(FileService.deleteFile(idFile, nameDir))
        dispatch(setConfirmDeleteFile('none'))
    }

    return (
        <div style={{display: confirmDisplay, minWidth:"300px"}} className="confirm-delete-file"
             onClick={() => dispatch(setConfirmDeleteFile('none'))}>
            <div style={{maxWidth: "500px", top: "300px"}} className="container is-justify-content-center"
                 onClick={(event => event.stopPropagation())}>
                <article className="message is-danger">
                    <div className="message-header">
                        <p>Delete file</p>
                        <button className="delete" aria-label="delete"
                                onClick={() => dispatch(setConfirmDeleteFile('none'))}></button>
                    </div>
                    <div className="message-body">
                        Are you sure you want to delete the file <strong>{nameFile}</strong>?

                        <div className="columns is-centered is-mobile mt-2">
                            <div className="column">
                                <button className="button is-fullwidth"
                                        onClick={() => dispatch(setConfirmDeleteFile('none'))}>Back
                                </button>
                            </div>
                            <div className="column">
                                <button className="button is-fullwidth is-danger" onClick={(e) => deleteClickHandler(e)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ConfirmDeleteFile;