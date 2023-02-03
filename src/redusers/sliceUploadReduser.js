import {createSlice} from "@reduxjs/toolkit";

const sliceUploadReducer = createSlice({
    name: 'toolkit',
    initialState: {
        isVisible: false,
        files: [],
    },
    reducers: {
        showUploader(state) {
            state.isVisible = true;
        },
        hideUploader(state) {
            state.isVisible = false;
        },
        addUploadFile(state, action) {
            state.files = [...state.files, action.payload]
        },
        removeUploadFile(state, action) {
            state.files = state.files = [...state.files.filter(file => file.id !== action.payload)]
        },
        changeUploadFile(state, action) {
            state.files = [...state.files.map(file => file.id === action.payload.id ?
                {
                    ...file, progress: action.payload.progress
                } :
                {
                    ...file
                }
            )]
        }
    },

})

export default sliceUploadReducer.reducer
export const {showUploader, hideUploader, addUploadFile, removeUploadFile, changeUploadFile} = sliceUploadReducer.actions