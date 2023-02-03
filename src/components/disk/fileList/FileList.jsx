import React, {useEffect, useState} from 'react';
import File from "./file/File";
import {useDispatch, useSelector} from "react-redux";
import Popup from "../Popup";
import style from './fileList.css'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import FileService from "../../../services/FileService";
import ContextMenu from "./file/contextMenu/ContextMenu";

const FileList = () => {
    const files = useSelector(state => state.files.files)
    const title = useSelector(state => state.files.title)
    const searchMod = useSelector(state => state.files.searchMod)
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)
    const dispatch = useDispatch()
    const [contextMenu, setContextMenu] = useState(false)
    const [points, setPoints] = useState({x: 0, y: 0});
    useEffect(() => {
        const handleClick = () => setContextMenu(false);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [])


    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch((FileService.uploadFile(file, currentDir))))
    }

    function showContextMenu(e) {
        e.preventDefault();
        setContextMenu(true)
        setPoints({x: e.pageX, y: e.pageY});
    }


    if (!files.length && !searchMod) {
        return (
            <section className="hero is-small is-primary">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">
                            {title.length ?
                                <div>Folder "{title[title.length - 1]}" is empty.</div>
                                :
                                <div>Disk is empty.</div>
                            }
                        </p>
                        <div className="button  m-2">
                            <label htmlFor="disk__upload-input" className="file-label">Choose a file…</label>
                            <input multiple={true} className="file-input" type="file" id="disk__upload-input"
                                   onChange={(event) => fileUploadHandler(event)}/>
                            <i className="fa fa-upload"></i>
                        </div>
                    </div>
                    <p className="subtitle">
                        You can add files via the button, or simply drag and drop them into the browser window.
                    </p>
                </div>
            </section>
        )
    }

    if (!files.length && searchMod) {
        return (
            <section className="hero is-small is-primary">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">
                            Files not found
                        </p>
                    </div>
                    <p className="subtitle">
                        Check if the file name is correct.
                    </p>
                </div>
            </section>
        )
    }

    if (fileView === 'list') {
        return (
            <div className="box">
                <p className="title is-3">{title[title.length - 1]}</p>
                <div className="columns is-mobile">
                    <div className="column is-one-fifth">
                        <p className="is-5 has-text-weight-bold">Name</p>
                    </div>
                    <div className="column ">
                        <p className="is-5 has-text-weight-bold">Date</p>
                    </div>
                    <div className="column">
                        <p className="is-5 has-text-weight-bold">Size</p>
                    </div>
                    <div className="column is-one-quarter" style={{width: "80px"}}>
                        <p className="is-5 has-text-weight-bold">Actions</p>
                    </div>
                </div>
                <TransitionGroup>
                    {files.map(file =>
                        <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
                    <div  className="mt-5" onContextMenu={(e) => showContextMenu(e)}>
                            <File file={file}  />
                    </div>
                        </CSSTransition>)}
                </TransitionGroup>
                {contextMenu && <ContextMenu points={points}/>}
            </div>
        );
    }

    if (fileView === 'plate') {
        return (
            <div className="box">
                <p className="title is-3">{title[title.length - 1]}</p>
                <TransitionGroup className="container is-flex is-flex-wrap-wrap">
                    {files.map(file =>
                        <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
                            <File file={file}/>
                        </CSSTransition>)}
                </TransitionGroup>
            </div>
        );
    }
};

export default FileList;