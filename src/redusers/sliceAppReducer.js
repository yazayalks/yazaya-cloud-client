import {createSlice} from "@reduxjs/toolkit";

const sliceAppReducer = createSlice({
    name: 'toolkit',
    initialState: {
        loader: false,
    },
    showMenu: false,
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
    },

})

export default sliceAppReducer.reducer
export const {
    showLoader,
    hideLoader,
    showMenu,
} = sliceAppReducer.actions