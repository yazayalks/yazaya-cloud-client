import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FileService from "../../services/FileService";
import FileList from "./fileList/FileList";
import Popup from "./Popup";

import WindowSharpIcon from '@mui/icons-material/WindowSharp';
import ReorderSharpIcon from '@mui/icons-material/ReorderSharp';


import {
    popTitle,
    popToStack,
    pushTitle,
    setCurrentDir,
    setPopupDisplay,
    setSearchMod, setView
} from "../../redusers/sliceFileReducer";
import Uploader from "./uploader/Uploader";
import style from './disk.css'
import {showLoader} from "../../redusers/sliceAppReducer";
import ConfirmDeleteFile from "./СonfirmDeleteFile";
import ConfirmDeleteDir from "./СonfirmDeleteDir";


const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const title = useSelector(state => state.files.title)
    const dirStack = useSelector(state => state.files.dirStack)
    const loader = useSelector(state => state.app.loader)
    const searchMod = useSelector(state => state.files.searchMod)
    const [dragEnter, setDragEnter] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [sort, setSort] = useState('type')
    const [searchTimeout, setSearchTimeout] = useState(false)


    useEffect(() => {
        if (searchMod) {
            dispatch(FileService.searchFiles(searchName, currentDir, sort))
        } else {
            dispatch(FileService.getFiles(currentDir, sort))
        }

    }, [currentDir, sort])

    function showPopupHandler() {
        dispatch(setPopupDisplay('block'))
    }

    function backClickHandler() {
        const newDirStack = [...dirStack]
        const backDirId = newDirStack.pop()
        dispatch(setCurrentDir(backDirId))
        dispatch(popToStack(newDirStack))

        const newFiles = [...title]
        newFiles.pop()
        console.log(newFiles)
        dispatch(popTitle(newFiles))
        dispatch(setSearchMod(false))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch((FileService.uploadFile(file, currentDir))))
        dispatch(setSearchMod(false))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch((FileService.uploadFile(file, currentDir))))
        setDragEnter(false)
    }


    function setChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(setSearchMod(true))
                dispatch(FileService.searchFiles(value, currentDir, sort))
            }, 500, e.target.value))
        } else {
            dispatch(FileService.getFiles(currentDir, sort))
            dispatch(setSearchMod(false))
        }

    }


    return (!dragEnter ?
            <div onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <Uploader/>
                <Popup/>
                <ConfirmDeleteFile/>
                <ConfirmDeleteDir/>
                <div className="box">
                    <div className="is-grouped is-flex is-flex-wrap-wrap">
                        {currentDir && <div className="control m-2">
                            <button className="button" onClick={() => backClickHandler()}>Back</button>
                        </div>}
                        <div className="control  m-2">
                            <button className="button is-primary" onClick={() => showPopupHandler()}>Create directory
                            </button>
                        </div>
                        <div className="button  m-2">
                            <label htmlFor="disk__upload-input" className="file-label">Choose a file…</label>
                            <input multiple={true} className="file-input" type="file" id="disk__upload-input"
                                   onChange={(event) => fileUploadHandler(event)}/>
                            <i className="fa fa-upload"></i>
                        </div>
                        <div className="control  m-2">
                            <div className="select is-primary">
                                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                    <option value="name">Sort by name</option>
                                    <option value="type">Sort by type</option>
                                    <option value="date">Sort by date</option>
                                </select>
                            </div>
                        </div>
                        <div className="control m-2 is-primary">
                            <input className="input is-primary" value={searchName} onChange={e => setChangeHandler(e)}
                                   type="text" placeholder="Enter search"/>
                        </div>
                        <div  className="field is-grouped is-grouped-right">
                            <div className="control m-2 is-primary">

                                <button className="button" onClick={() => dispatch(setView('plate'))}>
                                    <WindowSharpIcon />
                                </button>
                            </div>
                            <div className="control m-2 is-primary">
                                <button className="button" onClick={() => dispatch(setView('list'))}>
                                    <ReorderSharpIcon />
                                </button>
                            </div>
                        </div>


                    </div>

                </div>

                {!loader ? <FileList/> : <div className="loader-container">
                    <div className="lds-dual-ring"></div>
                </div>}

            </div>
            :
            <div className="dragFiles" onDrop={dropHandler} onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}>
                <p className="title is-3">Drag files here</p>
            </div>
    );
};

export default Disk;