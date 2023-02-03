import React, {useState} from 'react';
import Input from "../utils/Input";
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay, setSearchMod} from "../../redusers/sliceFileReducer";
import FileService from "../../services/FileService";
import styles from './popup.css'

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function createDirHandler() {
        dispatch(FileService.createDir(currentDir, dirName))
        setDirName('')
        dispatch(setPopupDisplay('none'))
        dispatch(setSearchMod(false))
    }

    return (
        <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay, minWidth:"300px"}}>
            <div style={{maxWidth: "500px", top: "300px"}} className="container is-justify-content-center"
                 onClick={(event => event.stopPropagation())}>
                <article
                         className="message is-primary">
                    <div className="message-header">
                        <p>Create directory</p>
                        <button className="delete" onClick={() => dispatch(setPopupDisplay('none'))}
                                aria-label="delete"></button>
                    </div>
                    <div className="message-body">
                        Please enter a directory name and click the create button. You can also cancel the creation of
                        the directory, click on the cross.
                        <div className="field">
                            <label className="label">Name directory</label>
                            <div className="control">
                                <Input type="text" value={dirName} setValue={setDirName}
                                       placeholder="Enter name directory"/>
                            </div>
                        </div>
                        <div className="field is-grouped is-grouped-right">
                            <div className="control">
                                <button className="button is-primary" onClick={() => createDirHandler()}>Create</button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default Popup;