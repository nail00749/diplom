import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";

interface UserState {
    user: IUser | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string,
    token: ''
    saveSession: boolean
}

const initialState: UserState = {
    isAuthenticated: Boolean(sessionStorage.getItem('token')) || Boolean(localStorage.getItem('token')),
    isLoading: false,
    user: null,
    error: '',
    token: '',
    saveSession: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchAuthLoading: (state) => {
            state.isLoading = true
        },
        fetchAuthError: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        fetchAuthSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = ''
            state.isAuthenticated = true
            sessionStorage.setItem('token', action.payload)
            if (state.saveSession) {
                localStorage.setItem('token', action.payload)
            }
        },
        fetchMeData: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        fetchUpdateData: (state, action) => {
            state.user = {...state.user, ...action.payload}
        },
        setSaveSession: (state) => {
            state.saveSession = !state.saveSession
        },
        logOut: () => {
            localStorage.clear()
            sessionStorage.clear()
            return {
                ...initialState,
                isAuthenticated: false
            }
        }
    }
})

export const {
    fetchAuthSuccess,
    fetchAuthLoading,
    fetchAuthError,
    fetchMeData,
    fetchUpdateData,
    logOut,
    setSaveSession
} = userSlice.actions

export default userSlice.reducer
