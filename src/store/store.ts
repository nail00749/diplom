import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/user/UserSlice'
import testReducer from './reducers/testCreate/TestSlice'
import {userAPI} from "../services/userAPI";

const rootReducer = combineReducers({
    userReducer,
    testReducer,
    [userAPI.reducerPath]: userAPI.reducer
})


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
