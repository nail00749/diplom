import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";
import {fetchAuth} from "./ActionCreator";

interface UserState {
    user: IUser,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string
}

const initialState: UserState = {
    isAuthenticated: false,
    isLoading: false,
    user: {
        email: "",
        firstName: "",
        lastName: "",
        roles: []
    },
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAuth.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false
            state.error = ''
            state.isAuthenticated = true
            //state.user = action.payload
        },
        [fetchAuth.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchAuth.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    },

})

export default userSlice.reducer
