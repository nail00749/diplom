import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    showAlert: false,
    error: ''
}

export const serviceSlice = createSlice({
        name: 'service',
        initialState,
        reducers: {
            showErrorAlert: (state, action: PayloadAction<string>) => {
                state.showAlert = true
                state.error = action.payload
            },
            hideErrorAlert: () => initialState,
        }
    }
)

export const {showErrorAlert, hideErrorAlert} = serviceSlice.actions

export default serviceSlice.reducer
