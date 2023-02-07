import {combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import sliceFileReducer from "./sliceFileReducer";
import sliceUserReducer from "./sliceUserReducer";
import sliceUploadReducer from "./sliceUploadReduser"
import sliceAppReducer from "./sliceAppReducer";

const rootReducer = combineReducers(
    {
        user: sliceUserReducer,
        files: sliceFileReducer,
        uploader: sliceUploadReducer,
        app: sliceAppReducer,
    }
)

export const store = configureStore({
    reducer: rootReducer
})