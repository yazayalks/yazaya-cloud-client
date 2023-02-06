import {createSlice} from "@reduxjs/toolkit";

const sliceAppReducer = createSlice({
    name: 'toolkit',
    initialState: {
        loader: false,
    },
    showMenu: false,
    serverMessageRegister: '',
    serverMessageLogin: '',
    reducers: {
        showLoader(state) {
            state.loader = true;
        },
        hideLoader(state) {
            state.loader = false;
        },
        showMenu(state) {
            state.showMenu = !state.showMenu;
        },
        setServerMessageRegister(state, action) {
            state.serverMessageRegister = action.payload;
        },
        setServerMessageLogin(state, action) {
            state.serverMessageLogin = action.payload;
        },
    },

})

export default sliceAppReducer.reducer
export const {
    showLoader,
    hideLoader,
    showMenu,
    setServerMessageRegister,
    setServerMessageLogin
} = sliceAppReducer.actions