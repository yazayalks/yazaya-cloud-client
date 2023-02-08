import {createSlice} from "@reduxjs/toolkit";
const sliceUserReducer = createSlice({
    name: 'toolkit',
    initialState: {
        currentUser: {
            usedSpace: 0,
            isActivated: false
        },
        isAuth: false,
        isLoading: false,

    },
    reducers: {
        setUser(state, action) {
            state.currentUser = action.payload;
            state.isAuth = true;
        },
        logout(state, action) {
            localStorage.removeItem('token')
            state.currentUser = {};
            state.isAuth = false;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setSize(state, action) {
            state.currentUser.usedSpace = action.payload;
        },
        setAvatar(state, action) {
            state.currentUser.avatar = action.payload;
        }

    },

})

export default sliceUserReducer.reducer
export const {setUser, logout, setLoading, setSize, setAvatar} = sliceUserReducer.actions