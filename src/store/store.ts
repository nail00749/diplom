import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/user/UserSlice'
import testReducer from './reducers/testCreate/TestSlice'
import serviceReducer from './reducers/service/ServiceSlice'
import {userAPI} from "../services/userAPI";
import {teacherAPI} from "../services/teacherAPI";
import {rtqQueryError} from './middleware/ErrorMiddleware'

const rootReducer = combineReducers({
    userReducer,
    testReducer,
    serviceReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [teacherAPI.reducerPath]: teacherAPI.reducer,
})


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware()
                .concat([userAPI.middleware, teacherAPI.middleware, rtqQueryError])

    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
