import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";

interface UserState {
    user?: IUser,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string,
    token: ''
}

const initialState: UserState = {
    isAuthenticated: false,
    isLoading: false,
    user: {
        email: "",
    },
    error: '',
    token: ''
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
        fetchAuthSuccess: (state,) => {
            state.isLoading = false
            state.error = ''
            state.isAuthenticated = true
        },
        fetchMeData: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        fetchUpdateData: (state, action) => {
            const copy = {...state.user, ...action.payload}
            state.user = copy
        }

    },
})

export const {fetchAuthSuccess, fetchAuthLoading, fetchAuthError, fetchMeData, fetchUpdateData} = userSlice.actions

export default userSlice.reducer
