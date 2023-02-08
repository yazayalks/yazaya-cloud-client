import React, {useEffect, useState} from 'react';
import styles from './confirmDeleteFile.css'
import {useDispatch, useSelector} from "react-redux";
import {setConfirmDeleteDir} from "../../redusers/sliceFileReducer";
import FileService from "../../services/FileService";
import Input from "../utils/Input";

const ConfirmDeleteDir = () => {
    const confirmDisplay = useSelector(state => state.files.confirmDeleteDir)
    const nameDir = useSelector(state => state.files.nameDirForDelete)
    const idDir = useSelector(state => state.files.idDirForDelete)
    const dispatch = useDispatch()
    const [dirName, setDirName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {}, [errorMessage])

    function deleteClickHandler(e) {
        if(dirName === nameDir) {
        dispatch(FileService.deleteFile(idDir, dirName))
        dispatch(setConfirmDeleteDir('none'))
        } else {
            setErrorMessage('You entered an invalid directory name')
        }
    }

    function backClickHandler(e) {
        setErrorMessage('')
        setDirName('')
        dispatch(setConfirmDeleteDir('none'))
    }
    return (
        <div style={{display: confirmDisplay, minWidth:"300px"}} className="confirm-delete-file"
             onClick={(e) =>  backClickHandler(e)}>
            <div style={{maxWidth: "500px", top: "300px"}} className="container is-justify-content-center"
                 onClick={(event => event.stopPropagation())}>
                <article className="message is-danger">
                    <div className="message-header">
                        <p>Delete dir</p>
                        <button className="delete" aria-label="delete"
                                onClick={(e) =>  backClickHandler(e)}></button>
                    </div>
                    <div className="message-body">
                        Are you sure you want to delete the file <strong>{nameDir}</strong>?
                        To delete, enter the directory name.
                        <div className="mt-2">
                            <Input type="text" value={dirName} setValue={setDirName}
                                   placeholder="Enter name directory"/>
                        </div>
                        <div>{errorMessage}</div>
                        <div className="columns is-centered is-mobile mt-2">
                            <div className="column">
                                <button className="button is-fullwidth"
                                        onClick={(e) => backClickHandler(e)}>Back
                                </button>
                            </div>
                            <div className="column">
                                <button className="button is-fullwidth is-danger"
                                        onClick={(e) => deleteClickHandler(e)}>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ConfirmDeleteDir;