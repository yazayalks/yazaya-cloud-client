import {createSlice} from "@reduxjs/toolkit";

const sliceAppReducer = createSlice({
    name: 'toolkit',
    initialState: {
        loader: false,
    },
    showMenu: false,
    serverMessageRegister: '',
    serverMessageLogin: '',
    serverMessageConfirmRegister: '',
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
        setServerMessageConfirmRegister(state, action) {
            state.serverMessageConfirmRegister = action.payload;
        },
    },

})

export default sliceAppReducer.reducer
export const {
    showLoader,
    hideLoader,
    showMenu,
    setServerMessageRegister,
    setServerMessageConfirmRegister,
    setServerMessageLogin
} = sliceAppReducer.actions