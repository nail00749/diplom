import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {BaseURL} from "../config";
import {fetchAuthError, fetchAuthLoading, fetchAuthSuccess, fetchMeData} from "../store/reducers/user/UserSlice";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseURL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
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
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                dispatch(fetchAuthLoading())
                try {
                    const {data} = await queryFulfilled

                    localStorage.setItem('token', data.access_token)
                    dispatch(fetchAuthSuccess())
                } catch (e: any) {
                    dispatch(fetchAuthError(e.error.data.detail))
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
            })
        }),
        getMeData: build.query({
            query: () => '/users/me/',
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                dispatch(fetchMeData(data))
            }
        }),
    })
})

export const {useLoginMutation, useRegisterMutation, useGetMeDataQuery} = userAPI

export const {endpoints, reducerPath, reducer, middleware} = userAPI
