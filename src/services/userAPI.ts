import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {BaseURL} from "../config";
import {
    fetchAuthError,
    fetchAuthLoading,
    fetchAuthSuccess,
    fetchMeData,
    fetchUpdateData
} from "../store/reducers/user/UserSlice";
import {IUser} from "../models/IUser";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseURL,
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: '/token',
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                dispatch(fetchAuthLoading())
                try {
                    const {data} = await queryFulfilled
                    dispatch(fetchAuthSuccess(data.access_token))
                } catch (e: any) {
                    dispatch(fetchAuthError((e.error && e.error.data && e.error.data.detail) || 'Oops, unknown error'))
                }
            }
        }),
        register: build.mutation({
            query: (body) => ({
                url: '/users',
                method: "POST",
                body
            }),
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/users',
                method: "PATCH",
                body
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                dispatch(fetchUpdateData(data))
            }
        }),
        getMeData: build.query<IUser, void>({
            query: () => '/users/me/',
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                dispatch(fetchMeData(data))
            }
        }),
        updateAvatar: build.mutation<IUser, FormData>({
            query: (body) => ({
                url: '/users/avatar',
                method: "PATCH",
                body
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                dispatch(fetchUpdateData(data))
            }
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useGetMeDataQuery, useUpdateMutation, useUpdateAvatarMutation} = userAPI

export const {reducer, middleware} = userAPI
