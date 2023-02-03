import React, {useEffect, useState} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {useDispatch, useSelector} from "react-redux";
import FileService from "../../../../services/FileService";
import {
    pushTitle,
    pushToStack, setConfirmDeleteDir, setConfirmDeleteFile,
    setCurrentDir, setIdDirForDelete, setIdFileForDelete, setNameDirForDelete, setNameFileForDelete,
    setSearchMod
} from "../../../../redusers/sliceFileReducer";
import getSizeFormat from "../../../utils/sizeFormat";



const File = (props) => {

    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)
    const [active, setActive] = useState(false)

    function openDirHandler(file) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(props.file._id))
            dispatch(pushTitle(props.file.name))
            dispatch(setSearchMod(false))
        }

    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        FileService.downloadFile(props.file)

    }

    function deleteClickHandler(e) {

        e.stopPropagation()
        if (props.file.type !== 'dir') {
            dispatch(setNameFileForDelete(props.file.name))
            dispatch(setIdFileForDelete(props.file._id))
            dispatch(setConfirmDeleteFile('flex'))
        } else {
            dispatch(setNameDirForDelete(props.file.name))
            dispatch(setIdDirForDelete(props.file._id))
            let res = dispatch(setConfirmDeleteDir('flex'))
            if (res) {
                console.log(res)
            }
        }
    }

    function selectDirHandler() {
        setActive(!active)
    }


    // )
    if (fileView === 'list') {
        return (

            <div className={active ? "columns is-mobile fa-border file--active" : "columns is-mobile fa-border"}
                 style={{cursor: 'pointer'}}
                 onClick={() => openDirHandler(props.file)} >
                <div style={{overflow: "hidden"}} className="column is-one-fifth">
                    <i className={props.file.type === 'dir' ? 'fa fa-folder' : 'fa fa-file'}
                       style={{marginRight: "5px"}}></i>
                    {props.file.name}
                </div>
                <div className="column ">{props.file.date.substring(0, 10)}</div>
                <div className="column">{getSizeFormat(props.file.size)}</div>
                <div className="column is-one-quarter" style={{width: "70px"}}>
                    <div className="field is-grouped is-grouped-right is-align-items-center">
                        {props.file.type !== 'dir' &&
                            <i className="control fa fa-download" onClick={(e) => downloadClickHandler(e)}></i>}
                        <i className="control fa fa-remove" onClick={(e) => deleteClickHandler(e)}></i>
                    </div>
                </div>

            </div>
        );
    }

    if (fileView === 'plate') {
        return (
            <div className="file-plate">
                <i className="fa fa-remove remove-file" style={{ cursor: 'pointer'}} onClick={(e) => deleteClickHandler(e)}></i>
                <div className=""
                     onClick={() => openDirHandler(props.file)}>
                    <div style={{overflow: "hidden"}} className="is-flex is-justify-content-center">
                        {props.file.type !== 'dir' &&
                            <i className="control fa fa-download fa-2x download-file" style={{position: 'absolute', color: "black", top: '50px', cursor: 'pointer'}}
                                onClick={(e) => downloadClickHandler(e)}></i>}
                        <i  className={props.file.type === 'dir' ? 'fa fa-folder fa-5x' : 'fa fa-file fa-5x'}
                           style={props.file.type === 'dir' ? {marginRight: "5px",cursor: 'pointer' } : {}}></i>
                    </div>
                    <div style={{overflow: "hidden", width: '100px', paddingLeft: '5px'}} className="is-flex is-justify-content-left">
                        {props.file.name}
                    </div>
                </div>
            </div>
        );
    }
};

export default File;