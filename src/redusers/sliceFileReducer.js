import {createSlice} from "@reduxjs/toolkit";
import ConfirmDeleteFile from "../components/disk/СonfirmDeleteFile";

const sliceFileReducer = createSlice({
    name: 'toolkit',
    initialState: {
        files: [],
        currentDir: null,
        popupDisplay: 'none',
        dirStack: [],
        title: [],
        searchMod: false,
        confirmDeleteFile: 'none',
        nameFileForDelete: '',
        idFileForDelete: null,
        confirmDeleteDir: 'none',
        nameDirForDelete: '',
        idDirForDelete: null,
        idSomeFilesForDelete: [],
        view: 'list',
    },
    reducers: {
        setFiles(state, action) {
            state.files = action.payload;
        },
        setCurrentDir(state, action) {
            state.currentDir = action.payload;
        },
        addFile(state, action) {
            state.files = [...state.files, action.payload]
        },
        setPopupDisplay(state, action) {
            state.popupDisplay = action.payload
        },
        pushToStack(state, action) {
            state.dirStack = [...state.dirStack, action.payload]
        },
        popToStack(state, action) {
            state.dirStack = [...action.payload]
        },
        popTitle(state, action) {
            state.title = [...action.payload]
        },
        pushTitle(state, action) {
            state.title = [...state.title, action.payload]
        },
        deleteFileAction(state, action) {
            state.files = [...state.files.filter(file => file._id !== action.payload)]
        },
        setSearchMod(state, action) {
            state.searchMod = action.payload;
        },
        setConfirmDeleteFile(state, action) {
            state.confirmDeleteFile = action.payload
        },
        setNameFileForDelete(state, action) {
            state.nameFileForDelete = action.payload
        },
        setIdFileForDelete(state, action) {
            state.idFileForDelete = action.payload
        },
        setConfirmDeleteDir(state, action) {
            state.confirmDeleteDir = action.payload
        },
        setNameDirForDelete(state, action) {
            state.nameDirForDelete = action.payload
        },
        setIdDirForDelete(state, action) {
            state.idDirForDelete = action.payload
        },
        setView(state, action) {
            state.view = action.payload
        },

    },

})

export default sliceFileReducer.reducer
export const {
    setFiles,
    setCurrentDir,
    addFile,
    setPopupDisplay,
    pushToStack,
    popToStack,
    popTitle,
    pushTitle,
    deleteFileAction,
    setSearchMod,
    setConfirmDeleteFile,
    setNameFileForDelete,
    setIdFileForDelete,
    setConfirmDeleteDir,
    setNameDirForDelete,
    setIdDirForDelete,
    setView
} = sliceFileReducer.actions