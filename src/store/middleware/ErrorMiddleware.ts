import {
    MiddlewareAPI,
    isRejectedWithValue,
    Middleware,
} from '@reduxjs/toolkit'
import {showErrorAlert} from '../reducers/service/ServiceSlice'


export const rtqQueryError: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    const {dispatch} = api

    if (isRejectedWithValue(action)) {
        if (action.payload.status === 422) {
            dispatch(showErrorAlert(action.payload.data.detail[0].msg))
        } else {
            dispatch(showErrorAlert(action.payload.data.detail))
        }


    }

    return next(action)
}
