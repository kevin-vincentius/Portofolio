import { createSlice } from '@reduxjs/toolkit' 

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: false, 
        loading: false,
        userRegistered: false,
        uid: null,
        username: null,
        errorReg: null,
        errorLog: null,
    },
    reducers: {
        logOut: (state) => {
            state.isAuth = false
            state.loading = false
            state.uid = null
            state.username = null
            state.errorLog = null
        },
        loginPending: (state) => {
            state.isAuth = false
            state.loading = true
            state.errorLog = null
        },
        loginSuccess: (state, action) => {
            state.isAuth = true
            state.loading = false
            state.uid = action.payload.uid
            state.username = action.payload.username
            state.errorLog = null
        }, 
        loginFailed: (state, action) => {
            state.isAuth = false
            state.loading = false
            state.uid = null
            state.errorLog = action.payload
        },
        registerPending: (state) => {
            state.userRegistered = false
            state.loading = true
            state.errorReg = null
        },
        registerSuccess: (state) => {
            state.userRegistered = true
            state.loading = false
            state.errorReg = null
        },
        registerFailed: (state, action) => {
            state.userRegistered = false
            state.loading = false
            state.errorReg = action.payload
        }, 
        resetStatusUserRegistered: (state) => {
            state.userRegistered = false
        }
        
    }
}) 

export const authActions = authSlice.actions
export default authSlice.reducer


