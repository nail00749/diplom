import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchAuth = createAsyncThunk(
    'user/login',
    async (_, thunkAPI) => {
        try {
            return true
        }
        catch (e) {
            return ''
        }
    }
)
