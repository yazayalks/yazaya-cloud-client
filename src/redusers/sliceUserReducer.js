// const SET_USER = "SET_USER"
// const LOGOUT = "LOGOUT"
// const defaultState = {
//     currentUser: {},
//     isAuth: false
// }
//
// export default function userReducer(state = defaultState, action) {
//     switch (action.type) {
//         // case SET_USER:
//         //     return {
//         //         ...state,
//         //         currentUser: action.payload.user,
//         //         isAuth: true
//         //     }
//         // case LOGOUT:
//         //     localStorage.removeItem('token')
//         //     return {
//         //         currentUser: {},
//         //         isAuth: false
//         //     }
//         default:
//             return state
//     }
// }
//
// export const setUser = user => ({type: SET_USER, payload: user})
// export const logout = user => ({type: LOGOUT})


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