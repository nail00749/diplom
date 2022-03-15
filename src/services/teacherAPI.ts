import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {BaseURL} from "../config";

export const teacherAPI = createApi({
    reducerPath: 'teacherAPI',
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
        getAllCourses: build.query({
            query: () => '/courses'
        }),
        createCourse: build.mutation({
            query: (body) => ({
                url: '/courses',
                method: 'POST',
                body
            })
        }),
        getAllLessons: build.query({
            query: () =>'/lessons'
        }),
        createLesson: build.mutation({
            query: (body) => ({
                url: '/lessons',
                method: 'POST',
                body
            })
        })
    })
})

export const {
    useCreateCourseMutation,
    useGetAllCoursesQuery,
    useCreateLessonMutation,
    useGetAllLessonsQuery
} = teacherAPI

export const {endpoints, reducerPath, reducer, middleware} = teacherAPI
