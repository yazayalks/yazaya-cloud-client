import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import userReducer from "./sliceUserReducer";
import fileReducer from "./sliceFileReducer";
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